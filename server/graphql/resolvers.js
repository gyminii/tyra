import { GraphQLScalarType } from "graphql";
import sampleData from "../mock-data.js";
import Task from "../models/Task.js";

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
		allTasks: async () => await Task.find({}),
		getTask: (_, { ID }) => {
			console.log("FETCHING EACH TASK", ID);
			return "YOOO";
		},
		getTaskTitle: (_, { title }) => {
			console.log("FETCHING EACH TASK", title);
			return "YOOO";
		},
	},
	Mutation: {
		createTask: async (_, { task }) => {
			try {
				const newTask = new Task(task);
				const response = await newTask.save();
				return response;
			} catch (error) {
				throw new Error("Unable to create Task");
			}
		},
		deleteTask: async (_, { ID }) => {
			console.log("DELETE TASK CALLED");
			const isDeleted = (await Task.deleteOne({ _id: ID })).deletedCount;
			return isDeleted;
		},
	},
};

export default resolvers;
