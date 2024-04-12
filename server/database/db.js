import mongoose from 'mongoose';

export const Connection =async()=>{
const URL = "mongodb+srv://gsmfurqan:Nfs78612@cluster0.znkdb8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const URL = 'mongodb://localhost:27017/todo'
try {
   await mongoose.connect(URL, {useNewUrlParser:true})
   console.log('connected to todo')

} catch (error) {
    console.log('Error connecting to db')
}
}