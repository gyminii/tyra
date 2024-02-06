import { gql } from "@apollo/client";

export const GET_BOARDS = gql`
	query getAllBoards {
		allBoards {
			boardId
			title
			description
			dateCreated
			tasks {
				taskId
				title
				dateCreated
			}
		}
	}
`;
export const GET_BOARD = gql`
	query getBoard($boardId: ID!) {
		getBoard(boardId: $boardId) {
			boardId
			title
		}
	}
`;

export const CREATE_BOARD = gql`
	mutation createBoard($board: BoardBody!) {
		createBoard(board: $board) {
			boardId
			title
			description
			dateCreated
		}
	}
`;
