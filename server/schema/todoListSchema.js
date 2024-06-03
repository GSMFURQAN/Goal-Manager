import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
  userId:String,
  title: String,
  note:String,
  dueDate:Date,
  done: Boolean,
  dayView: String,
  action:String,
  parentId:String,
  viewed:String,
  image:String,
  major:Boolean,
});

const todo = mongoose.model("goals", todoListSchema);
export default todo;
