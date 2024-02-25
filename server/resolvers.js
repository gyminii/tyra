import { GraphQLScalarType } from "graphql";
import TaskService from "./services/task/task-service.js";
import BoardService from "./services/board/board-service.js";
import Handler from "./services/handler-service.js";
import Board from "./models/Board.js";
import Task from "./models/Task.js";

const taskService = new TaskService();
const boardService = new BoardService();
const handler = new Handler();

const resolvers = {
	Query: {
		getAllTasks: async () => await Task.find({}),
		getTask: async (_, { taskId }) => await Task.findById(taskId),
		getAllBoards: async () => {
			try {
				// Fetch all boards
				const boards = await Board.find();
				// Fetch all tasks
				const tasks = await Task.find().sort({ order: 1 });

				// Map through each board to attach the related tasks
				return boards.map((board) => {
					// Convert Mongoose document to a plain JavaScript object
					const boardObj = board.toObject();

					// Filter tasks that have a matching boardId with the current board's _id
					boardObj.tasks = tasks.filter((task) => {
						return (
							task.boardId && task.boardId.toString() === board._id.toString()
						);
					});

					return boardObj;
				});
			} catch (error) {
				console.error("Error fetching boards:", error);
				throw new Error("Failed to fetch boards. Please try again later.");
			}
		},
		getBoard: async (_, { _id }) => {
			try {
				const board = await Board.findById(_id);

				if (!board) {
					throw new Error("Board not found");
				}
				const tasks = await Task.find({ boardId: _id });
				console.log("TASKS FOUND? ", tasks);
				board.tasks = tasks;
				return board;
			} catch (error) {
				console.error("Error fetching board:", error.message);
				throw error;
			}
		},
	},
	Mutation: {
		createTask: async (_, args) => {
			try {
				const newTask = await Task.create(args);

				// if (args.boardId)
				// 	await Board.findByIdAndUpdate(args.boardId, {
				// 		$push: { tasks: newTask._id },
				// 	});
				return newTask;
			} catch (error) {
				console.error("Error creating task:", error);
				throw new Error("Failed to create task. Please try again later."); // Return a meaningful error message
			}
		},
		reorderTask: async (_, { boardId, tasksOrder }) => {
			const bulkOps = tasksOrder.map((taskId, index) => ({
				updateOne: {
					filter: { _id: taskId, boardId },
					update: { $set: { order: index } },
				},
			}));

			await Task.bulkWrite(bulkOps);

			// Fetch and return the updated tasks in their new order
			const updatedTasks = await Task.find({ boardId }).sort("order");
			return updatedTasks;
		},
		updateTask: async (
			_,
			{ _id, title, description, dueDate, boardId, isComplete }
		) => {
			const updatedTask = await Task.findByIdAndUpdate(
				_id,
				{ title, description, dueDate, boardId, isComplete },
				{ new: true }
			);
			return updatedTask;
		},
		deleteTask: async (_, { taskId }) => {
			const deletedTask = await Task.findByIdAndDelete(taskId);
			// Update board tasks array
			await Board.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });
			return deletedTask;
		},
		createBoard: async (_, args) => await Board.create(args),
		updateBoard: async (_, { _id, title, description, dueDate }) => {
			try {
				// Find the board by its ID and update its properties
				const updatedBoard = await Board.findByIdAndUpdate(
					_id,
					{ title, description, dueDate },
					{ new: true }
				);

				if (!updatedBoard) {
					throw new Error("Board not found");
				}

				return updatedBoard;
			} catch (error) {
				console.error("Error updating board:", error);
				throw new Error("Failed to update board. Please try again later.");
			}
		},
		deleteBoard: async (_, { _id }) => {
			try {
				// Find the board by its _id
				const deletedBoard = await Board.findByIdAndDelete(_id);

				if (!deletedBoard) throw new Error("Board not found");
				await Task.updateMany(
					{ boardId: deletedBoard._id },
					{ $set: { boardId: null } }
				);
				return deletedBoard; // Return true to indicate successful deletion
			} catch (error) {
				console.error("Error deleting board:", error);
				throw new Error("Failed to delete board. Please try again later.");
			}
		},
	},
};

export default resolvers;
