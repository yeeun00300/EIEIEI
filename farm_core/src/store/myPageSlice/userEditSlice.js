import { createSlice } from "@reduxjs/toolkit";
import { setNickname } from "../joinUserSlice/joinUserSlice";
import { createSelector } from "@reduxjs/toolkit";
const initialState = {
  userInfo: {
    name: "",
    email: "",
    profileImages: null,
    nickname: "",
    phone: "",
  },
  isLoading: false,
  error: null,
};

const userEditSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.userInfo.name = action.payload; // state.name -> state.userInfo.name
    },
    setEmail: (state, action) => {
      state.userInfo.email = action.payload; // state.email -> state.userInfo.email
    },
    setProfileImage: (state, action) => {
      state.userInfo.profileImages = action.payload;
      console.log("Profile Image Updated in Reducer:", action.payload); // 콘솔에 출력
    },
    setUserNickname: (state, action) => {
      state.userInfo.nickname = action.payload; // state.nickName -> state.userInfo.nickName
    },
    setTel: (state, action) => {
      state.userInfo.phone = action.payload; // state.tel -> state.userInfo.tel
    },
    resetUserInfo: (state) => {
      state.userInfo = {
        name: "",
        email: "",
        profileImages: null,
        nickname: "",
        phone: "",
      };
    },
  },
});

export const EditSelectProfileImageURL = createSelector(
  (state) => state.userEditSlice.userInfo.profileImages,
  (profileImages) => profileImages
);

export default userEditSlice.reducer;
export const { setName, setEmail, setProfileImage, setTel, setUserNickname } =
  userEditSlice.actions;
