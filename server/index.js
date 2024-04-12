import express  from "express";
import { Connection } from "./database/db.js";
import Routes from './routes/routes.js'
import cors from 'cors'
const app = express()
const Port = 8000;
Connection()
app.use(express.json())
app.use(cors({}))
app.use('/', Routes)
app.listen(Port, ()=>console.log('Server launched Sir'))