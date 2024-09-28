import React, { useEffect, useState } from "react";
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
    <div
      style={{
        width: "100%",
        height: "60vh",
        marginLeft: "0.3125rem",
        marginRight: "0.3125rem",
      }}
    >
      <div id="map" style={{ width: "99%", height: "100%" }}></div>
    </div>
  );
}

export default MapSearch;
