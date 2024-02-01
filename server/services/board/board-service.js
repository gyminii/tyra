import Board from "../../models/Board.js";

class BoardService {
	/**
	 * @returns returns all the list of boards.
	 */
	getAllBoards = async () => {
		try {
			return await Board.find({});
		} catch (error) {
			throw error;
		}
	};
	/**
	 * @param {*} param1
	 * @returns returns a board by boardId
	 */
	getBoard = async (_, boardId) => {
		try {
			return await Board.findOne(boardId);
		} catch (error) {
			throw error;
		}
	};
	/**
	 * @param {*} board
	 * @returns creates a board and returns the board object
	 */
	createBoard = async (board) => {
		try {
			const newBoard = new Board(board);
			const response = await newBoard.save();
			return response;
		} catch (error) {
			throw error;
		}
	};
	/**
	 * Handler for deleting boards (have to empty out the tasks array).
	 * @param {*} param1
	 * @returns delete board by board id
	 */
	deleteBoard = async (_, boardId) => {
		try {
			const isDeleted = await Board.deleteOne(boardId);
			return isDeleted;
		} catch (error) {
			throw error;
		}
	};

	// editing
}
export default BoardService;
