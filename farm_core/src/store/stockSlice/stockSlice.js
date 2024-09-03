import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initialState = {
  stock: [],
  isLoading: false,
  error: null,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExcelStock.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExcelStock.fulfilled, (state, action) => {
        state.stock = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchExcelStock.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const fetchExcelStock = createAsyncThunk(
  "stock/fetchExcelStock",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);

export default stockSlice.reducer;
