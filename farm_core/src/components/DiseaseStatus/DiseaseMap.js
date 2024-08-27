import React, { useEffect, useState } from "react";
const { kakao } = window;

function DiseaseMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(36, 127.7),
      level: 13,
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);
  return (
    <div
      style={{
        width: "700px",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <div id="map" style={{ width: "99%", height: "700px" }}></div>
    </div>
  );
}

export default DiseaseMap;
