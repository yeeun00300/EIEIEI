import React, { useEffect, useState } from "react";
import GaugeNeedle from "../Gauge/GaugeNeedle";
import { useDispatch, useSelector } from "react-redux";
import { setTodayWeatherData } from "../../store/weatherSlice/weatherSlice";
import { setDoc } from "firebase/firestore";

function TempControl() {
  const dispatch = useDispatch();
  const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  const [setValue, setSetValue] = useState(20);
  const APIkey2 = "7318e8d03f33842f882be1c11ec76a8b";
  const success = () => {
    //   대전 선화동 위도 경도
    const latitude = 36.328799;
    const longitude = 127.4230707;
    const todayWeatherData = getTodayWeather(latitude, longitude);
  };
  const getTodayWeather = async (lat, lon) => {
    try {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey2}&units=metric&lang=kr`
      )
        .then(async (response) => {
          return await response.json();
        })
        .then((json) => {
          dispatch(setTodayWeatherData(json));
        });
    } catch (error) {
      console.log(`weather error: ${error}`);
    }
  };
  const handleUp = () => {
    if (setValue >= 40) {
      alert("온도가 너무 높습니다.");
      return false;
    } else {
      setSetValue(setValue + 1);
    }
  };
  const handleDown = () => {
    if (setValue <= 20) {
      alert("온도가 너무 낮습니다.");
      return false;
    } else {
      setSetValue(setValue - 1);
    }
  };

  useEffect(() => {
    success();
    getTodayWeather();
  }, [setValue]);
  const nowTemp = parseInt(todayWeatherData?.main?.temp);

  //   const nowTemp = parseInt(todayWeatherData.main.temp);
  return (
    <div>
      <GaugeNeedle
        title="온도계"
        setName="설정온도"
        setValue={setValue}
        up={handleUp}
        down={handleDown}
        unit="℃"
        nowName="현재온도"
        nowValue={nowTemp}
        valueMin={10}
        valueMax={50}
      />
    </div>
  );
}

export default TempControl;
