import BoardService from "./board-service.js";
import TaskService from "./task-service.js";
const taskService = new TaskService();
const boardService = new BoardService();

class Handler {
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
