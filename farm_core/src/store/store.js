import { configureStore } from "@reduxjs/toolkit";
import addrSlice from "./myPageSlice/addressSlice";
import addressSlice from "./myPageSlice/addressSlice";
import loginSlice from "./loginSlice/loginSlice";
import communitySlice from "./communitySlice/communitySlice";
import userInfoEditSlice from "./userInfoEditSlice/UserInfoEditSlice";
import userEditSlice from "./myPageSlice/userEditSlice";
const store = configureStore({
  reducer: {
    addressSlice,
    loginSlice,
    communitySlice,
    userInfoEditSlice,
    user: userEditSlice,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
export default store;
