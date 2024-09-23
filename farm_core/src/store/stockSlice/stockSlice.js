import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDatas, getDatas, updateDatas } from "../../firebase";
import Auction from "./../../components/auction/Auction";

const initialState = {
  stock: [],
  isLoading: false,
  selectLoading: false,
  error: null,
  selectedStock: null,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setSelectedStock(state, action) {
      console.log("setSelectedStock 호출:", action.payload); // 로그 추가
      state.selectedStock = action.payload;
    },
  },
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
      })

      .addCase(updateStock.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.isLoading = false;

        // action.payload가 객체인지 확인하고, docId가 존재하는지 체크
        console.log("action.payload:", action.payload); // 추가된 로그
        if (typeof action.payload !== "object" || !action.payload.docId) {
          console.error("업데이트 결과에 docId가 없습니다:", action.payload);
          return;
        }

        // docId가 일치하는 stock 객체를 찾아 업데이트
        state.stock = state.stock.map((item) => {
          return item.docId === action.payload.docId
            ? { ...item, ...action.payload }
            : item;
        });
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // 에러 메시지를 상태에 저장
        console.error("업데이트 실패:", action.error.message); // 에러 로그 추가
      })
      .addCase(deleteStock.fulfilled, (state, action) => {
        state.stock = state.stock.filter(
          (item) => item.docId !== action.payload
        );
      })
      .addCase(fetchSelectedStock.fulfilled, (state, action) => {
        state.selectedStock = action.payload;
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

export const fetchSelectedStock = createAsyncThunk(
  "selectedStock/fetchSelectedStock",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateStock = createAsyncThunk(
  "stock/updateStock",
  async ({ collectionName, docId, updateInfoObj }) => {
    console.log("Update stock called with:", {
      collectionName,
      docId,
      updateInfoObj,
    });
    try {
      const resultData = await updateDatas(
        collectionName,
        docId,
        updateInfoObj
      );
      console.log("결과값", resultData);
      return resultData;
    } catch (error) {
      console.error("Update error:", error);
      throw error; // 오류를 던져서 thunk의 rejected 상태로 전이
    }
  }
);
export const deleteStock = createAsyncThunk(
  "stock/deleteStock",
  async ({ collectionName, docId }) => {
    try {
      await deleteDatas(collectionName, docId); // deleteDatas 함수 호출
      return docId; // 삭제된 docId 반환
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  }
);

export default stockSlice.reducer;
export const { setSelectedStock } = stockSlice.actions;
