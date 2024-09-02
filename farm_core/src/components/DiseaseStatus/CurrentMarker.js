import React, { useState } from "react";
import MapSearch from "./MapSearch";
import MapMarker from "./MapMarker";
import PlaceSearch from "./PlaceSearch";
import styles from "./CurrentMarker.module.scss"; // 스타일 모듈 import

function CurrentMarker() {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]); // 검색된 장소들을 관리할 상태 추가

  return (
    <div className={styles.container}>
      <div className={styles.placeSearchContainer}>
        {map && <PlaceSearch map={map} places={places} setPlaces={setPlaces} />}{" "}
        {/* 검색된 장소 및 선택된 장소 상태 전달 */}
      </div>
      <div className={styles.mapContainer}>
        <MapSearch setMap={setMap} />
        {map && <MapMarker map={map} setPlaces={setPlaces} />}{" "}
        {/* 장소 상태 및 선택된 장소 상태 전달 */}
      </div>
    </div>
  );
}

export default CurrentMarker;
