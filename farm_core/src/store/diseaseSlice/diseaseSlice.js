import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, deleteDatas, getDatas, updateDatas } from "../../firebase";

export const fetchDiseases = createAsyncThunk(
  "disease/fetchDiseases",
  async ({ collectionName, queryOptions }, { rejectWithValue }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);

      return resultData;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
export const addDisease = createAsyncThunk(
  "disease/addDisease",
  async ({ collectionName, addObj }, { rejectWithValue }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.error("Error adding disease:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const deleteDisease = createAsyncThunk(
  "disease/deleteDisease",
  async ({ collectionName, docId }, { rejectWithValue }) => {
    try {
      await deleteDatas(collectionName, docId);
      console.log(docId);
      return docId;
    } catch (error) {
      console.error("Error deleting disease:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const updateDisease = createAsyncThunk(
  "disease/updateDisease",
  async ({ collectionName, diseaseId, updateObj }, { rejectWithValue }) => {
    try {
      const updatedData = await updateDatas(
        collectionName,
        diseaseId,
        updateObj
      );
      return { diseaseId, updatedData };
    } catch (error) {
      console.error("Error updating disease:", error);
      return rejectWithValue(error.message);
    }
  }
);

const diseaseSlice = createSlice({
  name: "disease",
  initialState: {
    diseases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchDiseases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseases.fulfilled, (state, action) => {
        state.diseases = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addDisease.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDisease.fulfilled, (state, action) => {
        state.diseases.push(action.payload);
        state.loading = false;
      })
      .addCase(addDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteDisease.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDisease.fulfilled, (state, action) => {
        console.log("삭제할 docId:", action.payload);
        state.diseases = state.diseases.filter(
          (disease) => disease.id !== action.payload
        );
        state.loading = false;
      })

      .addCase(deleteDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDisease.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDisease.fulfilled, (state, action) => {
        const { diseaseId, updatedData } = action.payload;
        const index = state.diseases.findIndex(
          (disease) => disease.id === diseaseId
        );
        if (index !== -1) {
          state.diseases[index] = updatedData;
        }
        state.loading = false;
      })
      .addCase(updateDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default diseaseSlice.reducer;
