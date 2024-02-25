import mongoose, { Schema, model } from "mongoose";

export const TaskSchema = new mongoose.Schema({
	title: String,
	description: String,
	dateCreated: String,
	dueDate: String,
	boardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Board",
		required: false,
	},
	isComplete: Boolean,
	order: {
		type: Number,
		required: true,
		default: 0, // Consider a default value or calculate the max + 1 based on existing tasks within the same board upon task creation
	},
});

export default model("Task", TaskSchema);
