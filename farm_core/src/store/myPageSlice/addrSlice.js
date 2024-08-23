import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addr: {},
  error: "",
};

const addrSlice = createSlice({
  name: "addr",
  initialState,
  reducers: {},
});
