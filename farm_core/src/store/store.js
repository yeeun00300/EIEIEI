import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./myPageSlice/addressSlice";
import loginSlice from "./loginSlice/loginSlice";
import communitySlice from "./communitySlice/communitySlice";
import userInfoEditSlice from "./userInfoEditSlice/UserInfoEditSlice";
import userEditSlice from "./myPageSlice/userEditSlice";
import mapAddrSlice from "./addressSlice/mapAddrSlice";
import PRexcelSlice from "./excelStroageSlice/PRexcelSlice";
import joinUserSlice from "./joinUserSlice/joinUserSlice";
import stockListSlice from "./stockListSlice/stockListSlice";
const store = configureStore({
  reducer: {
    addressSlice,
    loginSlice,
    communitySlice,
    userInfoEditSlice,
    user: userEditSlice,
    mapAddrSlice,
    PRexcelSlice,
    joinUserSlice,
    stockListSlice,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
export default store;
