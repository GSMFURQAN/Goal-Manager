const moment = require('moment');
const Todo = require('./models/todo'); // Adjust the path as needed

export const getProgress = async (req, res) => {
  const params = req.query;
  let progress = [];

  try {
    const query = { userId: params?.userId };
    const projection = { done: 1, dueDate: 1 };

    if (params.dayView === "all") {
      progress = await Todo.find(query, projection);
    } else if (params.dayView === "day") {
      query.dueDate = { $lt: moment().endOf("day").toDate() };
      progress = await Todo.find(query, projection);
    } else if (params.dayView === "month") {
      query.dueDate = {
        $gt: moment().startOf("day").toDate(),
        $lt: moment().endOf("month").toDate(),
      };
      progress = await Todo.find(query, projection);
    } else if (params.dayView === "year") {
      query.dueDate = {
        $gt: moment().add(1, "month").startOf("month").toDate(),
        $lt: moment().endOf("year").toDate(),
      };
      progress = await Todo.find(query, projection);
    } else if (params.dayView === "future") {
      query.dueDate = {
        $gt: moment().add(1, "year").startOf("year").toDate(),
        $lt: moment().endOf("year").toDate(),
      };
      progress = await Todo.find(query, projection);
    } else if (params.dayView === "previous") {
      query.dueDate = {
        $lt: moment().startOf("day").toDate(),
      };
      progress = await Todo.find(query, projection).sort({ dueDate: -1 });
    }

    // Adding elapsed field
    progress = progress.map((x) => ({
      ...x._doc,
      elapsed: x._doc.dueDate < new Date(),
    }));

    res.status(201).json(progress);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
