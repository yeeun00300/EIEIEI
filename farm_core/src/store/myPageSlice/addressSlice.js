import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  zoneCode: "",
  isOpen: false,
};

const addressSlice = createSlice({
  name: "addr",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setZoneCode: (state, action) => {
      state.zoneCode = action.payload;
    },
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setAddress, setZoneCode, toggleOpen } = addressSlice.actions;

export default addressSlice.reducer;
