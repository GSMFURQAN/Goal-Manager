// src/redux/reducers.js
import { combineReducers } from "redux";
import {reducers} from "./generalSlice"; 
import progressReducer from './donutSlice';
import goalReducer from './goalSlice'
import tabReducer from './tabSlice'

const rootReducer = combineReducers({
  general: reducers.generalSlice, 
  progress: progressReducer,
  snack:reducers.snackSlice,
  goal:goalReducer,
  tab : tabReducer
});

export default rootReducer;
