import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDatas,
  addFarmDataWithSubcollections,
  addFarmWithSubcollections,
  db,
  deleteDatas,
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
  farmData: {},
  diseaseType: "",
};

const AddLiveStockSlice = createSlice({
  name: "liveStcok",
  initialState,
  reducers: {
    addField: (state, action) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
    updateFields: (state, action) => {
      const { fields } = action.payload;
      Object.assign(state, fields);
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
        state.farmData = {
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
      })
      // 삭제
      .addCase(deleteFarmData.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFarmData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.farmData = state.farmData.filter((data) => {
          return data.docId !== action.payload;
        });
      })
      .addCase(deleteFarmData.pending, (state, action) => {
        state.isLoading = false;
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

const deleteFarmData = createAsyncThunk(
  "livestock/deleteFarmData",
  async ({ collectionName, docId }) => {
    try {
      const resultData = await deleteDatas(collectionName, docId);
      return docId;
    } catch (error) {
      console.error("Delete_Error", error);
    }
  }
);

export default AddLiveStockSlice.reducer;
export const { addField, updateFields } = AddLiveStockSlice.actions;
export { addFarmData, fetchFarmData, updateFarmData };
