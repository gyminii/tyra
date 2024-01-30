import { GraphQLScalarType } from "graphql";
import TaskService from "../services/task/task-service.js";
import BoardService from "../services/board/board-service.js";
import Handler from "../services/handler-service.js";

const taskService = new TaskService();
const boardService = new BoardService();
const handler = new Handler();
const resolvers = {
	Date: new GraphQLScalarType({
		name: "Date",
		description: "Custom scalar type for Date",
		parseValue(value) {
			// Parse input value from the client
			return new Date(value);
		},
		serialize(value) {
			// Serialize output value for the client
			return value.toISOString();
		},
		parseLiteral(ast) {
			// Parse input value from the query
			if (ast.kind === Kind.STRING) {
				return new Date(ast.value);
			}
			return null;
		},
	}),
	Query: {
		// Tasks
		allTasks: async () => taskService.getAllTasks(),
		getTask: (_, { taskId }) => taskService.getTaskById({ taskId: taskId }),
		//Boards
		allBoards: async (_, { boardId }) =>
			boardService.getAllBoards({ boardId: boardId }),
		getBoard: (_, { boardId }) => boardService.getBoard({ boardId: boardId }),
	},
	Mutation: {
		// Tasks
		createTask: async (_, { task }) => taskService.createTask({ task: task }),
		deleteTask: async (_, { taskId }) => taskService.deleteTaskById(taskId),
		// Boards
		createBoard: async (_, { board }) =>
			boardService.createBoard({ board: board }),
		deleteBoard: async (_, { boardId }) =>
			handler.deleteBoard({ boardId: boardId }),
	},
};

export default resolvers;
