import { configureStore } from "@reduxjs/toolkit";
import addrSlice from "./myPageSlice/addressSlice";
import addressSlice from "./myPageSlice/addressSlice";
import loginSlice from "./loginSlice/loginSlice";
import communitySlice from "./communitySlice/communitySlice";
const store = configureStore({
  reducer: {
    addressSlice,
    loginSlice,
    communitySlice,
  },
});
export default store;
