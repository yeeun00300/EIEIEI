import React, { useContext, useEffect, useState } from "react";
import styles from "./NH3PiChartWidget.module.scss";
import propellerImg from "../../../img/프로펠러.png";
import PieChartNeedle from "../../Gauge/PieChartNeedle";
import FanPieChart from "./FanPieChart";
// import ToggleCont from "../ContextToggle";
function NH3PiChartWidget() {
  const [setValue, setSetValue] = useState(25); // 목표 설정값은 300
  const [intervalValue, setIntervalValue] = useState(1); // 초기값 270
  const [isOn, setIsOn] = useState(false); // 초기값 OFF 상태
  // const { isOn = false, setIsOn, toggleOnOff } = useContext(ToggleCont);
  const [isIncreasing, setIsIncreasing] = useState(true); // 증가 상태
  // console.log(`CO2 On : ${isOn}`);
  const RADIAN = Math.PI / 90;

  const data = [
    { name: "A", value: 55, color: "#80cbc4" },
    // { name: "B", value: 8, color: "#00ff00" },
    { name: "C", value: 35, color: "#4db6ac" },
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
    if (setValue >= 1000) return;
    setSetValue((prev) => prev + 1);
  };

  const handleDown = () => {
    if (setValue <= 1) return;
    setSetValue((prev) => prev - 1);
  };

  const toggleOnOff = () => {
    if (isIncreasing) {
      setIsIncreasing(false); // 수치가 증가 중이면 감소로 전환
      setIsOn(true); // 버튼을 ON 상태로 설정
    } else {
      setIsIncreasing(true); // 수치가 감소 중이면 증가로 전환
      setIsOn(false); // 버튼을 OFF 상태로 설정
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => {
  //       if (isIncreasing) {
  //         // 증가 중일 때
  //         if (intervalValue < setValue) {
  //           setIntervalValue((prevValue) =>
  //             Number((prevValue + 0.01).toFixed(2))
  //           );
  //         } else {
  //           setIsIncreasing(false); // 목표 값 도달 시 감소로 전환
  //         }
  //       } else {
  //         // 감소 중일 때
  //         if (intervalValue > 0) {
  //           setIntervalValue((prevValue) =>
  //             Number((prevValue - 0.1).toFixed(2))
  //           );
  //         } else {
  //           setIsIncreasing(true); // 0에 도달하면 다시 증가로 전환
  //         }
  //       }
  //     },
  //     isIncreasing ? 300 : 100
  //   ); // 증가 시 300ms, 감소 시 100ms

  //   return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  // }, [isIncreasing, setValue, intervalValue]); // 의존성 배열에 상태 추가
  useEffect(() => {
    if (intervalValue <= 0) {
      setIsOn(false); // 수치가 0 이하일 때 ON
    } else if (intervalValue >= setValue) {
      setIsOn(true); // 수치가 설정값 이상일 때 OFF
    }
  }, [intervalValue, setValue]);
  return (
    <div className={styles.NH3Widget}>
      <FanPieChart
        data={data}
        cx={cx}
        cy={cy}
        iR={iR}
        oR={oR}
        value={value}
        needle={needle}
        setValue={setValue}
        intervalValue={intervalValue}
        setIntervalValue={setIntervalValue}
        handleUp={handleUp}
        handleDown={handleDown}
        unit="ppm"
        nowName="NH3 농도"
        isOn={isOn}
        setIsOn={setIsOn}
        toggleOnOff={toggleOnOff}
        isIncreasing={isIncreasing}
        setIsIncreasing={setIsIncreasing}
        mode={"NH3"}
      />
    </div>
  );
}

export default NH3PiChartWidget;
