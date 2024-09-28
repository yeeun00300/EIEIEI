import React, { useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import TempPiNeedleWidget from "./../../../../components/ControlPanels/widget/TempPieChartWithNeedle";
import HumidPiChartWidget from "./../../../../components/ControlPanels/widget/HumidPiChartWidget";
import LightPiChartWidget from "./../../../../components/ControlPanels/widget/LightPiChartWidget";
import CO2PiChartWidget from "./../../../../components/ControlPanels/widget/CO2PiChartWidget";
import NH3PiChartWidget from "./../../../../components/ControlPanels/widget/NH3PiChartWidget";

function WidgetList({ setWidgetList }) {
  const [selectedWidgets, setSelectedWidgets] = useState({
    temperature: false,
    humidity: false,
    light: false,
    co2: false,
    nh3: false,
  });
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setWidgetList((prevList) => {
      if (checked) {
        // 체크된 경우 값 추가
        return [...prevList, value];
      } else {
        // 체크 해제된 경우 값 제거
        return prevList.filter((item) => item !== value);
      }
    });
  };
  return (
    <>
      <Checkbox
        color="primary"
        label="백신정보"
        value="1"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="가축별 총 데이터"
        value="2"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="물 사료 소비량"
        value="3"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="질병 지도 데이터"
        value="4"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="온도 조절"
        value="5"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="습도 조절"
        value="6"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="조도 조절"
        value="7"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="CO2 조절"
        value="8"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="NH3 조절"
        value="9"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="5일 날씨"
        value="10"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="현재 농장 가축 수"
        value="11"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="발정상태&생산량"
        value="12"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="건강 상태"
        value="13"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="폐사율"
        value="14"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="cctv"
        value="15"
        variant="outlined"
        onChange={handleCheckboxChange}
      />

      {/* <div> */}
      {/* 온도 조절 */}
      {/* {selectedWidgets.temperature && <TempPiNeedleWidget />} */}
      {/* 습도 조절 */}
      {/* {selectedWidgets.humidity && <HumidPiChartWidget />} */}
      {/* 조도 조절 */}
      {/* {selectedWidgets.light && <LightPiChartWidget />} */}
      {/* CO2 조절 */}
      {/* {selectedWidgets.co2 && <CO2PiChartWidget />} */}
      {/* NH3 조절 */}
      {/* {selectedWidgets.nh3 && <NH3PiChartWidget />} */}
      {/* </div> */}
    </>
  );
}

export default WidgetList;
