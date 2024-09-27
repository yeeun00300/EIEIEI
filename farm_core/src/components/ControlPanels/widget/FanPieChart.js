import React, { useState } from "react";
import styles from "./FanPieChart.module.scss";
import propellerImg from "../../../img/프로펠러.png";
import PieChartNeedle from "../../Gauge/PieChartNeedle";

function FanPieChart({
  data,
  cx,
  cy,
  iR,
  oR,
  value,
  needle,
  setValue,
  intervalValue,
  handleUp,
  handleDown,
  unit,
  nowName,
  //   isOn,
  //   toggleOnOff,
  isIncreasing,
  setIsIncreasing,
}) {
  const [isOn, setIsOn] = useState(false); // 초기값 OFF 상태
  const toggleOnOff = () => {
    if (isIncreasing) {
      setIsIncreasing(false); // 수치가 증가 중이면 감소로 전환
      setIsOn(true); // 버튼을 ON 상태로 설정
    } else {
      setIsIncreasing(true); // 수치가 감소 중이면 증가로 전환
      setIsOn(false); // 버튼을 OFF 상태로 설정
    }
  };
  return (
    <>
      <div className={styles.fanSwitch}>
        <img
          src={propellerImg}
          className={`${styles.propeller} ${isOn ? styles.spin : ""}`}
        />
        <button onClick={toggleOnOff}>{isOn ? "On" : "OFF"}</button>
        {/* <p>{isIncreasing ? "CO2 증가 중" : "CO2 감소 중"}</p> */}
      </div>
      <div className={styles.PieChart}>
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
          unit={unit}
          nowName={nowName}
        />
      </div>
    </>
  );
}

export default FanPieChart;
