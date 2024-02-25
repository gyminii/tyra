import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
	query GetAllTasks {
		getAllTasks {
			# _id
			title
			# description
			boardId
		}
	}
`;

export const CREATE_TASK = gql`
	mutation CreateTask(
		$title: String!
		$description: String
		$boardId: ID
		$isComplete: Boolean
	) {
		createTask(
			title: $title
			description: $description
			isComplete: $isComplete
			boardId: $boardId
		) {
			_id
			title
			description
			dateCreated
			dueDate
			boardId
			isComplete
		}
	}
`;
export const REORDER_TASK = gql`
	mutation reorderTask($boardId: ID!, $tasksOrder: [ID!]!) {
		reorderTask(boardId: $boardId, tasksOrder: $tasksOrder) {
			_id
			title
			order
			# Include other fields you need
		}
	}
`;
export const EDIT_TASK = gql`
	mutation EditTask(
		$_id: ID!
		$title: String
		$description: String
		$dueDate: String
		$boardId: ID
		$isComplete: Boolean
	) {
		updateTask(
			_id: $_id
			title: $title
			description: $description
			dueDate: $dueDate
			boardId: $boardId
			isComplete: $isComplete
		) {
			_id
			title
			description
			dateCreated
			dueDate
			boardId
			isComplete
		}
	}
`;
