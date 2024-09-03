import React, { useState, useCallback } from "react";
import MapSearch from "./MapSearch";
import MapMarker from "./MapMarker";
import PlaceSearch from "./PlaceSearch";
import styles from "./CurrentMarker.module.scss";

function CurrentMarker() {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [initialSearchDone, setInitialSearchDone] = useState(false); // 초기 검색 완료 상태 추가

  const handleInitialPositionSet = useCallback((position) => {
    searchPlaces("동물병원", position);
    setInitialSearchDone(true); // 초기 검색 완료
  }, []);

  const searchPlaces = (keyword, position) => {
    if (map) {
      setPlaces([]);
      // 위치를 기준으로 검색할지 전체 지역에서 검색할지 결정
      const searchOptions = initialSearchDone
        ? {}
        : { location: position, radius: 5000 }; // 위치 기반 검색

      if (userPosition) {
        // PlaceSearch의 searchPlaces 호출 부분을 직접 작성해야 함
        // 여기서 검색할 때 `searchOptions`를 전달해야 함
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
            userPosition={userPosition}
            initialSearchDone={initialSearchDone} // 초기 검색 완료 상태 전달
          />
        )}
      </div>
      <div className={styles.mapContainer}>
        <MapSearch setMap={setMap} />
        {map && (
          <MapMarker
            map={map}
            onPositionChange={setUserPosition}
            onInitialPositionSet={handleInitialPositionSet}
          />
        )}
      </div>
    </div>
  );
}

export default CurrentMarker;
