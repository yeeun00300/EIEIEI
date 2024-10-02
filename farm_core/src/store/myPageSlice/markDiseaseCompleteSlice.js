import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  stocks: [],
  selectedStock: null,
  isLoading: false,
  error: null,
};

const markDiseaseCompleteSlice = createSlice({
  name: "disease",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markDiseaseComplete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markDiseaseComplete.fulfilled, (state, action) => {
        state.isLoading = false;
        const { stockId } = action.payload;

        // 성공적으로 업데이트된 주식에 대해 상태를 업데이트
        const updatedStocks = state.stocks.map((stock) =>
          stock.stockId === stockId
            ? { ...stock, diseaseComplete: true } // 질병 완료 상태 업데이트
            : stock
        );
        state.stocks = updatedStocks;
      })
      .addCase(markDiseaseComplete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // 에러 메시지 저장
      });
  },
});

// Async thunk to mark disease as complete
// stockSlice.js
export const markDiseaseComplete = createAsyncThunk(
  "stock/markDiseaseComplete",
  async ({ stockId, newDiseaseEntry }, { rejectWithValue }) => {
    const stockDocRef = doc(db, "stock", stockId);
    try {
      await updateDoc(stockDocRef, {
        disease: arrayUnion(newDiseaseEntry), // 배열에 새로운 항목 추가
      });
      return { stockId };
    } catch (error) {
      return rejectWithValue(error.message); // 에러 메시지를 반환
    }
  }
);
export default markDiseaseCompleteSlice.reducer;
