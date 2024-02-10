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
				const boards = await Board.find();
				const tasks = await Task.find();

				return boards.map((board) => ({
					...board.toObject(),
					tasks: tasks.filter((task) =>
						task.boardId
							? task.boardId.toString() === board._id.toString()
							: !task.boardId
					),
				}));
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
		updateTask: async (_, { taskId, ...args }) =>
			await Task.findByIdAndUpdate(taskId, args, { new: true }),
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
