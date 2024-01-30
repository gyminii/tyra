import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const BoardSchema = new Schema({
	boardId: {
		type: Schema.Types.UUID,
		default: uuidv4,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: String,
	dateCreated: {
		type: Date,
		required: true,
		default: Date.now,
	},
	// childern: []
	tasks: [
		{
			type: Schema.Types.UUID,
			ref: "Task",
		},
	],
});

export default model("Board", BoardSchema);
