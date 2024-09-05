import React, { useEffect, useState } from "react";
import GaugeNeedle from "../Gauge/GaugeNeedle";

function LIghtControl() {
  const [setValue, setSetValue] = useState(300);
  const [time, setTime] = useState(new Date());
  const [intervalValue, setIntervalValue] = useState(430);
  const handleUp = () => {
    if (setValue >= 1200) {
      return false;
    } else {
      setSetValue(setValue + 100);
    }
  };
  const handleDown = () => {
    if (setValue <= 100) {
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
    }, 100);
    // 시간간격조정
    return () => clearInterval(interval);
  }, [setValue, intervalValue]);
  return (
    <div>
      <GaugeNeedle
        title="조도계"
        setName="조도설정"
        setValue={setValue}
        up={handleUp}
        down={handleDown}
        unit="Lux"
        nowName="현재조도"
        nowValue={intervalValue}
        valueMin={100}
        valueMax={1800}
      />
    </div>
  );
}

export default LIghtControl;
