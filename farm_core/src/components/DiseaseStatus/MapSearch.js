import React, { useEffect, useState } from "react";
const { kakao } = window;

function MapSearch() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 13,
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);
  return (
    <div
      style={{
        width: "500px",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <div id="map" style={{ width: "99%", height: "700px" }}></div>
    </div>
  );
}

export default MapSearch;
