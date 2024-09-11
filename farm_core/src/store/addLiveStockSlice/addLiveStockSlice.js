import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, updateDatas } from "../../firebase";

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
  async ({ collectionName, addObj }, { rejectWithValue }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return { docId: resultData.docId, ...addObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default AddLiveStockSlice.reducer;
export const { addField } = AddLiveStockSlice.actions;
export { addFarmData };
