import Todo from "../schema/todoListSchema.js";
import moment from "moment";

export const getProgress = async (req, res) => {
  const params = req.query;
  let progress = [];

  try {
    const query = { userId: params?.userId };
    const projection = { done: 1, dueDate: 1 };

    if (params.dayView === "all") {
      progress = await Todo.find(query, projection).sort({ dueDate: -1 });
    } else if (params.dayView === "day") {
      query.dueDate = {
        $gt: moment().startOf("day").toDate(),
        $lt: moment().endOf("day").toDate(),
      };
      progress = await Todo.find(query, projection);
    } else if (params.dayView === "tomorrow") {
      query.dueDate = {
        $gt: moment().add(1, "day").startOf("day").toDate(),
        $lt: moment().add(1, "day").endOf("day").toDate(),
      };
      progress = await Todo.find(query, projection);
    } else if (params.dayView === "future") {
      query.dueDate = {
        $gt: moment().add(2, "day").startOf("day").toDate(),
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
