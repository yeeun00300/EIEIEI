import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Weather.module.scss";
import WeatherItem from "./WeatherItem";
import { setWeatherData } from "../../store/weatherSlice/weatherSlice";

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
  const APIkey = "6e3669d9ce0d4e84eddd41c90c38ab37";
  const { weatherData } = useSelector((state) => state.weatherSlice);
  const success = () => {
    //   대전 선화동 위도 경도
    const latitude = 36.328799;
    const longitude = 127.4230707;
    const weatherResult = getWeather(latitude, longitude);
  };

  // open the weather
  const getWeather = async (lat, lon) => {
    try {
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
      // `https://api.openweathermap.org/data/2.5/weather?q=Daejeon&exclude=hourly&appid=${APIkey}&units=metric&lang=kr`
      // `https://api.openweathermap.org//data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr&mode=json`
      // `/api4/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`

      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
      )
        .then(async (response) => {
          return await response.json();
        })
        .then((json) => {
          dispatch(setWeatherData(json));
          // setWeatherData(json);
        });
    } catch (error) {
      console.log(`weather error: ${error}`);
    }
  };
  const weatherCity = weatherData?.city?.name;

  useEffect(() => {
    success();
    getWeather();
  }, []);

  return (
    <div className={styles.Weather}>
      <h1>{weatherCity}의 날씨</h1>
      <WeatherItem weatherData={weatherData} />
    </div>
  );
}

export default Weather;
