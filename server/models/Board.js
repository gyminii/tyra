import mongoose, { Schema, model } from "mongoose";
import { TaskSchema } from "./Task.js";

export const BoardSchema = new Schema({
	title: String,
	description: String,
	dateCreated: String,
	dueDate: String,
	tasks: [TaskSchema],
});

export default model("Board", BoardSchema);
