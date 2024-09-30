import React from "react";
import TempPiNeedleWidget from "./../ControlPanels/widget/TempPieChartWithNeedle";
import HumidPiChartWidget from "./../ControlPanels/widget/HumidPiChartWidget";
import LightPiChartWidget from "./../ControlPanels/widget/LightPiChartWidget";
import CO2PiChartWidget from "./../ControlPanels/widget/CO2PiChartWidget";
import NH3PiChartWidget from "./../ControlPanels/widget/NH3PiChartWidget";
import styles from "./Controller.module.scss";

function Controller(props) {
  return (
    <div className={styles.contBox}>
      <div className={styles.cont}>
        <TempPiNeedleWidget />
      </div>
      <div className={styles.cont}>
        <HumidPiChartWidget />
      </div>
      <div className={styles.cont}>
        <LightPiChartWidget />
      </div>
      <div className={styles.cont}>
        <CO2PiChartWidget />
      </div>
      <div className={styles.cont}>
        <NH3PiChartWidget />
      </div>
    </div>
  );
}

export default Controller;
