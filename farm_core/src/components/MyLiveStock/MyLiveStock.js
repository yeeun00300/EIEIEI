import React, { useState } from "react";
import styles from "./MyLiveStock.module.scss";
import Selected from "./Selected/Selected";
function MyLiveStock(props) {
  return (
    <div className="container">
      <Selected />
    </div>
  );
}

export default MyLiveStock;
