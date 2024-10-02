import React, { useEffect } from "react";
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
  setIntervalValue,
  handleUp,
  handleDown,
  unit,
  nowName,
  isOn,
  setIsOn,
  toggleOnOff,
  isIncreasing,
  setIsIncreasing,
  mode,
}) {
  // const [isOn, setIsOn] = useState(false); // 초기값 OFF 상태
  // const toggleOnOff = () => {
  //   if (isIncreasing) {
  //     setIsIncreasing(false); // 수치가 증가 중이면 감소로 전환
  //     setIsOn(true); // 버튼을 ON 상태로 설정
  //   } else {
  //     setIsIncreasing(true); // 수치가 감소 중이면 증가로 전환
  //     setIsOn(false); // 버튼을 OFF 상태로 설정
  //   }
  // };

  useEffect(() => {
    if (mode == "CO2") {
      const interval = setInterval(
        () => {
          if (isIncreasing) {
            // 증가 중일 때
            if (intervalValue < setValue) {
              setIntervalValue((prevValue) =>
                Number((prevValue + 1.1).toFixed(2))
              );
            } else {
              setIsIncreasing(false); // 목표 값 도달 시 감소로 전환
            }
          } else {
            // 감소 중일 때
            if (intervalValue > 0) {
              setIntervalValue((prevValue) =>
                Number((prevValue - 1.1).toFixed(2))
              );
            } else {
              setIsIncreasing(true); // 0에 도달하면 다시 증가로 전환
            }
          }
        },
        isIncreasing ? 300 : 100
      ); // 증가 시 300ms, 감소 시 100ms
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    } else if (mode == "NH3") {
      const interval = setInterval(
        () => {
          if (isIncreasing) {
            // 증가 중일 때
            if (intervalValue < setValue) {
              setIntervalValue((prevValue) =>
                Number((prevValue + 0.01).toFixed(2))
              );
            } else {
              setIsIncreasing(false); // 목표 값 도달 시 감소로 전환
            }
          } else {
            // 감소 중일 때
            if (intervalValue > 0) {
              setIntervalValue((prevValue) =>
                Number((prevValue - 0.1).toFixed(2))
              );
            } else {
              setIsIncreasing(true); // 0에 도달하면 다시 증가로 전환
            }
          }
        },
        isIncreasing ? 300 : 100
      ); // 증가 시 300ms, 감소 시 100ms

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    }
  }, [isIncreasing, setValue, intervalValue, isOn]); // 의존성 배열에 상태 추가

  // 버튼 상태 업데이트
  // useEffect(() => {
  //   if (intervalValue <= 0) {
  //     setIsOn(false); // 수치가 0 이하일 때 ON
  //   } else if (intervalValue >= setValue) {
  //     setIsOn(true); // 수치가 설정값 이상일 때 OFF
  //   }
  // }, [intervalValue, setValue, isOn]);
  return (
    <>
      <div className={styles.fanSwitch}>
        <img
          src={propellerImg}
          className={`${styles.propeller} ${isOn ? styles.spin : ""}`}
        />
        <button onClick={toggleOnOff} className="globalBtn">
          {isOn ? "On" : "OFF"}
        </button>
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
          fan={true}
        />
      </div>
    </>
  );
}

export default FanPieChart;
