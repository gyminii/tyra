import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
	query boards {
		allBoards {
			title
			tasks {
				title
				taskId
			}
		}
	}
`;
