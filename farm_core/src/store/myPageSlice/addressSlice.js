import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  detailedAddress: "",
  isOpen: false,
};

const addressSlice = createSlice({
  name: "addr",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setDetailedAddress: (state, action) => {
      state.detailedAddress = action.payload;
    },
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setAddress, setDetailedAddress, toggleOpen } =
  addressSlice.actions;

export default addressSlice.reducer;
