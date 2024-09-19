import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDatas,
  addFarmDataWithSubcollections,
  addFarmWithSubcollections,
  db,
  updateDatas,
} from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

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
  docId: "",
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
        console.error("Data save failed:", action.payload);
      })
      .addCase(fetchFarmData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFarmData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.farmData = action.payload; // 가져온 데이터로 farmData를 설정
        state.docId = action.meta.arg; // 가져온 문서의 docId 설정
      })
      .addCase(fetchFarmData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // updateFarmData 액션 핸들링
      .addCase(updateFarmData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFarmData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.farmData = { ...state.farmData, ...action.payload }; // 업데이트된 데이터 반영
      })
      .addCase(updateFarmData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const addFarmData = createAsyncThunk(
  "livestock/addFarmData",
  async ({ addObj, subcollections }, { rejectWithValue }) => {
    try {
      const docId = await addFarmDataWithSubcollections(addObj, subcollections); // docId 반환
      return { ...addObj, docId }; // 반환할 결과를 수정하세요
    } catch (error) {
      console.error("Error adding farm:", error);
      return rejectWithValue(error.message);
    }
  }
);

const fetchFarmData = createAsyncThunk(
  "livestock/fetchFarmData",
  async (docId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "farm", docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const updateFarmData = createAsyncThunk(
  "livestock/updateFarmData",
  async ({ docId, updateData }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "farm", docId);
      await updateDoc(docRef, updateData);
      return updateData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default AddLiveStockSlice.reducer;
export const { addField } = AddLiveStockSlice.actions;
export { addFarmData, fetchFarmData, updateFarmData };
