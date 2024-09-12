import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDatas,
  addFarmDataWithSubcollections,
  addFarmWithSubcollections,
  db,
  updateDatas,
} from "../../firebase";
import { collection, doc, writeBatch } from "firebase/firestore";

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
  name: "liveStcok",
  initialState,
  reducers: {
    addField: (state, action) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFarmData.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFarmData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.docId = action.payload.docId;
        const {
          farmName,
          farmId,
          farmAddress,
          farmScale,
          farm_stockType,
          farmBuild,
          farmCondition,
          facilities,
          insuranceDetail,
          note,
        } = action.payload;
        state.farmName = farmName;
        state.farmId = farmId;
        state.farmAddress = farmAddress;
        state.farmScale = farmScale;
        state.farm_stockType = farm_stockType;
        state.farmBuild = farmBuild;
        state.farmCondition = farmCondition;
        state.facilities = facilities;
        state.insuranceDetail = insuranceDetail;
        state.note = note;
      })
      .addCase(addFarmData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const addFarmData = createAsyncThunk(
  "livestock/addFarmData",
  async ({ addObj, subcollections }, { rejectWithValue }) => {
    try {
      await addFarmDataWithSubcollections(addObj, subcollections);
      console.log(addObj);
      return { ...addObj }; // 반환할 결과를 수정하세요
    } catch (error) {
      console.error("Error adding farm:", error);
      return rejectWithValue(error.message);
    }
  }
);
export default AddLiveStockSlice.reducer;
export const { addField } = AddLiveStockSlice.actions;
export { addFarmData };
