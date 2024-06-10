import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
name:String,
email:{type:String, unique:true},
password:String,
originalPassword:String,
userId:String
})
const user = new mongoose.model('users', userSchema)

export default user