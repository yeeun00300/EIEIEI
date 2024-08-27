import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    notLogin: true,
    adminLogin: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNotLogin: (state, action) => {
      state.notLogin = action.payload;
    },
    setAdminLogin: (state, action) => {
      state.adminLogin = action.payload;
    },
    resetState: (state) => {
      state.username = "";
      state.password = "";
      state.notLogin = false;
      state.adminLogin = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  // extraReducers: {

  //   },
});

const fetchLogin = createAsyncThunk(
  "Login/fetchLogin",
  // 첫번째 파라미터는 payload--> state변경 , 두번째 파라미터는 dispatch 가능
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);

export const {
  setUsername,
  setPassword,
  setIsLoading,
  setError,
  setAdminLogin,
  setNotLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
