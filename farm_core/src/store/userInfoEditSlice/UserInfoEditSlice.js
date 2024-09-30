import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, getDatas } from "../../firebase";

const initialState = {
  userInfo: [],
  isLoading: false,
  error: null,
  name: "",
  email: "",
  nickname: "",
  phone: "",
  profileImages: "",
};

const userInfoEditSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      const {
        name,
        email,
        nickname,
        phone,
        address,
        detailedAddress,
        profileImages,
      } = action.payload;
      state.name = name || state.name;
      state.email = email || state.email;
      state.nickname = nickname || state.nickname;
      state.phone = phone || state.phone;
      state.address = address || state.address;
      state.detailedAddress = detailedAddress || state.detailedAddress;
      state.profileImages = profileImages || state.profileImages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const user = action.payload[0] || {};
        state.userInfo = action.payload;
        state.name = user.name || "";
        state.email = user.email || "";
        state.nickname = user.nickname || "";
        state.phone = user.phone || "";
        state.address = user.address || "";
        state.detailedAddress = user.detailedAddress || "";
        state.profileImages = user.profileImages || "";
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userInfo.push(action.payload);
        state.isLoading = false;
        console.log(state.userInfo); // Redux 상태 확인
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      // console.log("Fetched Data:", resultData); // 여러 사용자가 있는지 확인
      return resultData;
    } catch (error) {
      console.error(error);
    }
  }
);

const addUser = createAsyncThunk(
  "user/addUser",
  async ({ collectionName, userObj }) => {
    try {
      const numData = await addDatas(collectionName, userObj);
      return numData;
    } catch (error) {
      throw new Error("유저 정보를 추가하는 데 실패했습니다.");
    }
  }
);

export default userInfoEditSlice.reducer;
export { fetchUser, addUser };
export const { updateUserInfo } = userInfoEditSlice.actions;
