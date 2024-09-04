import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: {},
    forecast: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder;
    //   .addCase(fetchExcelStock.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchExcelStock.fulfilled, (state, action) => {
    //     state.stock = action.payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(fetchExcelStock.rejected, (state, action) => {
    //     state.isLoading = false;
    //   });
  },
});
