import React, { useEffect, useState } from "react";
import PieChartNeedle from "../../Gauge/PieChartNeedle";
import styles from "./LightPiChartWidget.module.scss";
import { FaLightbulb } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa6";

function LightPiChartWidget() {
  const [setValue, setSetValue] = useState(100);
  const [time, setTime] = useState(new Date());
  const [intervalValue, setIntervalValue] = useState(50);
  const [OnOff, setOnOff] = useState("off");
  const RADIAN = Math.PI / 180;

  const dataOn = [
    { name: "A", value: 120, color: "#4db6ac" },
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
      setSetValue(setValue + 100);
    }
  };

  const handleDown = () => {
    if (setValue <= 0) {
      return false;
    } else {
      setSetValue(setValue - 100);
    }
  };

  const handleTurnOn = () => {
    setOnOff("on");
  };

  const handleTurnOff = () => {
    setOnOff("off");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // 조명이 켜졌을 때 intervalValue가 증가
      if (OnOff === "on" && intervalValue < setValue) {
        setIntervalValue((prev) => prev + 1);
      }
      // 조명이 꺼졌을 때 intervalValue가 감소
      if (OnOff === "off" && intervalValue > 0) {
        setIntervalValue((prev) => prev - 1);
      }
    }, 50); // 50ms 간격으로 값을 업데이트

    return () => clearInterval(interval);
  }, [OnOff, intervalValue, setValue]);

  return (
    <div className={styles.LightWidget}>
      {OnOff == "on" ? (
        <>
          <div className={styles.turnOn} onClick={handleTurnOff}>
            <FaLightbulb />
          </div>
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
          <div className={styles.turnOff} onClick={handleTurnOn}>
            <FaRegLightbulb />
          </div>
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
