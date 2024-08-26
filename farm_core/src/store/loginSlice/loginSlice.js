import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    notLogin: false,
    adminLogin: true,
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
  //   extraReducers: {},
});

export const {
  setUsername,
  setPassword,
  setIsLoading,
  setError,
  setAdminLogin,
  setNotLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
