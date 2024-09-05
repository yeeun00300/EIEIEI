import React, { useEffect } from "react";
import GaugeNeedle from "../Gauge/GaugeNeedle";
import { useDispatch, useSelector } from "react-redux";
import { setTodayWeatherData } from "../../store/weatherSlice/weatherSlice";

function TempControl() {
  const dispatch = useDispatch();
  const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  console.log(todayWeatherData);
  const APIkey = "7318e8d03f33842f882be1c11ec76a8b";
  const success = () => {
    //   대전 선화동 위도 경도
    const latitude = 36.328799;
    const longitude = 127.4230707;
    const todayWeatherData = getTodayWeather(latitude, longitude);
  };
  const getTodayWeather = async (lat, lon) => {
    try {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
      )
        .then(async (response) => {
          return await response.json();
        })
        .then((json) => {
          console.log(json);
          dispatch(setTodayWeatherData(json));
        });
    } catch (error) {
      console.log(`weather error: ${error}`);
    }
  };
  useEffect(() => {
    success();
    getTodayWeather();
  }, []);
  const nowTemp = todayWeatherData.main.temp;
  return (
    <div>
      <GaugeNeedle
        title="온도계"
        setName="설정온도"
        setValue={27}
        unit="℃"
        nowName="현재온도"
        nowValue={nowTemp}
      />
    </div>
  );
}

export default TempControl;
