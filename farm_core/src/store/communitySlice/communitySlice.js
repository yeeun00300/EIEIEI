import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCommunityDatas,
  db,
  deleteCommunityDatas,
  getCommunityDatas,
  reportCommentDatas,
  updateComment,
  updateCommunityDatas,
} from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const initialState = {
  noticeContents: [],
  communityContents: [],
  livestockContents: [],
  questionContents: [],
  isLoading: false,
  error: null,
  selectedItem: null,
  comments: [],
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
        } else if (action.meta.arg.communityType === "question") {
          state.questionContents = action.payload; // 축산 관리 게시판 데이터
        } else if (action.meta.arg.communityType === "notice") {
          state.noticeContents = action.payload; // 축산 관리 게시판 데이터
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
        } else if (communityType === "question") {
          const index = state.questionContents.findIndex(
            (post) => post.id === id
          );
          if (index !== -1) {
            state.questionContents[index] = {
              ...state.questionContents[index],
              ...updates,
            };
          }
        } else if (communityType === "notice") {
          const index = state.noticeContents.findIndex(
            (post) => post.id === id
          );
          if (index !== -1) {
            state.noticeContents[index] = {
              ...state.noticeContents[index],
              ...updates,
            };
          }
        }
        state.isLoading = false;
      })
      .addCase(updateCommunityPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // rejectWithValue에서 반환한 오류 메시지 사용
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
      })
      // 좋아요 싫어요

      .addCase(updatePostReactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePostReactions.fulfilled, (state, action) => {
        const { id, updates, communityType } = action.payload;
        const targetList =
          communityType === "freeboard"
            ? state.communityContents
            : state.livestockContents;
        const index = targetList.findIndex((post) => post.id === id);
        if (index !== -1) {
          targetList[index] = { ...targetList[index], ...updates };
        }
        state.isLoading = false;
      })
      .addCase(updatePostReactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // 게시글 신고
      .addCase(reportPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const targetList = state.communityContents.find(
          (post) => post.id === id
        )
          ? state.communityContents
          : state.livestockContents;
        const index = targetList.findIndex((post) => post.id === id);
        if (index !== -1) {
          targetList[index] = { ...targetList[index], ...updates };
        }
        state.isLoading = false;
      })
      .addCase(reportPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // rejectWithValue에서 반환한 오류 메시지 사용
      })
      // 댓글 신고 처리
      .addCase(reportComment.fulfilled, (state, action) => {
        const { postId, commentId, updates } = action.payload; // payload에서 값 가져오기
        const post = state.communityContents.find((post) => post.id === postId);
        if (post) {
          // comments가 존재하는지 확인
          if (Array.isArray(post.comments)) {
            const commentIndex = post.comments.findIndex(
              (comment) => comment.id === commentId
            );
            if (commentIndex !== -1) {
              post.comments[commentIndex] = {
                ...post.comments[commentIndex],
                ...updates,
              };
            } else {
              console.error(
                "Comment not found with the given commentId:",
                commentId
              );
            }
          } else {
            console.error("Comments array is not defined for postId:", postId);
          }
        }
        state.isLoading = false;
      })
      .addCase(reportComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
  "community/createPost",
  async ({ communityType, dataObj }, { rejectWithValue }) => {
    try {
      const newPost = await addCommunityDatas(communityType, dataObj);
      return newPost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// 비동기 작업: 게시글 업데이트
const updateCommunityPost = createAsyncThunk(
  "community/updatePost",
  async ({ id, updates, imgUrl }, { rejectWithValue }) => {
    try {
      const updatedData = await updateCommunityDatas(id, updates, imgUrl);
      return { id, updates: updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 비동기 작업: 게시글 삭제
const deleteCommunityPost = createAsyncThunk(
  "community/deleteCommunityPost",
  async ({ id, communityType, imgUrl }) => {
    try {
      await deleteCommunityDatas(id, imgUrl);
      return { id, communityType };
    } catch (error) {
      console.error("게시글 삭제에 실패했습니다:", error);
      throw error;
    }
  }
);
// 좋아요 싫어요 구현

const updatePostReactions = createAsyncThunk(
  "community/updatePostReactions",
  async ({ id, updates, communityType }, { rejectWithValue }) => {
    try {
      const updatedData = await updateCommunityDatas(id, updates);
      return { id, updates: updatedData, communityType };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 비동기 작업: 게시글 신고
const reportPost = createAsyncThunk(
  "community/reportPost",
  async ({ id, reason, state }, { rejectWithValue }) => {
    try {
      if (!state) {
        const postRef = doc(db, "community", id);

        // Firestore에서 현재 게시물의 데이터를 가져옵니다.
        const docSnap = await getDoc(postRef);
        const postData = docSnap.data();

        // 기존 신고 사유 배열을 가져오거나 빈 배열을 초기값으로 설정
        const existingReasons = postData?.declareReason || [];

        // 새로운 사유를 배열에 추가
        const updatedReasons = [...existingReasons, reason];

        // 현재 신고 횟수를 읽어와서 1을 추가
        const updatedCount = (postData?.declareCount || 0) + 1;

        // 업데이트할 데이터
        const updates = {
          declareReason: updatedReasons, // 배열로 업데이트
          declareState: "reported",
          declareCount: updatedCount, // 카운트 업데이트
        };
        // 문서 필드 데이터 수정
        await updateCommunityDatas(id, updates);

        return { id, updates };
      } else {
        // state 값이 있을 때는 declareState의 값을 "black" 또는 "checked" 값으로 업데이트
        const updates = {
          declareState: state,
        };
        // 문서 필드 데이터 수정
        await updateCommunityDatas(id, updates);

        return { id, updates };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// 비동기 작업: 댓글 신고
const reportComment = createAsyncThunk(
  "community/reportComment",
  async ({ postId, commentId, reason }, { rejectWithValue }) => {
    try {
      const commentRef = doc(db, "community", postId, "comments", commentId);
      const commentSnap = await getDoc(commentRef);
      const commentData = commentSnap.data();

      // 기존 필드값을 가져옵니다.
      const existingReasons = commentData?.subDeclareReason || [];
      const updatedCount = (commentData?.subDeclareCount || 0) + 1;

      // 신고 상태 업데이트
      const updatedState = "reported";

      // 신고 이유 배열에 새로운 이유 추가
      const updatedReasons = [...new Set([...existingReasons, reason])]; // 중복 제거를 위해 Set 사용

      const updates = {
        subDeclareState: updatedState, // 상태 업데이트
        subDeclareReason: updatedReasons, // 신고 이유 업데이트
        subDeclareCount: updatedCount, // 신고 횟수 업데이트
      };

      // Firestore에서 해당 댓글 문서 업데이트
      await updateComment(commentRef, updates); // 댓글 참조를 전달

      return { postId, commentId, updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default communitySlice.reducer;
export {
  fetchCommunityPosts,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  updatePostReactions,
  reportPost,
  reportComment,
};
