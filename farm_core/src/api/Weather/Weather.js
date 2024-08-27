import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Weather.module.scss";

const initializeData = {
  main: { humidity: 0, temp_max: 0, temp_min: 0 },
  wind: { speed: 0, deg: 0, gust: 0 },
  weather: [{ description: "", main: "Clear", icon: "" }],
};

function Weather() {
  const [weatherData, setWeatherData] = useState(initializeData);
  const APIkey = "6e3669d9ce0d4e84eddd41c90c38ab37";
  const { adminLogin } = useSelector((state) => state.loginSlice);
  const success = (position) => {
    //   대전 선화동 위도 경도
    const latitude = 36.328799;
    const longitude = 127.4230707;
    const weatherResult = getWeather(latitude, longitude);
  };

  // open the weather
  const getWeather = async (lat, lon) => {
    await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
      `https://api.openweathermap.org/data/2.5/weather?q=Daejeon&exclude=hourly&appid=${APIkey}&units=metric&lang=kr`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // console.log(json);
        setWeatherData(json);
      });
  };
  const {
    main: { humidity, temp_max, temp_min, temp },
    weather,
    wind: { speed, deg, gust },
  } = weatherData;
  const { description, main, icon } = weather[0];

  useEffect(() => {
    success();
  }, []);

  return (
    <div className={styles.Weather}>
      {adminLogin ? (
        <>
          <h1>오늘의 날씨</h1>
          <h3>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
          </h3>
          <h3>
            {description}, {main}
          </h3>
          <h3>현재 온도 : {temp}℃</h3>
          <h3>
            최소/최대 온도 : {temp_min}℃/{temp_max}℃
          </h3>
          <h3>습도 : {humidity}%</h3>
          <h3>풍속 : {speed}m/s</h3>
          <h3>돌풀 : {gust}m/s</h3>
          <h3>풍향 : {deg}도</h3>
        </>
      ) : (
        <>
          <h1>오늘의 날씨</h1>
          <h3>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
          </h3>
          <h3>{description}</h3>
          <h3>현재 온도 : {temp}℃</h3>
          <h3>습도 : {humidity}%</h3>
        </>
      )}
    </div>
  );
}

export default Weather;
