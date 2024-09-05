import React, { useEffect, useState } from "react";
import GaugeNeedle from "../Gauge/GaugeNeedle";

function AMControl() {
  //   const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  const [setValue, setSetValue] = useState(25);
  const [time, setTime] = useState(new Date());
  const randomNum = Math.random() * 0.01;
  const [intervalValue, setIntervalValue] = useState(
    Number(randomNum.toFixed(2))
  );
  //   const handleUp = () => {
  //     if (setValue >= 1000) {
  //       return false;
  //     } else {
  //       setSetValue(setValue + 100);
  //     }
  //   };
  //   const handleDown = () => {
  //     if (setValue <= 200) {
  //       return false;
  //     } else {
  //       setSetValue(setValue - 100);
  //     }
  //   };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      // 상태 업데이트 (1분마다 렌더링 유도)
      if (intervalValue > setValue) {
        setIntervalValue(intervalValue - 1);
      } else if (intervalValue < setValue) {
        setIntervalValue(intervalValue + 0.01);
      } else {
        return false;
      }
    }, 10000);
    // 시간간격조정
    return () => clearInterval(interval);
  }, [setValue, intervalValue]);
  //   const nowHumid = parseInt(todayWeatherData?.main?.humidity);

  return (
    <div>
      <GaugeNeedle
        title="Ammo"
        setName="Ammo 설정"
        setValue={setValue}
        // up={handleUp}
        // down={handleDown}
        unit="ppm"
        nowName="암모니아"
        nowValue={intervalValue}
        valueMin={0}
        valueMax={25}
      />
    </div>
  );
}

export default AMControl;
