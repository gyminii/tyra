import { Schema, model } from "mongoose";

import { v4 as uuidv4 } from "uuid";
const TaskSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	board: {
		type: String,
		required: true,
	},
	dateCreated: Date,
	dateModified: Date,
	description: String,
	dueDate: Date,
	assignedTo: {
		type: Schema.Types.UUID,
		default: uuidv4,
		unique: true,
	},
});

export default model("Task", TaskSchema);
