import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
  title: String,
  note:String,
  dueDate:Date,
  done: Boolean,
  dayView: String,
  action:String,
  parentId:String,
});

const todo = mongoose.model("goals", todoListSchema);
export default todo;