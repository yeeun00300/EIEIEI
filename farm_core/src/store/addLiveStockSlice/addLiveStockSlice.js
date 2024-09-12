import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, addFarmWithSubcollections } from "../../firebase";

const initialState = {
  farmName: "",
  farmId: "",
  farmAddress: "",
  farmScale: "",
  farm_stockType: "",
  farmBuild: "",
  farmCondition: "",
  facilities: "",
  insuranceDetail: "",
  note: "",
  isLoading: false,
  error: null,
  docId: null,
};

const AddLiveStockSlice = createSlice({
  name: "liveStock",
  initialState,
  reducers: {
    addField: (state, action) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFarmData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFarmData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.docId = action.payload.docId;

        // 상태 업데이트는 state에 직접 반영하는 대신, 다른 방식으로 처리할 수 있습니다.
        return {
          ...state,
          farmName: action.payload.farmName,
          farmId: action.payload.farmId,
          farmAddress: action.payload.farmAddress,
          farmScale: action.payload.farmScale,
          farm_stockType: action.payload.farm_stockType,
          farmBuild: action.payload.farmBuild,
          farmCondition: action.payload.farmCondition,
          facilities: action.payload.facilities,
          insuranceDetail: action.payload.insuranceDetail,
          note: action.payload.note,
        };
      })
      .addCase(addFarmData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const addFarmData = createAsyncThunk(
  "livestock/addFarmData",
  async ({ collectionName, addObj, subcollections }, { rejectWithValue }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return { docId: resultData, ...addObj };
    } catch (error) {
      console.error("Error adding farm:", error); // 에러를 콘솔에 출력
      return rejectWithValue(error.message);
    }
  }
);

export default AddLiveStockSlice.reducer;
export const { addField } = AddLiveStockSlice.actions;
export { addFarmData };
