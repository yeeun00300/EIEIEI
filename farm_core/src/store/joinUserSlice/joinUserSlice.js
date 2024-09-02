import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  address: "",
  detailedAddress: "",
  farm: "",
  birthday: "",
  nickname: "",
  phone: "",
  password: "",
  id: "",
  imgFile: "",
  addressPopup: false,
  passwordError: "",
  passwordMatchError: "",
  passwordMatchSuccess: "",
  idCheck: false,
  idCheckMessage: "",
};

const joinUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload.address;
      state.detailedAddress = action.payload.detailedAddress;
    },
    setFarm: (state, action) => {
      state.farm = action.payload;
    },
    setImgFile: (state, action) => {
      state.imgFile = action.payload;
    },
    setAddressPopup: (state, action) => {
      state.addressPopup = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setPasswordMatchError: (state, action) => {
      state.passwordMatchError = action.payload;
    },
    setPasswordMatchSuccess: (state, action) => {
      state.passwordMatchSuccess = action.payload;
    },
    setIdCheck: (state, action) => {
      state.idCheck = action.payload.check;
      state.idCheckMessage = action.payload.message;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    // Additional reducers for other state variables
  },
});

export const {
  setUsername,
  setEmail,
  setAddress,
  setFarm,
  setImgFile,
  setAddressPopup,
  setPasswordError,
  setPasswordMatchError,
  setPasswordMatchSuccess,
  setIdCheck,
  setId,
} = joinUserSlice.actions;

export default joinUserSlice.reducer;
