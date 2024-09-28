import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useSelector } from "react-redux";
import PieChartNeedle from "../../Gauge/PieChartNeedle";
import styles from "./TempPiNeedleWidget.module.scss";

function TempPiNeedleWidget() {
  const { todayWeatherData } = useSelector((state) => state.weatherSlice);
  const nowTemp = parseInt(todayWeatherData?.main?.temp);
  const [setValue, setSetValue] = useState(25);
  const [time, setTime] = useState(new Date());
  const [intervalValue, setIntervalValue] = useState(nowTemp);

  const RADIAN = Math.PI / 90;

  const data = [
    { name: "A", value: 62, color: "#0088fe" },
    { name: "B", value: 8, color: "#FFBB28" },
    { name: "C", value: 20, color: "#FF8042" },
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
    const ang = -value + 270;
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

  return (
    <div className={styles.TempWidget}>
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
        unit="℃"
        nowName="현재온도"
      />
    </div>
  );
}

export default TempPiNeedleWidget;
