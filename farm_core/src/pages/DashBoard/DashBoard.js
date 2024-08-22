import React, { useEffect, useState } from "react";
import styles from "./DashBoard.module.scss";
import { LineChart } from "@mui/x-charts/LineChart";
import { json } from "react-router";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

const dataset = [
  { x: 1, y: 0.8 },
  { x: 2, y: 1.2 },
  { x: 3, y: 2.6 },
  { x: 5, y: 3.6 },
  { x: 8, y: 4.8 },
  { x: 10, y: 5.8 },
  { x: 12, y: 7 },
];
const initializeData = {
  main: { humidity: 0, temp_max: 0, temp_min: 0 },
  weather: [{ description: "" }],
};

function DashBoard() {
  // 날씨 state
  const [weatherData, setWeatherData] = useState(initializeData);
  const APIkey = "6e3669d9ce0d4e84eddd41c90c38ab37";

  const success = (position) => {
    const latitude = 36.328799;
    const longitude = 127.4230707;
    // const latitude = position.coords.latitude;
    // const longitude = position.coords.longitude;

    const weatherResult = getWeather(latitude, longitude);
  };

  const getWeather = async (lat, lon) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        // const { name, rain, weather, wind } = json;
        // console.log(name, rain, weather, wind);
        setWeatherData(json);
      });
  };

  // const { humidity, temp_max, temp_min } = main;
  const {
    main: { humidity, temp_max, temp_min, temp },
    weather,
  } = weatherData;
  const { description } = weather[0];

  useEffect(() => {
    // getWeather();
    success();
  }, []);

  return (
    <>
      <h1>날씨</h1>
      <p>{description}</p>
      <h1>현재 온도</h1>
      <p> {temp}℃ </p>
      {/* <p>최소 : {temp_min}℃ </p>
      <p>최대 : {temp_max}℃ </p> */}
      <h1>습도</h1>
      <p>최대 : {humidity}% </p>
      <h1>체중</h1>
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            dataKey: "x",
            tickInterval: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
        ]}
        yAxis={[{ tickInterval: [1, 3, 5, 7, 9, 11] }]}
        series={[{ dataKey: "y", color: "#78909c" }]}
        height={200}
        width={800}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ horizontal: true }}
        // loading={true}
        // grid={{ vertical: true, horizontal: true }}
      />
    </>
  );
}

export default DashBoard;
