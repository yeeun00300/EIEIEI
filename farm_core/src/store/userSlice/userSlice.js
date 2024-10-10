import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  uid: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.isAuthenticated = true;

      // localStorage.setItem("user", JSON.stringify(state));
    },
    resetUser: (state) => {
      state.email = "";
      state.token = "";
      state.uid = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase();
  },
});

// const updateUser = createAsyncThunk("");
export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;
