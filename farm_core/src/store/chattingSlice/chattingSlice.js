import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas, getSubCollection } from "../../firebase";

const createdAt = new Date();
const message = { photoUrl: createdAt, photoUrl: "", text: "", uid: "" };

const initialState = {
  messages: message,
  chattingRoom: "",
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
      .addCase(fetchChattingChattingRoom.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChattingChattingRoom.fulfilled, (state, action) => {
        state.chattingRoom = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchChattingChattingRoom.rejected, (state, action) => {
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
export const fetchChattingChattingRoom = createAsyncThunk(
  "stock/fetchChattingChattingRoom",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);

export default chattingSlice.reducer;
