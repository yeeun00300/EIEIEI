import React, { useEffect } from "react";
import styles from "./TodayWeatherWidget.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherForecastData,
  fetchWeatherTodayData,
} from "../../../store/weatherSlice/weatherSlice";

function TodayWeatherWidget() {
  const initializeData = {
    city: { name: " " },
    list: [
      { main: { humidity: 0, temp: 0, temp_max: 0, temp_min: 0 } },
      { wind: { speed: 0, deg: 0, gust: 0 } },
      { dt_txt: " " },
      { weather: [{ description: " ", main: "Clear", icon: "01d" }] },
    ],
  };

  // const [weatherData, setWeatherData] = useState(initializeData);
  const dispatch = useDispatch();
  const APIkey1 = "6e3669d9ce0d4e84eddd41c90c38ab37";
  const APIkey2 = "7318e8d03f33842f882be1c11ec76a8b";
  const lat = 36.328799;
  const lon = 127.4230707;
  const { weatherData } = useSelector((state) => state.weatherSlice);
  // const weatherList = weatherData?.list; //전체 날씨데이터
  const weatherList = weatherData?.list?.slice(0, 8); // 하루 3시간마다 날씨 데이터
  // const weatherList = [
  //   weatherData?.list[0],
  //   weatherData?.list[8],
  //   weatherData?.list[17],
  //   weatherData?.list[26],
  //   weatherData?.list[35],
  // ]; // 5일마다 날씨 데이터
  // const weatherCity = weatherData?.city?.name;
  const weatherCity = weatherData?.city?.name;

  useEffect(() => {
    dispatch(fetchWeatherForecastData({ APIkey: APIkey1, lat: lat, lon: lon }));
    dispatch(fetchWeatherTodayData({ APIkey: APIkey2, lat: lat, lon: lon }));
  }, []);

  return (
    <div className={styles.weatherItem}>
      {weatherList?.map((item) => {
        const weatherIcon = item.weather?.[0]?.icon;
        const weatherTime = item?.dt_txt;
        const weatherDay1 = weatherTime?.split(" ")[0].split("-")[1];
        const weatherDay2 = weatherTime?.split(" ")[0].split("-")[2];
        const weatherHour = weatherTime?.split(" ")[1].split(":")[0];
        return (
          <div key={item.dt}>
            <h3>
              <img
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              />
            </h3>
            {/* <h5>{item?.weather?.description}</h5> */}
            <h5>{`${weatherDay1}/${weatherDay2} ${weatherHour}H`}</h5>
            <h5>온도 : {item?.main?.temp}℃</h5>
            <h5>습도 : {item?.main?.humidity}%</h5>
          </div>
        );
      })}
    </div>
  );
}

export default TodayWeatherWidget;
