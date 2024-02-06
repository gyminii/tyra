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
    default: Date.now,
  },
  dueDate: {
    type: Date
  },
  // childern: [1,2,3,4,5] [5,2,3,4,1]
  // [#saf897293#23]
  tasks: [
    {
      type: Schema.Types.UUID,
      ref: "Task",
    },
  ],
});

export default model("Board", BoardSchema);
