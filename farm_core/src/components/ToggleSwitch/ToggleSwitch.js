import { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 8rem;
  left: 47%;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }

  > .toggle--checked {
    background-color: rgb(0, 200, 102);
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }

  > .toggle--checked {
    left: 27px;
    transition: 0.5s;
  }
`;

export const ToggleSwitch = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleHandler = () => {
    setIsOn((prev) => !prev);
    if (onToggle) onToggle(!isOn); // 부모 컴포넌트에 상태를 알리기 위해 onToggle 함수 호출
  };

  return (
    <>
      <ToggleContainer onClick={toggleHandler}>
        <div className={`toggle-container ${isOn ? "toggle--checked" : ""}`} />
        <div className={`toggle-circle ${isOn ? "toggle--checked" : ""}`} />
      </ToggleContainer>
    </>
  );
};
