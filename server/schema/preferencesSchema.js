import mongoose, { Schema } from "mongoose";
const preferencesSchema = new mongoose.Schema({
    userId: String,
bgImg : String,
theme: String

})
const preference = new mongoose.model('preferences', preferencesSchema)

export default preference