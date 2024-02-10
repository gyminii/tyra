import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
	query GetAllTasks {
		getAllTasks {
			_id
			title
			description
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
