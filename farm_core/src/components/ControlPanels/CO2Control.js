import React, { useEffect, useState } from "react";
import GaugeNeedle from "../Gauge/GaugeNeedle";

function CO2Control() {
  //   const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  const [setValue, setSetValue] = useState(300);
  const [time, setTime] = useState(new Date());
  const [intervalValue, setIntervalValue] = useState(430);
  const handleUp = () => {
    if (setValue >= 1000) {
      return false;
    } else {
      setSetValue(setValue + 100);
    }
  };
  const handleDown = () => {
    if (setValue <= 200) {
      return false;
    } else {
      setSetValue(setValue - 100);
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
    }, 150);
    // 시간간격조정
    return () => clearInterval(interval);
  }, [setValue, intervalValue]);
  //   const nowHumid = parseInt(todayWeatherData?.main?.humidity);
  return (
    <div>
      <GaugeNeedle
        title="CO2"
        setName="CO2 설정"
        setValue={setValue}
        up={handleUp}
        down={handleDown}
        unit="ppm"
        nowName="CO2농도"
        nowValue={intervalValue}
        valueMin={200}
        valueMax={1000}
      />
    </div>
  );
}

export default CO2Control;
