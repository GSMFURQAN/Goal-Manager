import express from "express";
import { addNewTodo, deleteTodo, getProgress, getTodos, updateTodo } from "../controller/useController.js";

const router = express.Router()
router.get('/todos', getTodos)
router.get('/progress', getProgress)
router.put('/update-todo/:id', updateTodo)
router.post('/add-todo', addNewTodo)
router.delete('/delete-todo/:id', deleteTodo)

export default router;