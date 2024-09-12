import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDatas,
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
  async ({ collectionName, addObj, subcollections }, { rejectWithValue }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);

      console.log(resultData);
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
