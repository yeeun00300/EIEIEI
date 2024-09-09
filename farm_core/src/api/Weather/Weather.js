import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Weather.module.scss";
import WeatherItem from "./WeatherItem";
import {
  fetchWeatherForecastData,
  fetchWeatherTodayData,
  setTodayWeatherData,
  setWeatherData,
} from "../../store/weatherSlice/weatherSlice";

const initializeData = {
  city: { name: " " },
  list: [
    { main: { humidity: 0, temp: 0, temp_max: 0, temp_min: 0 } },
    { wind: { speed: 0, deg: 0, gust: 0 } },
    { dt_txt: " " },
    { weather: [{ description: " ", main: "Clear", icon: "01d" }] },
  ],
};

function Weather() {
  // const [weatherData, setWeatherData] = useState(initializeData);
  const dispatch = useDispatch();
  const APIkey1 = "6e3669d9ce0d4e84eddd41c90c38ab37";
  const APIkey2 = "7318e8d03f33842f882be1c11ec76a8b";
  const lat = 36.328799;
  const lon = 127.4230707;
  const { weatherData } = useSelector((state) => state.weatherSlice);

  const weatherCity = weatherData?.city?.name;

  useEffect(() => {
    dispatch(fetchWeatherForecastData({ APIkey: APIkey1, lat: lat, lon: lon }));
    dispatch(fetchWeatherTodayData({ APIkey: APIkey2, lat: lat, lon: lon }));
  }, []);

  return (
    <div className={styles.Weather}>
      <h1>{weatherCity}의 날씨</h1>
      <WeatherItem />
    </div>
  );
}

export default Weather;
