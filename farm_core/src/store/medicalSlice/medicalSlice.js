import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  address: "",
};

const medicalSlice = createSlice({
  name: "medical",
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { updateField } = medicalSlice.actions;
export default medicalSlice.reducer;
