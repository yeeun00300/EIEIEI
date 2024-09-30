import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFarmLayout, getDatas, saveFarmLayout } from "../../firebase";
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";

const widgetSlice = createSlice({
  name: "widget",
  initialState: {
    userWidget: {},
    widgetLoading: false,
  },
  reducers: {
    setUserWidget: (state, action) => {
      state.userWidget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveWidget.pending, (state) => {
        state.widgetLoading = true;
      })
      .addCase(saveWidget.fulfilled, (state, action) => {
        state.widgetLoading = false;
        state.userWidget = action.payload;
      })
      .addCase(saveWidget.rejected, (state, action) => {
        state.widgetLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchWidget.pending, (state) => {
        state.widgetLoading = true;
      })
      .addCase(fetchWidget.fulfilled, (state, action) => {
        state.widgetLoading = false;
        state.userWidget = action.payload;
      })
      .addCase(fetchWidget.rejected, (state, action) => {
        state.widgetLoading = false;
        state.error = action.payload;
      });
  },
});

//위젯 저장 패치
const saveWidget = createAsyncThunk(
  "widget/saveWidget",
  async ({ collectionName, layout }) => {
    try {
      const resultData = await saveFarmLayout(collectionName, layout);
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);

//위젯 불러오기
const fetchWidget = createAsyncThunk("widget/fetchWidget", async (docId) => {
  try {
    const resultData = fetchFarmLayout(docId);
    return resultData;
  } catch (error) {
    console.log(error);
  }
});

export { saveWidget, fetchWidget };

export default widgetSlice.reducer;
