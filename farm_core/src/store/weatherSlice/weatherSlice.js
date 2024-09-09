import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initializeData = {
  city: { name: " " },
  list: [
    { main: { humidity: 0, temp: 0, temp_max: 0, temp_min: 0 } },
    { wind: { speed: 0, deg: 0, gust: 0 } },
    { dt_txt: " " },
    { weather: [{ description: " ", main: "Clear", icon: "01d" }] },
  ],
};
const initializeDataToday = {
  main: { humidity: 0, temp: 0 },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    // 5일간 날씨
    weatherData: initializeData,
    // 오늘 날씨
    todayWeatherData: initializeDataToday,
    weatherIssueContent: [],
    weatherIssueAlarm: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setTodayWeatherData: (state, action) => {
      state.todayWeatherData = action.payload;
    },
    setWeatherIssueContent: (state, action) => {
      state.weatherIssueContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherIssueAlarm = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

const fetchWeatherData = createAsyncThunk(
  "Login/fetchWeatherData",
  // 첫번째 파라미터는 payload--> state변경 , 두번째 파라미터는 dispatch 가능
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log(`error : ${error}`);
      return null;
    }
  }
);

export const { setWeatherData, setWeatherIssueContent, setTodayWeatherData } =
  weatherSlice.actions;
export { fetchWeatherData };
export default weatherSlice.reducer;
