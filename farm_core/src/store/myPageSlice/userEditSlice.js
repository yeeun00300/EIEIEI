import { createSlice } from "@reduxjs/toolkit";
import { setNickname } from "../joinUserSlice/joinUserSlice";

const initialState = {
  userInfo: {
    name: "",
    email: "",
    profileImage: null,
    nickName: "",
    tel: "",
    farm: "",
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
      state.userInfo.profileImage = action.payload; // state.profileImage -> state.userInfo.profileImage
    },
    setUserNickname: (state, action) => {
      state.userInfo.nickName = action.payload; // state.nickName -> state.userInfo.nickName
    },
    setTel: (state, action) => {
      state.userInfo.tel = action.payload; // state.tel -> state.userInfo.tel
    },
    setFarm: (state, action) => {
      state.userInfo.farm = action.payload; // state.farm -> state.userInfo.farm
    },
    resetUserInfo: (state) => {
      state.userInfo = {
        name: "",
        email: "",
        profileImage: null,
        nickName: "",
        tel: "",
        farm: "",
      };
    },
  },
});

export default userEditSlice.reducer;
export const {
  setName,
  setEmail,
  setProfileImage,
  setFarm,
  setTel,
  setUserNickname,
} = userEditSlice.actions;
