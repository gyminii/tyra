import { Schema, model } from "mongoose";

import { v4 as uuidv4 } from "uuid";
const TaskSchema = new Schema({
	taskId: {
		type: Schema.Types.UUID,
		default: uuidv4,
		unique: true,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	board: {
		type: Schema.Types.UUID,
		default: uuidv4,
		unique: true,
	},
	dateCreated: {
		type: Date,
		required: true,
		default: Date.now,
	},
	dateModified: Date,
	description: String,
	dueDate: Date,
	// assignedTo: {
	// 	type: Schema.Types.UUID,
	// 	default: uuidv4,
	// 	unique: true,
	// },
});

export default model("Task", TaskSchema);
