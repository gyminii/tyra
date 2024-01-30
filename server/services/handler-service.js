import Board from "../models/Board.js";
import Task from "../models/Task.js";
import BoardService from "./board/board-service.js";
import TaskService from "./task/task-service.js";

const taskService = new TaskService();
const boardService = new BoardService();

class Handler {
	/**
	 * return deletes board and tasks
	 */
	deleteBoard = async (_, { boardId }) => {
		try {
			const board = await boardService.getBoard({ boardId: boardId });
			if (!board) throw new Error("Board not found!");
			await taskService.deleteTasks(board.tasks);
			const isDeleted = await boardService.deleteBoard({ boardId: boardId });
			return isDeleted;
		} catch (error) {
			throw error;
		}
	};
}

export default Handler;
