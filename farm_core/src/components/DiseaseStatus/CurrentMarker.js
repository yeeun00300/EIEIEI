import React, { useState, useCallback } from "react";
import MapSearch from "./MapSearch";
import MapMarker from "./MapMarker";
import PlaceSearch from "./PlaceSearch";
import styles from "./CurrentMarker.module.scss";

function CurrentMarker() {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  const handleInitialPositionSet = useCallback((position) => {
    // 초기 위치 설정 후 동물병원 검색
    searchPlaces("동물병원", position);
  }, []);

  const searchPlaces = (keyword, position) => {
    if (map) {
      // PlaceSearch 컴포넌트에 검색 키워드와 위치 전달
      setPlaces([]);
      if (userPosition) {
        // PlaceSearch의 searchPlaces 호출 부분을 직접 작성해야 함
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.placeSearchContainer}>
        {map && (
          <PlaceSearch
            map={map}
            places={places}
            setPlaces={setPlaces}
            userPosition={userPosition} // 사용자 위치를 PlaceSearch로 전달
          />
        )}
      </div>
      <div className={styles.mapContainer}>
        <MapSearch setMap={setMap} />
        {map && (
          <MapMarker
            map={map}
            onPositionChange={setUserPosition}
            onInitialPositionSet={handleInitialPositionSet} // 위치 설정 후 동물병원 검색
          />
        )}
      </div>
    </div>
  );
}

export default CurrentMarker;
