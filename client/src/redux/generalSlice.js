import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = 'http://localhost:8000'
const URLPROD = 'https://goal-manager-server.vercel.app'
axios.defaults.withCredentials =true

const generalSlice = createSlice({
  name: "general",
  initialState: { dayView: "daily", theme: true, id: "", action: '' },
  reducers: {
    selectView: (state, payload) => {
      console.log('ee',payload)
      state.dayView = payload.payload.dayView;
      state.theme = payload.payload.theme;
      state.id = payload.payload.id;
      state.action = payload.payload.action;
    },
  },
});
const snackSlice = createSlice({
  name: "snack",
  initialState: { severity: "", message: '',open:false  },
  reducers: {
    selectSnack: (state, payload) => {
      state.severity = payload.payload.severity;
      state.message = payload.payload.message;
      state.open = payload.payload.open;
    
    },
  },
});

export const getProgress =(params) =>async(dispatch)=>{
  dispatch(fetchDataStart())
  try {
    const response =  await axios.get(URLPROD + `/progress?dayView=${params.dayView}`)
    dispatch(fetchDataSuccess(response.data))
  } catch (error) {
      console.log('Error fetching data')
      dispatch(fetchDataFailure(error.message))
  }
}

const progressSlice = createSlice({
  name: "progress",
  initialState: { data: null, loading: false, error: null },
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { selectView } = generalSlice.actions;
export const { selectSnack } = snackSlice.actions;
export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = progressSlice.actions;
export const reducers = {progressSlice: progressSlice.reducer, generalSlice: generalSlice.reducer, snackSlice:snackSlice.reducer};
