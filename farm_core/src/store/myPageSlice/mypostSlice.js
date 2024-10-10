import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initialState = {
  myPosts: [], // 사용자가 작성한 게시글 목록
  isLoading: false, // 데이터 로딩 상태
  error: null, // 오류 메시지
};

const myPostSlice = createSlice({
  name: "myPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.myPosts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchMyPosts = createAsyncThunk(
  "myPosts/fetchMyPosts",
  async ({ collectionName, queryOptions }, { rejectWithValue }) => {
    try {
      // 여러 communityType을 가져오는 쿼리 옵션
      const data = await getDatas(collectionName, queryOptions);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default myPostSlice.reducer;
