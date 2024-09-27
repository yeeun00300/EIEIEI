import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PieChartNeedle from "../../Gauge/PieChartNeedle";
import styles from "./HumidPiChartWidget.module.scss";

function HumidPiChartWidget() {
  const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  const nowHumid = parseInt(todayWeatherData?.main?.humidity);
  const [time, setTime] = useState(new Date());
  const [setValue, setSetValue] = useState(50);
  const [intervalValue, setIntervalValue] = useState(nowHumid);
  const RADIAN = Math.PI / 180;

  const data = [
    { name: "A", value: 160, color: "#0000ff" },
    //   { name: "B", value: 8, color: "#00ff00" },
    { name: "C", value: 20, color: "#ff0000" },
  ];
  const cx = 95; // X 위치 value-up:left
  const cy = 100; // Y 위치 value-up:down
  const iR = 75; // 안쪽 원
  const oR = 100; // 바깥 원
  const value = 180 * (intervalValue / 100); // 초기값위치
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
    if (setValue >= 100) {
      return false;
    } else {
      setSetValue(setValue + 5);
    }
  };
  const handleDown = () => {
    if (setValue <= 0) {
      return false;
    } else {
      setSetValue(setValue - 5);
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
    <div className={styles.HumidWidget}>
      <PieChartNeedle
        data={data}
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
        unit="%"
        nowName="현재습도"
      />
    </div>
  );
}

export default HumidPiChartWidget;
