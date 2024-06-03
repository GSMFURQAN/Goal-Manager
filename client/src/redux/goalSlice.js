// dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: null,
};
const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;
const userData = JSON.parse(sessionStorage.getItem('account'))
const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${userData?.jwt}`
  };
};

export const fetchData = (params) => async (dispatch) => {

  dispatch(fetchDataStart());
  try {
    const headers = getAuthHeaders();

    // Perform API call here
    let api = apiUrl + `/todos?userId=${userData?.userId}`;
    if (params.dayView) {
      api += `&dayView=${params.dayView}`;
    }
    if (params.id) {
      api += `&id=${params.id}`;
    }
    if (params.searchtxt) {
      api += `&searchtxt=${params.searchtxt}`;
    }
    if (params.major) {
      api += `&major=${params.major}`;
    }
    if (params.startDate || params.endDate) {
      api += `&startDate=${params.startDate }&endDate=${params.endDate}`;
    }
    const response = await axios.get(api,{headers});
    const data = response.data;
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

const goalSlice = createSlice({
  name: "goal",
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

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  goalSlice.actions;
export default goalSlice.reducer;
