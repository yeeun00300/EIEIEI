import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, getDatas, updateDatas } from "../../firebase";
import { auth } from "../../firebase"; // Firebase 인증 import

const initialState = {
  // userInfo: null, // 유저 정보 저장 (단일 객체로 수정)
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
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const currentUser = auth.currentUser; // 현재 로그인된 사용자 가져오기
        state.userInfo = action.payload;
        // if (currentUser) {
        //   const user =
        //     action.payload.find((user) => user.email === currentUser.email) ||
        //     {}; // 이메일로 필터링
        //   state.userInfo = user; // 현재 로그인된 유저의 정보만 저장
        //   state.name = user.name || "";
        //   state.email = user.email || "";
        //   state.nickname = user.nickname || "";
        //   state.phone = user.phone || "";
        //   state.address = user.address || "";
        //   state.detailedAddress = user.detailedAddress || "";
        //   state.profileImages = user.profileImages || "";
        // }
        // console.log(currentUser);
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userInfo = action.payload; // 새로 추가된 유저 정보 저장
        console.log("User added:", action.payload); // 추가된 유저 정보 콘솔 출력
        state.isLoading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userInfoUpdate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userInfoUpdate.fulfilled, (state, action) => {
        state.userInfo = state.userInfo.map((user) => {
          return user.docId === action.payload.docId
            ? { ...user, ...action.payload }
            : user;
        });
      })
      .addCase(userInfoUpdate.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Firebase에서 데이터를 가져오는 Thunk 함수
const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData; // 쿼리 결과 반환
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// 유저 정보를 추가하는 Thunk 함수
const addUser = createAsyncThunk(
  "user/addUser",
  async ({ collectionName, userObj }) => {
    try {
      const docId = await addDatas(collectionName, userObj);
      return { ...userObj, docId }; // Firestore 문서 ID 포함
    } catch (error) {
      throw new Error("유저 정보를 추가하는 데 실패했습니다.");
    }
  }
);
//업데이트
const userInfoUpdate = createAsyncThunk(
  "user/update",
  async ({ collectionName, docId, updateObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData;
    } catch (error) {
      throw new Error("유저 정보를 수정하는데 실패했습니다.");
    }
  }
);

export default userInfoEditSlice.reducer;
export { fetchUser, addUser, userInfoUpdate };
