import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    enum: ["important", "canwait", "deadline", "habit", "uncategorized"],
    default: "uncategorized",
  },
  recurring: {
    type: Boolean,
    required: true,
    default: false,
  },
  deadline: {
    type: Date,
    default: null,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
