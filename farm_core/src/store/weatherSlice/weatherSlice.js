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
    // setWeatherData: (state, action) => {
    //   state.weatherData = action.payload;
    // },
    // setTodayWeatherData: (state, action) => {
    //   state.todayWeatherData = action.payload;
    // },
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
      })
      .addCase(fetchWeatherForecastData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherForecastData.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeatherForecastData.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchWeatherTodayData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherTodayData.fulfilled, (state, action) => {
        state.todayWeatherData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeatherTodayData.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

const fetchWeatherData = createAsyncThunk(
  "weatherAlarm/fetchWeatherData",
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

// 5일간 날씨
const fetchWeatherForecastData = createAsyncThunk(
  "weatherForcast/fetchWeatherForecastData",
  async ({ APIkey, lat, lon }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
      );
      const data = await response.json();
      // console.log("Forecast API Data:", data); // 데이터를 출력하여 확인
      return data;
    } catch (error) {
      console.log(`error : ${error}`);
      return null;
    }
  }
);

// 오늘 날씨
const fetchWeatherTodayData = createAsyncThunk(
  "weatherToday/fetchWeatherTodayData",
  async ({ APIkey, lat, lon }) => {
    try {
      const response = await fetch(
        //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
        // `https://api.openweathermap.org/data/2.5/weather?q=Daejeon&exclude=hourly&appid=${APIkey}&units=metric&lang=kr`
        // `https://api.openweathermap.org//data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr&mode=json`
        // `/api4/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
      );
      const data = await response.json();
      // console.log("TodayWeather API Data:", data); // 데이터를 출력하여 확인
      return data;
    } catch (error) {
      console.log(`error : ${error}`);
      return null;
    }
  }
);

export const { setWeatherData, setWeatherIssueContent, setTodayWeatherData } =
  weatherSlice.actions;
export { fetchWeatherData, fetchWeatherForecastData, fetchWeatherTodayData };
export default weatherSlice.reducer;
