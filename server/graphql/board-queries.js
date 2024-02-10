import { gql } from "@apollo/client";

/**
 * Create
 */
export const CREATE_BOARD = gql`
	mutation CreateBoard(
		$title: String!
		$description: String
		$dueDate: String
	) {
		createBoard(title: $title, description: $description, dueDate: $dueDate) {
			_id
			title
			description
			dateCreated
			dueDate
		}
	}
`;
/**
 * Get all boards
 */
export const GET_ALL_BOARDS = gql`
	query GetAllBoards {
		getAllBoards {
			_id
			title
			description
			dateCreated
			dueDate
			tasks {
				_id
				title
				description
				dateCreated
				dueDate
				isComplete
			}
		}
	}
`;
/**
 * get a single board
 */
export const GET_BOARD = gql`
	query getBoard($_id: ID!) {
		getBoard(_id: $_id) {
			_id
			title
		}
	}
`;
/**
 * Update a board
 */
export const UPDATE_BOARD = gql`
	mutation UpdateBoard(
		$_id: ID!
		$title: String
		$description: String
		$dueDate: String
	) {
		updateBoard(
			_id: $_id
			title: $title
			description: $description
			dueDate: $dueDate
		) {
			_id
			title
			description
			dueDate
		}
	}
`;
/**
 * Delete a board
 */
export const DELETE_BOARD = gql`
	mutation DeleteBoard($_id: ID!) {
		deleteBoard(_id: $_id) {
			_id
		}
	}
`;
