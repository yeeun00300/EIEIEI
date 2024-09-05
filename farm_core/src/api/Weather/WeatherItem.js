import React, { useEffect } from "react";
import { List } from "@mui/material/List";
import { useSelector } from "react-redux";
import styles from "./WeatherItem.module.scss";
// const initializeData = {
//   city: { name: "" },
//   list: [
//     { main: { humidity: 0, temp: 0, temp_max: 0, temp_min: 0 } },
//     { wind: { speed: 0, deg: 0, gust: 0 } },
//     { dt_txt: "" },
//     { weather: [{ description: "", main: "Clear", icon: "01n" }] },
//   ],
// };

function WeatherItem() {
  const { weatherData } = useSelector((state) => state.weatherSlice);
  const { adminLogin } = useSelector((state) => state.loginSlice);
  const weatherList = weatherData?.list;
  return (
    <div className={styles.weatherItem}>
      {adminLogin ? (
        <>
          {weatherList?.map((item) => {
            const weatherIcon = item.weather?.[0]?.icon;
            return (
              <div key={item.dt}>
                <h3>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                  />
                </h3>
                <h3>{item?.dt_txt}</h3>
                <h3>{item?.weather?.description}</h3>
                <h3>온도 : {item?.main?.temp}℃</h3>
                <h3>습도 : {item?.main?.humidity}%</h3>
                <h3>풍속 : {item?.wind?.speed}m/s</h3>
                <h3>돌풀 : {item?.wind?.gust}m/s</h3>
                <h3>풍향 : {item?.wind?.deg}도</h3>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {weatherList?.map((item) => {
            const weatherIcon = item.weather?.[0]?.icon;
            return (
              <div key={item.dt}>
                <h3>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                  />
                </h3>
                <h3>{item?.weather?.description}</h3>
                <h3>온도 : {item?.main?.temp}℃</h3>
                <h3>습도 : {item?.main?.humidity}%</h3>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default WeatherItem;
