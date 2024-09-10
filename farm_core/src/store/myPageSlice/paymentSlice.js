import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    cardInfo: null,
  },
  reducers: {
    setCardInfo: (state, action) => {
      state.cardInfo = action.payload;
    },
  },
});

export const { setCardInfo } = paymentSlice.actions;
export default paymentSlice.reducer;
