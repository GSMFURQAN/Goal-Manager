import Todo from "../schema/todoListSchema.js";
export const getTodos = async (req, res) => {
  const params = req.query;
  let todos = "";
  if (params.id != "undefined") {
    todos = await Todo.find({ _id: params.id });
    console.log("dsd", todos, params.id);
    Todo.insert
  } else if (params.dayView != "undefined") {
    let all = await Todo.find({ dayView: params.dayView });
    todos = all
  } else {
    todos = await Todo.find({ dayView: "dayView" });
    console.log('dd',Todo.find())  
  }
  try {
    res.status(201).json(todos);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log("error fetching the data in db");
  }
};

export const getProgress = async(req,res)=>{
  const params = req.query;
  console.log('pi',params)
  
  let progress ='';
  if(params.dayView === 'all'){
    progress =  await Todo.find({},{done:1})
  }else{
    progress =  await Todo.find({dayView:params.dayView},{done:1})

  }
  try{
    res.status(201).json(progress)
  }catch(error){
    res.status(409).json({ message: error.message });

  }
}

export const updateTodo = async (req, res) => {
  const todo = req.body;
  try {
    const { _id, ...newTodo } = todo;
    await Todo.updateOne({ _id: req.params.id }, { $set: newTodo });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log("error saving the data in db", error);
    res.status(409).json({ message: error.message });
  }
};

export const addNewTodo = async (req, res) => {
  const todo = req.body;
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
