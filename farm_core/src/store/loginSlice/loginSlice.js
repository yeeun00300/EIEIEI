import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

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
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNotLogin: (state, action) => {
      state.notLogin = action.payload;
      localStorage.setItem("notLogin", JSON.stringify(state.notLogin));
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

  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
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
  setEmail,
  setProfileImage,
  setIsLoading,
  setError,
  setAdminLogin,
  setNotLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
