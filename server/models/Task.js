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
});

export default model("Task", TaskSchema);
