import express from "express";
import { Connection } from "./database/db.js";
import Routes from "./routes/routes.js";
import cors from "cors";
const app = express();
const Port = 8000;
Connection();
app.use(express.json());
app.use( express.static('uploads'))
app.use(
  cors({
    origin: ["https://goal-manager-client.vercel.app","http://localhost:3000"],
    methods: ["POST", "GET","PUT","DELETE"],
    credentials: true,
  })
);
app.use("/", Routes);
app.listen(Port, () => console.log("Server launched Sir"));
