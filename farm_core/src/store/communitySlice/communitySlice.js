import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCommunityDatas, getCommunityDatas, getDatas } from "../../firebase";

const initialState = {
  communityContents: [],  
  photoUrl: "",
  communityType: "",
  title: "",
  contents: "",
  createdAt: null,
  updatedAt: null,
  like: 0,
  dislike: 0,
  declareReason: "",
  declareState: "",
  declareCount: 0,
  stockType: "",
  notice: false,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // 게시글 조회
      .addCase(fetchCommunityPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCommunityPost.fulfilled, (state, action) => {
        state.communityContents = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCommunityPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // 게시글 생성
      .addCase(createCommunityPost.pending, (state, action)=>{
        state.isLoading = true;
      })
      .addCase(createCommunityPost.fulfilled, (state, action)=>{
        state.communityContents.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCommunityPost.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

const fetchCommunityPost = createAsyncThunk(
  "community/fetchPosts/",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getCommunityDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);
const createCommunityPost = createAsyncThunk(
  'community/createPost',
  async ({ collectionName, dataObj }) => {
    try {
      const data = await addCommunityDatas(collectionName, dataObj);
      return data;
    } catch (error) {
      console.error('커뮤니티 게시글 생성에 실패했습니다:', error);
      throw error; // 에러를 다시 던져서 Redux가 실패 상태를 알 수 있게 처리
    }
  }
);
export default communitySlice.reducer;
export { fetchCommunityPost, createCommunityPost };
