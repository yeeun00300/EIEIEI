import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
};

const mapAddrSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setMapAddr(state, action) {
      state.address = action.payload;
    },
  },
});

export const { setMapAddr } = mapAddrSlice.actions;
export default mapAddrSlice.reducer;
