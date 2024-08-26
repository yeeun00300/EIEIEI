import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initialState = {
  communityContents: [],
  isLoading: false,
  error: "",
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunity.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        state.communityContents = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCommunity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const fetchCommunity = createAsyncThunk(
  "community/fetchProducts",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);
export default communitySlice.reducer;
export { fetchCommunity };
