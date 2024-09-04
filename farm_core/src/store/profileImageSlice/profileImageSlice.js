import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadFiles } from "../../firebase"; // 파일 업로드 함수

const initialState = {
  fileData: null,
  uploadProgress: 0,
  downloadURL: "",
  isLoading: false,
  error: null,
};

const profileImageSlice = createSlice({
  name: "profileImage",
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
      .addCase(uploadProfileImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.downloadURL = action.payload;
        state.isLoading = false;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const uploadProfileImage = createAsyncThunk(
  "profileImage/uploadProfileImage",
  async (file, { rejectWithValue }) => {
    try {
      console.log(`file확인용:${file}`);
      const downloadURL = await uploadFiles(file);
      return downloadURL;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { setFileData, setUploadProgress, setDownloadURL } =
  profileImageSlice.actions;
export default profileImageSlice.reducer;
