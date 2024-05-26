import express from "express";
import { body } from "express-validator";

import {
  addNewTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/useController.js";
import { getProgress } from "../controller/progressController.js";
import multer from "multer";
import { RegisterUser, fetchAccount, loginUser } from "../controller/userConrtoller.js";

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
router.get('/account', fetchAccount)
router.post('/register', [body('email').isEmail(),body('password','Password too small').isLength({min:5})], RegisterUser)
router.post('/login',[body('email').isEmail(),body('password','Password too small').isLength({min:5})], loginUser)

export default router;
