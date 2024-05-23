import Todo from "../schema/todoListSchema.js";
import moment from "moment";

export const getProgress = async (req, res) => {
    const params = req.query;
  
    let progress = "";
    if (params.dayView === "all") {
      progress = await Todo.find({}, { done: 1, dueDate: 1 });
    } else {
      progress = await Todo.find(
        { dayView: params.dayView },
        { done: 1, dueDate: 1 }
      );
      if (params.dayView === "day") {
        progress = await Todo.find(
          {
            dueDate: { $lt: moment().endOf("day").toDate() },
          },
          { done: 1, dueDate: 1 }
        );
      }
      if (params.dayView === "month") {
        progress = await Todo.find(
          {
            dueDate: {
              $gt: moment().startOf("day").toDate(),
              $lt: moment().endOf("month").toDate(),
            },
          },
          { done: 1, dueDate: 1 }
        );
      }
      if (params.dayView === "year") {
        progress = await Todo.find(
          {
            dueDate: {
              $gt: moment().add(1, "month").startOf("month").toDate(),
              $lt: moment().endOf("year").toDate(),
            },
          },
          { done: 1, dueDate: 1 }
        );
      }
      if (params.dayView === "future") {
        progress = await Todo.find(
          {
            dueDate: {
              $gt: moment().add(1, "year").startOf("year").toDate(),
              $lt: moment().endOf("year").toDate(),
            },
          },
          { done: 1, dueDate: 1 }
        );
      }
      if (params.dayView === "all") {
        progress = await Todo.find({ done: false }, { done: 1, dueDate: 1 });
      }
    }
    progress = await progress?.map((x) => ({
      ...x._doc,
      elapsed: x._doc.dueDate < new Date(),
    }));
  
    try {
      res.status(201).json(progress);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };