import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, getDatas } from "../../firebase";

const initialState = {
  checkLogin: {},
  farmList: [],
  userList: [],
  isLoading: false,
  userLoading: false,
  farmLoading: false,
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
        // console.log(action.payload);
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFarmList.pending, (state) => {
        state.farmLoading = true;
      })
      .addCase(fetchFarmList.fulfilled, (state, action) => {
        state.farmLoading = false;
        state.farmList = action.payload;
      })
      .addCase(fetchFarmList.rejected, (state, action) => {
        state.farmLoading = false;
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

// 농장 정보 가져오기
const fetchFarmList = createAsyncThunk(
  "farm/fetchFarmList",
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
export { fetchLogin, fetchUserList, fetchFarmList };
