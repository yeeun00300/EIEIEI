import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditingUser: false,
};

const userEditSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startEditingUser(state) {
      state.isEditingUser = true;
    },
    stopEditingUser(state) {
      state.isEditingUser = false;
    },
  },
});

export default userEditSlice.reducer;
export const { startEditingUser, stopEditingUser } = userEditSlice.actions;
