import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDatas, uploadImage } from "../../firebase";
import kroDate from "../../utils/korDate";

const initialState = {
  stockType: "koreaCow",
  email: "",
  message: "",
  file: null,
  filePreview: null,
  loading: false,
  error: null,
};

// Async thunk for submitting form data
export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      let fileUrl = "";
      if (formData.file) {
        fileUrl = await uploadImage(
          `images/${formData.file.name}`,
          formData.file
        );
      }
      const addObj = {
        ...formData,
        createdAt: kroDate(),
        imageUrl: fileUrl,
      };
      await addDatas("community", addObj);
      return addObj;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setFile: (state, action) => {
      state.file = action.payload.file;
      state.filePreview = URL.createObjectURL(action.payload.file);
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false;
        state.file = null;
        state.filePreview = null;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData, setFile, resetForm } = formSlice.actions;
export default formSlice.reducer;
