import React, { useEffect } from "react";
import styles from "./MapSearch.module.scss"; // SCSS 모듈 import
const { kakao } = window;

function MapSearch({ setMap }) {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 13,
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap); // 부모 컴포넌트로 지도 객체 전달
  }, [setMap]);

  return (
    <div className={styles.mapContainer}>
      <div id="map" className={styles.map}></div>
    </div>
  );
}

export default MapSearch;
