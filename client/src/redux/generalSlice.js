import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;
const userData = JSON.parse(sessionStorage?.getItem("account"));

const generalSlice = createSlice({
  name: "general",
  initialState: {
    dayView: "day",
    theme: true,
    id: "",
    action: "",
    dueDate: "",
    bgImg: "",
    addGoalOpen: false,
    progressOpen: true,
    // category:{id:null,label:''},
    category:null,
  },
  reducers: {
    selectView: (state, payload) => {
      state.dayView = payload.payload.dayView;
      state.theme = payload.payload.theme;
      state.id = payload.payload.id;
      state.action = payload.payload.action;
      state.dueDate = payload.payload.dueDate;
      state.bgImg = payload.payload.bgImg;
      state.addGoalOpen = payload.payload.addGoalOpen;
      state.progressOpen = payload.payload.progressOpen;
      state.category = payload.payload.category;
      // state.category.label = payload.payload.category.label;
    },
  },
});
const snackSlice = createSlice({
  name: "snack",
  initialState: { severity: "", message: "", open: false },
  reducers: {
    selectSnack: (state, payload) => {
      state.severity = payload.payload.severity;
      state.message = payload.payload.message;
      state.open = payload.payload.open;
    },
  },
});



export const { selectView } = generalSlice.actions;
export const { selectSnack } = snackSlice.actions;

export const reducers = {
  generalSlice: generalSlice.reducer,
  snackSlice: snackSlice.reducer,
};
