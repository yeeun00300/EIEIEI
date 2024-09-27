import React, { useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import TempPiNeedleWidget from "./../../../../components/ControlPanels/widget/TempPieChartWithNeedle";
import HumidPiChartWidget from "./../../../../components/ControlPanels/widget/HumidPiChartWidget";
import LightPiChartWidget from "./../../../../components/ControlPanels/widget/LightPiChartWidget";
import CO2PiChartWidget from "./../../../../components/ControlPanels/widget/CO2PiChartWidget";
import NH3PiChartWidget from "./../../../../components/ControlPanels/widget/NH3PiChartWidget";

function WidgetList() {
  const [selectedWidgets, setSelectedWidgets] = useState({
    temperature: false,
    humidity: false,
    light: false,
    co2: false,
    nh3: false,
  });
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedWidgets((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };
  return (
    <>
      <Checkbox
        color="primary"
        label="온도 조절"
        value="temperature"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="습도 조절"
        value="humidity"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="조도 조절"
        value="light"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="CO2 조절"
        value="co2"
        variant="outlined"
        onChange={handleCheckboxChange}
      />
      <Checkbox
        color="primary"
        label="NH3 조절"
        value="nh3"
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
