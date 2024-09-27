import React, { useEffect, useState } from "react";
import GaugeNeedle from "../Gauge/GaugeNeedle";
import { useDispatch, useSelector } from "react-redux";
import { setTodayWeatherData } from "../../store/weatherSlice/weatherSlice";
import { setDoc } from "firebase/firestore";

function TempControl() {
  const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  const nowTemp = parseInt(todayWeatherData?.main?.temp);
  const [setValue, setSetValue] = useState(25);
  const [time, setTime] = useState(new Date());
  const [intervalValue, setIntervalValue] = useState(nowTemp);

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
    const interval = setInterval(() => {
      // console.log(` ggg`);
      setTime(new Date());
      // 상태 업데이트 (1분마다 렌더링 유도)
      if (intervalValue > setValue) {
        setIntervalValue(intervalValue - 1);
      } else if (intervalValue < setValue) {
        setIntervalValue(intervalValue + 1);
      } else {
        return false;
      }
    }, 10000);
    // 시간간격조정
    return () => clearInterval(interval);
  }, [setValue, intervalValue]);

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
        nowValue={intervalValue}
        valueMin={0}
        valueMax={50}
      />
    </div>
  );
}

export default TempControl;
