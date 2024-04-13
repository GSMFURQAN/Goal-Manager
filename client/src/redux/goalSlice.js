// dataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: null,
  loading: false,
  error: null,
};
const URL = 'http://localhost:8000'
const URLPROD = 'https://goal-manager-server.vercel.app'

export const fetchData = (params) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    // Perform API call here
    const response = await axios.get(URLPROD + `/todos?dayView=${params.dayView}&id=${params.id}`)
    const data =  response.data;
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
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

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = goalSlice.actions;
export default goalSlice.reducer;
