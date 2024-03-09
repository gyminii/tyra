import { Schema, model } from "mongoose";

export const BoardSchema = new Schema({
	title: String,
	description: String,
	dateCreated: String,
	dueDate: String,
	order: {
		type: Number,
		required: true,
		default: 0, // Consider a default value or calculate the max + 1 based on existing tasks within the same board upon task creation
	},
});

export default model("Board", BoardSchema);
