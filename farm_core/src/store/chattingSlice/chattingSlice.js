import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, getData, getDatas, getSubCollection } from "../../firebase";

const createdAt = new Date();
const message = [{ createdAt: createdAt, photoUrl: "", text: "", uid: "" }];

const initialState = {
  messages: message,
  chattingRoom: [],
  chattingUser: [],
  //   chattingUser: [{ chattingRoom: [{ userName: "", photoUrl: "" }], docId: "" }],
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
      })
      .addCase(fetchChattingUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChattingUser.fulfilled, (state, action) => {
        state.chattingUser = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchChattingUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchAddUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddUser.fulfilled, (state, action) => {
        state.chattingUser = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAddUser.rejected, (state, action) => {
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
export const fetchChattingUser = createAsyncThunk(
  "stock/fetchChattingUser",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);
export const fetchAddUser = createAsyncThunk(
  "stock/fetchAddUser",
  async ({ collectionName, userObj }) => {
    try {
      const resultData = await addDatas(collectionName, userObj);
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);

export default chattingSlice.reducer;
