import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, getDatas } from "../../firebase";
// import { getDatasRest } from "../../api";

const initialState = {
  checkLogin: {},
  isLoading: false,
  error: "",
};

const checkLoginSlice = createSlice({
  name: "checkLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkLogin = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const fetchLogin = createAsyncThunk(
  "Login/fetchLogin",
  // 첫번째 파라미터는 payload--> state변경 , 두번째 파라미터는 dispatch 가능
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getData(collectionName, queryOptions);
      console.log(resultData);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);

export default checkLoginSlice.reducer;
export { fetchLogin };
