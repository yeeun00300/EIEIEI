import React, { createContext, useState } from "react";
import NH3PiChartWidget from "./widget/NH3PiChartWidget";
import CO2PiChartWidget from "./widget/CO2PiChartWidget";

const ToggleCont = createContext();

function ContextToggle() {
  const [isOn, setIsOn] = useState(false);
  const toggleOnOff = () => setIsOn((prev) => !prev);
  return (
    <ToggleCont.Provider value={{ isOn, setIsOn, toggleOnOff }}>
      <NH3PiChartWidget />
      <CO2PiChartWidget />
    </ToggleCont.Provider>
  );
}

export default ContextToggle;
