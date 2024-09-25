import React, { useEffect, useState } from "react";
import GaugeNeedle from "../Gauge/GaugeNeedle";
import propellerImg from "../../img/프로펠러.png";
import styles from "./CO2Control.module.scss";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";

function CO2Control() {
  const [setValue, setSetValue] = useState(300); // 목표 설정값은 300
  const [intervalValue, setIntervalValue] = useState(270); // 초기값 270
  const [isOn, setIsOn] = useState(false); // 초기값 OFF 상태
  const [isIncreasing, setIsIncreasing] = useState(true); // 증가 상태

  const handleUp = () => {
    if (setValue >= 1000) return;
    setSetValue((prev) => prev + 10);
  };

  const handleDown = () => {
    if (setValue <= 200) return;
    setSetValue((prev) => prev - 10);
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

  useEffect(() => {
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
      isIncreasing ? 300 : 150
    ); // 증가 시 300ms, 감소 시 150ms

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, [isIncreasing, setValue, intervalValue]); // 의존성 배열에 상태 추가
  // 버튼 상태 업데이트
  useEffect(() => {
    if (intervalValue <= 0) {
      setIsOn(false); // 수치가 0 이하일 때 ON
    } else if (intervalValue >= setValue) {
      setIsOn(true); // 수치가 설정값 이상일 때 OFF
    }
  }, [intervalValue, setValue]);
  return (
    <div>
      <img
        src={propellerImg}
        className={`${styles.propeller} ${isOn ? styles.spin : ""}`}
      />
      <GaugeNeedle
        title="CO2"
        setName="CO2 설정"
        setValue={setValue}
        up={handleUp}
        down={handleDown}
        unit="ppm"
        nowName="CO2 농도"
        nowValue={intervalValue}
        valueMin={0}
        valueMax={1000}
      />
      <button onClick={toggleOnOff}>{isOn ? "OFF" : "ON"}</button>
      <p>{isIncreasing ? "CO2 증가 중" : "CO2 감소 중"}</p>
    </div>
  );
}

export default CO2Control;
