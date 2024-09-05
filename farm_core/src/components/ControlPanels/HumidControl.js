import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GaugeNeedle from "../Gauge/GaugeNeedle";

function HumidControl() {
  const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  const nowHumid = parseInt(todayWeatherData?.main?.humidity);
  const [time, setTime] = useState(new Date());
  const [setValue, setSetValue] = useState(50);
  const [intervalValue, setIntervalValue] = useState(nowHumid);
  const handleUp = () => {
    if (setValue >= 100) {
      return false;
    } else {
      setSetValue(setValue + 1);
    }
  };
  const handleDown = () => {
    if (setValue <= 0) {
      return false;
    } else {
      setSetValue(setValue - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      // 상태 업데이트 (1분마다 렌더링 유도)
      if (intervalValue > setValue) {
        setIntervalValue(intervalValue - 1);
      } else if (intervalValue < setValue) {
        setIntervalValue(intervalValue + 1);
      } else {
        return false;
      }
    }, 1000);
    // 시간간격조정
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거x
  }, [setValue, intervalValue]);

  return (
    <div>
      <GaugeNeedle
        title="습도계"
        setName="설정습도"
        setValue={setValue}
        up={handleUp}
        down={handleDown}
        unit="%"
        nowName="현재습도"
        nowValue={intervalValue}
        valueMin={0}
        valueMax={100}
      />
    </div>
  );
}

export default HumidControl;
