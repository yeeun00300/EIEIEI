import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    weatherData: initializeData,
    todayWeatherData: initializeDataToday,
    weatherIssueContent: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setTodayWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setWeatherIssueContent: (state, action) => {
      state.weatherIssueContent = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder;
  //   .addCase(fetchWeatherData.pending, (state, action) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   })
  //   .addCase(fetchWeatherData.fulfilled, (state, action) => {
  //     state.stock = action.payload;
  //     state.isLoading = false;
  //   })
  //   .addCase(fetchWeatherData.rejected, (state, action) => {
  //     state.isLoading = false;
  //   });
  //   },
});

export const { setWeatherData, setWeatherIssueContent, setTodayWeatherData } =
  weatherSlice.actions;
export default weatherSlice.reducer;
