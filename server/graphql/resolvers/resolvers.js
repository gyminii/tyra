import mongoose from "mongoose";
import Task from "../../models/Task.js";
import Board from "../../models/Board.js";

const resolvers = {
	Query: {
		getAllTasks: async () => await Task.find({}),
		getTask: async (_, { taskId }) => await Task.findById(taskId),
		getAllBoards: async () => await Board.find().sort("order"),
		getBoard: async (_, { _id }) => {
			try {
				const board = await Board.findById(_id);

				if (!board) {
					throw new Error("Board not found");
				}
				const tasks = await Task.find({ boardId: _id });
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
				return await Task.create(args);
			} catch (error) {
				console.error("Error creating task:", error);
				throw new Error("Failed to create task. Please try again later."); // Return a meaningful error message
			}
		},

		reorderTask: async (
			_,
			{
				taskId,
				sourceBoardId,
				destinationBoardId,
				sourceIndex,
				destinationIndex,
			}
		) => {
			if (sourceBoardId === destinationBoardId) {
				let sourceTasks = await Task.find({ boardId: sourceBoardId }).sort(
					"order"
				);
				// Moving within the same board
				const [reorderedTask] = sourceTasks.splice(sourceIndex, 1);
				sourceTasks.splice(destinationIndex, 0, reorderedTask);

				for (let i = 0; i < sourceTasks.length; i++) {
					sourceTasks[i].order = i; // Directly set 'order' based on index
					await sourceTasks[i].save();
				}
				return reorderedTask;
			} else {
				// Case 2: Moving across different boards
				let destinationTasks = await Task.find({
					boardId: destinationBoardId,
				}).sort("order");
				const taskToMove = await Task.findById(taskId);
				taskToMove.boardId = destinationBoardId;
				destinationTasks.splice(destinationIndex, 0, taskToMove);
				for (let i = 0; i < destinationTasks.length; i++) {
					destinationTasks[i].order = i; // Ensure a continuous sequence
					await destinationTasks[i].save();
				}

				taskToMove.order = destinationIndex;
				return await taskToMove.save();
			}
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
		deleteTask: async (_, { _id }) => await Task.findByIdAndDelete(_id),
		createBoard: async (_, args) => await Board.create(args),
		reorderBoard: async (_, { boardId, sourceIndex, destinationIndex }) => {
			let boards = await Board.find({}).sort("order"); // Fetch all boards sorted by order
			const [reorderedBoard] = boards.splice(sourceIndex, 1); // Remove board from its original position
			boards.splice(destinationIndex, 0, reorderedBoard); // Insert board at its new position
			for (let i = 0; i < boards.length; i++) {
				if (boards[i].order !== i) {
					boards[i].order = i;
					await boards[i].save(); // Save each board with its new order
				}
			}
			return reorderedBoard; // Return the reordered board
		},
		updateBoard: async (_, { _id, title, description, dueDate }) => {
			try {
				// Start a session for transaction
				const session = await mongoose.startSession();
				session.startTransaction();

				const options = { session, new: true };

				// Find the board by its ID and update its properties
				const updatedBoard = await Board.findByIdAndUpdate(
					_id,
					{ title, description, dueDate },
					options
				);

				if (!updatedBoard) {
					throw new Error("Board not found");
				}

				// Commit transaction
				await session.commitTransaction();
				session.endSession();

				return await Board.findById(_id);
			} catch (error) {
				console.error("Error updating board:", error);
				// If an error occurs, abort the transaction
				session.abortTransaction();
				session.endSession();
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
