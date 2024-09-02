import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const stockListSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockListData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStockListData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // 배열을 설정
      })
      .addCase(fetchStockListData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const fetchStockListData = createAsyncThunk(
  "stock/fetchListData",
  async ({ collectionName = "stock", queryOptions = {} }, thunkAPI) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions); // 여기는 배열 형태
      return resultData;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default stockListSlice.reducer;
