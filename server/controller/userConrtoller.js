import User from "../schema/userSchema.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Preference from "../schema/preferencesSchema.js";

const saltRounds = 10;
const jwtSecret = "GoalManagerproject";
export const fetchAccount = async (req, res) => {
  const users = await User.find();
  try {
    res.status(201).json(users);
  } catch (error) {
    res.status(409).json({ message: error });
    console.log("error fetching the data in db");
  }
};

export const RegisterUser = async (req, res) => {
  const errors = validationResult(req);

  const user = req.body;
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors?.errors?.[0].msg });
    }
    let secPassword = await bcrypt.hash(req.body.password, saltRounds);
    await User.create({
      name: user.name,
      email: user.email,
      password: secPassword,
      orginalPassword: req.body.password,
      userId: Math.floor(Math.random()*100000).toString()
    });
    return res
      .status(201)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    res.status(409).json({ message: error });
    console.log("error saving the data in db");
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);

  const user = req.body;
  if (user.email && user.password) {
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors?.errors?.[0].msg });
      }
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      let login = await bcrypt.compare(user.password, existingUser.password);
      if (!login) {
        return res.status(400).json({ error: "Wrong Password" });
      }
      const userPref = await Preference.findOne({userId:existingUser?.userId})
      const data = { user: { id: existingUser.id } };
      const authToken = jwt.sign(data, jwtSecret, {expiresIn:'1d'});
      const userData = {name : existingUser.name, email:existingUser.email, jwt: authToken, userId:existingUser.userId, bgImg:userPref.bgImg}
      return res.json({status:201, success: true, userData });
    } catch (error) {
      res.status(409).json({ message: error });
      console.log("error fetching the data in db");
    }
  } else {
    res.status(409).json({ error: "fields are missing" });
  }
};
