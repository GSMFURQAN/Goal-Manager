import express from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import {
  addNewTodo,
  deleteManyTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/dataController.js";
import { getProgress } from "../controller/progressController.js";
import multer from "multer";
import { RegisterUser, fetchAccount, loginUser } from "../controller/userConrtoller.js";
import { addPreferences, getPreferences, updateMany } from "../controller/preferenceController.js";


const jwtSecret = "GoalManagerproject";
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

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get("/todos",verifyToken, getTodos);
router.get("/progress",verifyToken, getProgress);
router.get('/account',verifyToken, fetchAccount)
router.get('/preferences',verifyToken, getPreferences)
router.delete("/delete-todo/:userId/:id",verifyToken, deleteTodo);
router.delete("/deleteMany/:userId/:keyword",verifyToken, deleteManyTodo);
router.post("/add-todo",verifyToken, upload.single("image"), addNewTodo);
router.post('/register', [body('email').isEmail(),body('password','Password too small').isLength({min:5})], RegisterUser)
router.post('/login',[body('email').isEmail(),body('password','Password too small').isLength({min:5})], loginUser)
router.put("/update-todo",verifyToken, upload.single('image'), updateTodo);
router.put("/preferences",verifyToken, addPreferences);
router.put("/update-many",verifyToken, updateMany);

export default router;
