// src/redux/reducers.js
import { combineReducers } from "redux";
import {reducers} from "./generalSlice"; 
import goalReducer from './goalSlice'
const rootReducer = combineReducers({
  general: reducers.generalSlice, 
  progress: reducers.progressSlice,
  snack:reducers.snackSlice,
  goal:goalReducer
});

export default rootReducer;
