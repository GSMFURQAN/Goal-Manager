import Todo from "../schema/todoListSchema.js";
import { ObjectId } from "mongodb";
import moment from "moment";
import { sendGoalAddedEmail } from "../services/emailService.js";
import User from "../schema/userSchema.js";

 

export const getTodos = async (req, res) => {
  const params = req.query;
  let todos = [];

  console.log("params", params);
  
  // --------------------------------------------------------------------------
  if (params.id) {
    let all = await Todo.findOne({ _id: params.id, userId: params?.userId });
    todos = [all];
    console.log('checkid', params);
  }
  
  // -----------------------------------------------------------------------------
  if (params.searchtxt) {
    let all = await Todo.find({
      title: { $regex: new RegExp(params.searchtxt, "i") },
      userId: params?.userId
    });
    todos = all;
    console.log('checksearch', params);
  }
  
  // -----------------------------------------------------------------------------
  if (params.major) {
    let all = await Todo.find({
      major: true,
      userId: params?.userId
    });
    todos = all;
    console.log('majorSearch', params);
  }
  
  // // --------------------------------------------------------------------------------
  if (params.viewed) {
    let all = await Todo.find({
      viewed: params.viewed,
      userId: params?.userId
    }, {
      _id: 1, viewed: 1, title: 1, dueDate: 1
    });
    todos = all;
    console.log('checkview', params);
  }
  
  // // ---------------------------------------------------------------------------------
  if (params.startDate || params.endDate) {
    let all = await Todo.find({
      userId: params?.userId,
      dueDate: {
        ...(params.startDate && { $gt: new Date(params.startDate) }),
        ...(params.endDate && { $lt: new Date(params.endDate) })
      }
    });
    todos = all;
    console.log('checkstart', params, all);
  }
  
  // -------------------------------------------------------------------------------
  if (params.dayView) {
    let all;
    const userIdCondition = { userId: params?.userId };
    
    if (params.dayView == "all") {
      all = await Todo.find({ ...userIdCondition, done: false }).sort({ dueDate: 1 });
    } else if (params.dayView === "day") {
      all = await Todo.find({
        ...userIdCondition,
        dueDate: {
          $gt: moment().startOf("day").toDate(),
          $lt: moment().endOf("day").toDate()
        }
      }).sort({ dueDate: -1 });
    } else if (params.dayView === "tomorrow") {
      all = await Todo.find({
        ...userIdCondition,
        dueDate: {
          $gt: moment().add(1,'day').startOf("day").toDate(),
          $lt: moment().add(1,'day').endOf("day").toDate()
        }
      }).sort({ dueDate: 1 });
    } else if (params.dayView === "future") {
      all = await Todo.find({
        ...userIdCondition,
        dueDate: {
          $gt: moment().add(2,'day').startOf("day").toDate(),
        }
      }).sort({ dueDate: 1 });
   
    } else if (params.dayView === "previous") {
      all = await Todo.find({
        ...userIdCondition,
        dueDate: {
          $lt: moment().startOf("day").toDate()
        }
      }).sort({ dueDate: -1 });
    }
    
    todos = all;
    console.log('checkday', params);
  }
  
  if (Object.keys(params).length === 0) {
    todos = [];
  }
  
  console.log("todos", todos);
  
  todos = todos.map((x) => ({
    ...x._doc,
    elapsed: x._doc.dueDate < new Date(),
  }));
  
  try {
    res.status(201).json(todos);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log("error fetching the data in db");
  }
};


export const updateTodo = async (req, res) => {
  const todo = req.body;
 
  try {
    const { _id, userId, ...newTodo } = todo;
    await Todo.updateOne({ _id: req.body._id, userId:req?.body?.userId }, { $set: newTodo });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log("error saving the data in db", error);
    res.status(409).json({ message: error.message });
  }
};

export const addNewTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = new Todo(todo);
  const userDetails =await User.findOne({userId:todo.userId})
  // console.log('daxz', todo, name)
  todo.major && sendGoalAddedEmail(userDetails.email, userDetails.name, todo.title,  todo.dueDate, todo.note)
  try {
    const result = await newTodo.save();
    res.status(201).json(result);
  } catch (error) {
    console.log("error saving the data in db", error);
    res.status(409).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id, userId:req?.params?.userId });
    res.status(201).json("User deleted Successfully");
  } catch (error) {
    console.log("error saving the data in db", error);
    res.status(409).json({ message: error.message });
  }
};
