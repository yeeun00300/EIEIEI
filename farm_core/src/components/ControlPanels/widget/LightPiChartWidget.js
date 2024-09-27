import React, { useEffect, useState } from "react";
import PieChartNeedle from "../../Gauge/PieChartNeedle";
import LightOn from "../../../img/LightOn.jpg";
import LightOff from "../../../img/LightOff.jpg";
import styles from "./LightPiChartWidget.module.scss";

function LightPiChartWidget() {
  const [setValue, setSetValue] = useState(150);
  const [time, setTime] = useState(new Date());
  const [intervalValue, setIntervalValue] = useState(50);
  const [OnOff, setOnOff] = useState("off");
  const RADIAN = Math.PI / 180;

  const dataOn = [
    { name: "A", value: 120, color: "yellow" },
    // { name: "B", value: 8, color: "#00ff00" },
    // { name: "C", value: 60, color: "#ff0000" },
  ];
  const dataOff = [
    // { name: "A", value: 120, color: "#0000ff" },
    // { name: "B", value: 8, color: "#00ff00" },
    { name: "C", value: 60, color: "gray" },
  ];
  const cx = 95; // X 위치 value-up:left
  const cy = 100; // Y 위치 value-up:down
  const iR = 75; // 안쪽 원
  const oR = 100; // 바깥 원
  const value = 180 * (intervalValue / 1000); // 초기값위치
  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = -value + 180;
    // const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };

  const handleUp = () => {
    if (setValue >= 1200) {
      return false;
    } else {
      setSetValue(setValue + 50);
    }
  };
  const handleDown = () => {
    if (setValue <= 0) {
      return false;
    } else {
      setSetValue(setValue - 50);
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
      if (intervalValue <= 100) {
        setOnOff("off");
      } else {
        setOnOff("on");
      }
    }, 100);
    // 시간간격조정
    return () => clearInterval(interval);
  }, [setValue, intervalValue, OnOff]);
  return (
    <div className={styles.LightWidget}>
      {OnOff == "on" ? (
        <>
          <img src={LightOn} width="90px" height="120px" />
          <PieChartNeedle
            data={dataOn}
            cx={cx}
            cy={cy}
            iR={iR}
            oR={oR}
            value={value}
            needle={needle}
            setValue={setValue}
            intervalValue={intervalValue}
            handleUp={handleUp}
            handleDown={handleDown}
            unit="Lux"
            nowName="현재조도"
          />
        </>
      ) : (
        <>
          <img src={LightOff} width="90px" height="120px" />
          <PieChartNeedle
            data={dataOff}
            cx={cx}
            cy={cy}
            iR={iR}
            oR={oR}
            value={value}
            needle={needle}
            setValue={setValue}
            intervalValue={intervalValue}
            handleUp={handleUp}
            handleDown={handleDown}
            unit="Lux"
            nowName="현재조도"
          />
        </>
      )}
    </div>
  );
}

export default LightPiChartWidget;
