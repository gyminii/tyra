import Task from "../models/Task.js";
import BoardService from "./board-service.js";
import TaskService from "./task-service.js";
const taskService = new TaskService();
const boardService = new BoardService();

class Handler {
	createTask = async (body, boardId) => {
		// console.log("PROPS", boardId, task);
		try {
			if (boardId) {
				console.log("BOARD ID WHEN CREATING TASK: ", boardId);
				const board = await boardService.getBoard(boardId);
				console.log("BOARD FOUND: ", board, {
					...body,
					boardId: boardId,
				});
				if (!board) throw new Error("Board not found.");
				const task = await taskService.createTask({
					...body,
					boardId: boardId,
				});
				console.log("YO", board, body);
				board.tasks.push(task?.taskId);
				await board.save();
				return board;
			} else {
				const newTask = await taskService.createTask(body);
				return newTask;
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	/**
	 * return deletes board and tasks
	 */
	deleteBoard = async (_, { boardId }) => {
		const board = await boardService.getBoard({ boardId: boardId });
		if (!board) throw new Error("Board not found!");
		await taskService.deleteTasks(board.tasks);
		const isDeleted = await boardService.deleteBoard({ boardId: boardId });
		return isDeleted;
	};
	/**
	 *
	 * @returns all boards
	 */
	getAllBoards = async () => {
		const boards = await boardService.getAllBoards();
		const _boards = await Promise.all(
			boards.map(async (board) => {
				const tasks = await taskService.getTaskByBoard({
					boardId: board.boardId,
				});
				return { ...board.toObject(), tasks };
			})
		);
		return _boards;
	};
}

export default Handler;
