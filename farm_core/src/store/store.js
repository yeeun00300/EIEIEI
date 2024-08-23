import { configureStore } from "@reduxjs/toolkit";
import addrSlice from "./myPageSlice/addressSlice";
import addressSlice from "./myPageSlice/addressSlice";
const store = configureStore({
  reducer: {
    addressSlice,
  },
});
export default store;
