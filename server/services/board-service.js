import Board from "../models/Board.js";

class BoardService {
	/**
	 * @returns returns all the list of boards.
	 */
	getAllBoards = async () => await Board.find({});
	/**
	 * @param {*} param1
	 * @returns returns a board by boardId
	 */
	getBoard = async (boardId) => await Board.findOne({ _id: boardId });
	/**
	 * @param {*} board
	 * @returns creates a board and returns the board object
	 */
	createBoard = async (board) => {
		const newBoard = new Board(board);
		const response = await newBoard.save();
		return response;
	};
	/**
	 * Handler for deleting boards (have to empty out the tasks array).
	 * @param {*} param1
	 * @returns delete board by board id
	 */
	deleteBoard = async (boardId) => await Board.deleteOne({ boardId: boardId });

	// editing
}
export default BoardService;
