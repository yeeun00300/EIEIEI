import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCommunityDatas,
  deleteCommunityDatas,
  getCommunityDatas,
  updateCommunityDatas,
} from "../../firebase";

const initialState = {
  communityContents: [], // 커뮤니티 게시글 목록
  livestockContents: [], // 축산 관리 게시글 목록
  isLoading: false, // 데이터 로딩 상태
  error: null, // 오류 메시지
  selectedItem: null, // 현재 선택된 게시글 (자세히 보기)
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    // 커뮤니티 게시글 조회
    builder
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
        if (action.meta.arg.communityType === "freeboard") {
          state.communityContents = action.payload; // 자유 게시판 데이터
        } else if (action.meta.arg.communityType === "livestock") {
          state.livestockContents = action.payload; // 축산 관리 게시판 데이터
        }
        state.isLoading = false;
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // 게시글 생성
      .addCase(createCommunityPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCommunityPost.fulfilled, (state, action) => {
        if (action.meta.arg.communityType === "freeboard") {
          state.communityContents.push(action.payload); // 자유 게시판에 게시물 추가
        } else if (action.meta.arg.communityType === "livestock") {
          state.livestockContents.push(action.payload); // 축산 관리 게시판에 게시물 추가
        }
        state.isLoading = false;
      })
      .addCase(createCommunityPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // 게시글 업데이트
      .addCase(updateCommunityPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCommunityPost.fulfilled, (state, action) => {
        const { id, updates, communityType } = action.payload;
        if (communityType === "freeboard") {
          const index = state.communityContents.findIndex(
            (post) => post.id === id
          );
          if (index !== -1) {
            state.communityContents[index] = {
              ...state.communityContents[index],
              ...updates,
            };
          }
        } else if (communityType === "livestock") {
          const index = state.livestockContents.findIndex(
            (post) => post.id === id
          );
          if (index !== -1) {
            state.livestockContents[index] = {
              ...state.livestockContents[index],
              ...updates,
            };
          }
        }
        state.isLoading = false;
      })
      .addCase(updateCommunityPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // 게시글 삭제
      .addCase(deleteCommunityPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCommunityPost.fulfilled, (state, action) => {
        const { id, communityType } = action.payload;
        if (communityType === "freeboard") {
          state.communityContents = state.communityContents.filter(
            (post) => post.id !== id
          );
        } else if (communityType === "livestock") {
          state.livestockContents = state.livestockContents.filter(
            (post) => post.id !== id
          );
        }
        state.isLoading = false;
      })
      .addCase(deleteCommunityPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// 비동기 작업: 게시글 조회
const fetchCommunityPosts = createAsyncThunk(
  "community/fetchCommunityPosts",
  async ({ communityType, queryOptions }) => {
    try {
      // collectionName을 communityType으로 변경
      const data = await getCommunityDatas(communityType, queryOptions);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// 비동기 작업: 게시글 생성
const createCommunityPost = createAsyncThunk(
  "community/createCommunityPost",
  async ({ communityType, dataObj }) => {
    try {
      // collectionName을 communityType으로 변경
      const data = await addCommunityDatas(communityType, dataObj);
      return data;
    } catch (error) {
      console.error("커뮤니티 게시글 생성에 실패했습니다:", error);
      throw error; // 에러를 다시 던져서 Redux가 실패 상태를 알 수 있게 처리
    }
  }
);
// 비동기 작업: 게시글 업데이트
const updateCommunityPost = createAsyncThunk(
  "community/updateCommunityPost",
  async ({ id, updates, communityType }) => {
    try {
      const updatedPost = await updateCommunityDatas(id, updates);
      return { ...updatedPost, communityType };
    } catch (error) {
      console.error("게시글 업데이트에 실패했습니다:", error);
      throw error;
    }
  }
);
// 비동기 작업: 게시글 삭제
const deleteCommunityPost = createAsyncThunk(
  "community/deleteCommunityPost",
  async ({ id, communityType }) => {
    try {
      await deleteCommunityDatas(id);
      return { id, communityType };
    } catch (error) {
      console.error("게시글 삭제에 실패했습니다:", error);
      throw error;
    }
  }
);

export default communitySlice.reducer;
export {
  fetchCommunityPosts,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
};
