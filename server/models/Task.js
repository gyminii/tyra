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
	boardId: {
		type: Schema.Types.UUID,
		ref: "Board",
	},
	description: String,
	dateCreated: {
		type: Date,
		required: true,
		default: Date.now,
	},
	dateModified: Date,
	description: String,
	dueDate: Date,
});

export default model("Task", TaskSchema);
