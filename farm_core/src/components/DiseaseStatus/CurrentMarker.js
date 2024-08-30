import React, { useState } from "react";
import MapSearch from "./MapSearch";
import MapMarker from "./MapMarker";
import PlaceSearch from "./PlaceSearch";
import styles from "./CurrentMarker.module.scss"; // 스타일 모듈 import

function CurrentMarker() {
  const [map, setMap] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.placeSearchContainer}>
        {map && <PlaceSearch map={map} />}
      </div>
      <div className={styles.mapContainer}>
        <MapSearch setMap={setMap} />
        {map && <MapMarker map={map} />}
      </div>
    </div>
  );
}

export default CurrentMarker;
