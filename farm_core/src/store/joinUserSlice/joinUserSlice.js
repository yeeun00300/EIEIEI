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
  phoneVerificationCode: "",
  phoneVerificationStatus: "",
  isPhoneVerified: false,
  recaptchaVerifier: null,
  sentCode: "",
};

const joinUserSlice = createSlice({
  name: "joinuser",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
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
    setPhoneVerificationCode: (state, action) => {
      state.phoneVerificationCode = action.payload;
    },
    setPhoneVerificationStatus: (state, action) => {
      state.phoneVerificationStatus = action.payload;
    },
    setIsPhoneVerified: (state, action) => {
      state.isPhoneVerified = action.payload;
    },
    setRecaptchaVerifier: (state, action) => {
      state.recaptchaVerifier = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCode: (state, action) => {
      state.verificationCode = action.payload;
    },
    setSentCode: (state, action) => {
      state.sentCode = action.payload;
    },
    setIsCodeSent: (state, action) => {
      state.isCodeSent = action.payload;
    },
    setIsEmailVerified: (state, action) => {
      state.isEmailVerified = action.payload;
    },
    // Additional reducers for other state variables
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.uid = "";
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    },
  },
});

export const {
  setUsername,
  setNickname,
  setEmail,
  setAddress,
  setFarm,
  setImgFile,
  setAddressPopup,
  setPasswordError,
  setPasswordMatchError,
  setPasswordMatchSuccess,
  setIdCheck,
  setPhone,
  setId,
  setBirthday,
  setPhoneVerificationCode,
  setPhoneVerificationStatus,
  setIsPhoneVerified,
  setRecaptchaVerifier,
  removeUser,
  setPassword,
  setVerificationCode,
  setSentCode,
  setIsCodeSent,
  setIsEmailVerified,
} = joinUserSlice.actions;

export default joinUserSlice.reducer;
