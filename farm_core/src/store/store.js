import { configureStore } from "@reduxjs/toolkit";
import addrSlice from "./myPageSlice/addressSlice";
import addressSlice from "./myPageSlice/addressSlice";
import loginSlice from "./loginSlice/loginSlice";
const store = configureStore({
  reducer: {
    addressSlice,
    loginSlice,
  },
});
export default store;
