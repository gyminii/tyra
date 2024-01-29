import { GraphQLScalarType } from "graphql";
import TaskService from "../services/task/task-service.js";

const taskService = new TaskService();

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
		allTasks: async () => taskService.getAllTasks(),
		getTask: (_, { ID }) => taskService.getTaskById(ID),
		getTaskTitle: (_, { title }) => taskService.getTaskByTitle(title),
	},
	Mutation: {
		createTask: async (_, { task }) => taskService.createTask(task),
		deleteTask: async (_, { ID }) => taskService.deleteTaskById(ID),
	},
};

export default resolvers;
