import express from "express";
import {
  addNewTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/useController.js";
import { getProgress } from "../controller/progressController.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/todos", getTodos);
router.get("/progress", getProgress);
router.put("/update-todo/", upload.single('image'), updateTodo);
router.post("/add-todo", upload.single("image"), addNewTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router;
