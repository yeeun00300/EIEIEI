import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initialState = {
  userInfo: [],
  isLoading: false,
  error: null,
};

const userInfoEditSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      // console.log("Fetched Data:", resultData); // 여러 사용자가 있는지 확인
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);

export default userInfoEditSlice.reducer;
export { fetchUser };
