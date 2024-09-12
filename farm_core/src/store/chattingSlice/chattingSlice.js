import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, getDatas, getSubCollection } from "../../firebase";

const createdAt = new Date();
const message = { createdAt: createdAt, photoUrl: "", text: "", uid: "" };

const initialState = {
  messages: message,
  chattingRoom: [],
  isLoading: false,
  error: null,
};

const chattingSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChattingMessage.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChattingMessage.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchChattingMessage.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchChattingRoom.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChattingRoom.fulfilled, (state, action) => {
        state.chattingRoom = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchChattingRoom.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const fetchChattingMessage = createAsyncThunk(
  "stock/fetchChattingMessage",
  async ({ collectionName, docId, subCollectionName }) => {
    try {
      const resultData = await getSubCollection(
        collectionName,
        docId,
        subCollectionName
      );
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);
export const fetchChattingRoom = createAsyncThunk(
  "stock/fetchChattingRoom",
  async ({ collectionName, queryOptions }) => {
    try {
      const email = localStorage.getItem("email");
      const resultData = await getDatas(collectionName, queryOptions);
      const filteredData = resultData.filter((item) => item.docId === email);
      return filteredData[0];
    } catch (error) {
      console.error(error);
    }
  }
);

export default chattingSlice.reducer;
