import Todo from "../schema/todoListSchema.js";
import { ObjectId } from "mongodb";
import moment from "moment";

  export const getTodos = async (req, res) => {
    const params = req.query;
    let todos = "";

    console.log("tam", params);
    // --------------------------------------------------------------------------
    if (params.id) {
      let all = await Todo.findOne({_id:params.id});
      todos = [all];
      // Todo.insert;
      console.log('checkid',params, )
    }
  // -----------------------------------------------------------------------------
  if (params.searchtxt) {
    let all = await Todo.find({
      title: { $regex: new RegExp(params.searchtxt, "i") },
    });
    todos = all;
    console.log('checksearch',params, )

  }
  // -----------------------------------------------------------------------------
  if (params.major) {
    let all = await Todo.find({
      major: true,
    });
    todos = all;
    console.log('majorSearch',params, )

  }
  // // --------------------------------------------------------------------------------
  if (params.viewed) {
    let all = await Todo.find({
      viewed: params.viewed},{_id:1,viewed:1,title:1,dueDate:1}
    );
    todos = all;
    console.log('checkview',params, )

  }
  // // ---------------------------------------------------------------------------------
  if (params.startDate || params.endDate) {
    let all;

    all = await Todo.find({
      dueDate: {
        $gt: params.startDate,
        $lt: params.endDate,
      },
    });
    todos = all;
    console.log('checkstart',params, )
  }

  // -------------------------------------------------------------------------------
  if (params.dayView) {
    if (params.dayView == "all") {
      let all = await Todo.find({ done: false }).sort({ dueDate: 1 });
      todos = all;
    } else {
      let all;
      if (params.dayView === "day") {
        all = await Todo.find({
          dueDate: { $gt: moment().startOf("day").toDate(),
          $lt: moment().endOf("day").toDate()
           },
        }).sort({
          dueDate: -1,
        });
      }
      if (params.dayView === "month") {
        all = await Todo.find({
          dueDate: {
            $gt: moment().startOf("day").toDate(),
            $lt: moment().endOf("month").toDate(),
          },
        }).sort({
          dueDate: 1,
        });
      }
      if (params.dayView === "year") {
        all = await Todo.find({
          dueDate: {
            $gt: moment().add(1, "month").startOf("month").toDate(),
            $lt: moment().endOf("year").toDate(),
          },
        }).sort({
          dueDate: -1,
        });
      }
      if (params.dayView === "future") {
        all = await Todo.find({
          dueDate: {
            $gt: moment().add(1, "year").startOf("year").toDate(),
            $lt: moment().endOf("year").toDate(),
          },
        }).sort({
          dueDate: -1,
        });
      }
      if (params.dayView === "previous") {
        all = await Todo.find({
          dueDate: {
            $lt: moment().startOf("day").toDate(),
          },
        }).sort({
          dueDate: -1,
        });
      }

      todos = all;
    }
    console.log('checkday',params, )

  }
  if (Object.keys(params).length === 0) {
    todos = [];
  }
  console.log("cetd", todos);
  todos = await todos?.map((x) => ({
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
    const { _id, ...newTodo } = todo;
    await Todo.updateOne({ _id: req.body._id }, { $set: newTodo });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log("error saving the data in db", error);
    res.status(409).json({ message: error.message });
  }
};

export const addNewTodo = async (req, res) => {
  const todo = req.body;
  console.log('daxz', todo)
  const newTodo = new Todo(todo);
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
    await Todo.deleteOne({ _id: req.params.id });
    res.status(201).json("User deleted Successfully");
  } catch (error) {
    console.log("error saving the data in db", error);
    res.status(409).json({ message: error.message });
  }
};
