import mongoose from 'mongoose';

export const Connection =async()=>{
const URL = "mongodb+srv://gsmfurqan:asdf1234@cluster0.znkdb8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const URL = 'mongodb://localhost:27017/todo'
// mongosh "mongodb+srv://cluster0.znkdb8z.mongodb.net/" --apiVersion 1 --username gsmfurqan
try {
   await mongoose.connect(URL, {useNewUrlParser:true ,useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 10000 })
   console.log('connected to todo')

} catch (error) {
    console.log('Error connecting to db')
}
}