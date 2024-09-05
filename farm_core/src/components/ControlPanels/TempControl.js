import React from "react";
import GaugeNeedle from "../Gauge/GaugeNeedle";
import { useSelector } from "react-redux";

function TempControl() {
  const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  console.log(todayWeatherData);
  const nowTemp = todayWeatherData.list;
  return (
    <div>
      <GaugeNeedle
        title="온도계"
        setName="설정온도"
        setValue={27}
        unit="℃"
        nowName="현재온도"
      />
    </div>
  );
}

export default TempControl;
