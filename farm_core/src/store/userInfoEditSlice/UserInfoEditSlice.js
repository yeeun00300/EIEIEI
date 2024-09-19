import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initialState = {
  userInfo: [],
  isLoading: false,
  error: null,
  name: "",
  email: "",
  nickname: "",
  phone: "",
  profileImages: "",
};

const userInfoEditSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setUserNickname(state, action) {
      state.nickname = action.payload;
    },
    setTel(state, action) {
      state.phone = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setDetailedAddress(state, action) {
      state.detailedAddress = action.payload;
    },
    setProfileImage(state, action) {
      state.profileImages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const user = action.payload[0] || {};
        state.userInfo = action.payload;
        state.name = user.name || "";
        state.email = user.email || "";
        state.nickname = user.nickname || "";
        state.phone = user.phone || "";
        state.address = user.address || "";
        state.detailedAddress = user.detailedAddress || "";
        state.profileImages = user.profileImages || "";
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
export const {
  setName,
  setEmail,
  setUserNickname,
  setTel,
  setAddress,
  setDetailedAddress,
  setProfileImage,
} = userInfoEditSlice.actions;
