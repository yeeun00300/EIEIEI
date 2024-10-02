import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  stocks: [],
  selectedStock: null,
  isLoading: false,
  error: null,
};

const markVaccineCompleteSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markVaccineComplete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markVaccineComplete.fulfilled, (state, action) => {
        state.isLoading = false;
        const { stockId } = action.payload;
        // 성공적으로 업데이트된 주식에 대해 상태를 업데이트
        const updatedStocks = state.stocks.map((stock) =>
          stock.stockId === stockId
            ? { ...stock, vaccineComplete: true }
            : stock
        );
        state.stocks = updatedStocks;
      })
      .addCase(markVaccineComplete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // 에러 메시지 저장
      });
  },
});

// Async thunk to mark vaccine as complete
export const markVaccineComplete = createAsyncThunk(
  "myPage/markVaccineComplete",
  async ({ stockId, newVaccineEntry }) => {
    const stockRef = doc(db, "stock", stockId); // 해당 stock 문서 참조

    // vaccine 배열에 새로운 백신 데이터 추가
    await updateDoc(stockRef, {
      vaccine: arrayUnion(newVaccineEntry), // 배열에 추가
    });

    return stockId; // 성공적으로 업데이트된 stockId 반환
  }
);
export default markVaccineCompleteSlice.reducer;
