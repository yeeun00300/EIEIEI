import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./myPageSlice/addressSlice";
import loginSlice from "./loginSlice/loginSlice";
import communitySlice from "./communitySlice/communitySlice";
import userInfoEditSlice from "./userInfoEditSlice/UserInfoEditSlice";
import userEditSlice from "./myPageSlice/userEditSlice";
import mapAddrSlice from "./addressSlice/mapAddrSlice";
import PRexcelSlice from "./excelStroageSlice/PRexcelSlice";
import joinUserSlice from "./joinUserSlice/joinUserSlice";
import profileImageSlice from "./profileImageSlice/profileImageSlice";
import stockSlice from "./stockSlice/stockSlice";
import weatherSlice from "./weatherSlice/weatherSlice";
import checkLoginSlice from "./checkLoginSlice/checkLoginSlice";
import userSlice from "./userSlice/userSlice";
const store = configureStore({
  reducer: {
    addressSlice,
    loginSlice,
    communitySlice,
    userInfoEditSlice,
    user: userEditSlice,
    mapAddrSlice,
    PRexcelSlice,

    user: joinUserSlice,
    profileImageSlice,
    stockSlice,
    weatherSlice,
    checkLoginSlice,
    // userSlice,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
export default store;
