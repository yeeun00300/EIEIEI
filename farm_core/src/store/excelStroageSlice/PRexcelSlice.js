import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadFile } from "../../firebase";

const initialState = {
  fileData: [],
  uploadProgress: 0,
  downloadURL: "",
  isLoading: false,
  error: null,
};

const PRexcelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    setFileData: (state, action) => {
      state.fileData = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setDownloadURL: (state, action) => {
      state.downloadURL = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadExcelFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadExcelFile.fulfilled, (state, action) => {
        state.downloadURL = action.payload;
        state.isLoading = false;
      })
      .addCase(uploadExcelFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const uploadExcelFile = createAsyncThunk(
  "excel/uploadExcelFile",
  async (file, { rejectWithValue }) => {
    try {
      const downloadURL = await uploadFile(file);
      return downloadURL; // 성공 시, 다운로드 URL을 반환
    } catch (error) {
      return rejectWithValue(error.message); // 실패 시, 오류 메시지를 반환
    }
  }
);

export const { setFileData, setUploadProgress, setDownloadURL } =
  PRexcelSlice.actions;
export default PRexcelSlice.reducer;
