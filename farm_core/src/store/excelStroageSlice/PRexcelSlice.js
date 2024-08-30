import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileData: [],
  uploadProgress: 0,
  downloadURL: "",
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
});

export const { setFIleData, setUploadProgress, setDownloadURL } =
  PRexcelSlice.actions;
export default PRexcelSlice.reducer;
