import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
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
      console.log("Updating user state:", action.payload);
      state.email = action.payload.emai;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase();
  },
});

const updateUser = createAsyncThunk("");
export default userSlice.reducer;
export const { setUser } = userSlice.actions;
