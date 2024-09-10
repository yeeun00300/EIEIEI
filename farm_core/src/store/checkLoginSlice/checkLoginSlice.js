import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, getDatas } from "../../firebase";
// import { getDatasRest } from "../../api";

const initialState = {
  checkLogin: {},
  userList: [],
  isLoading: false,
  userLoading: false,
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
      })
      .addCase(fetchUserList.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.userLoading = false;
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
      // console.log(resultData);
      return resultData;
    } catch (error) {
      console.log(`error : ${error}`);
      return null;
    }
  }
);
// 모든 유저
const fetchUserList = createAsyncThunk(
  "users/fetchUserList",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);

export default checkLoginSlice.reducer;
export { fetchLogin, fetchUserList };
