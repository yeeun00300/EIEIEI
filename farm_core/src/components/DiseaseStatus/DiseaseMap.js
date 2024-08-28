import React, { useEffect, useState } from "react";
import axios from "axios";
import sidoData from "../../api/mapPolygon/sido.json";
const { kakao } = window;

function DiseaseMap() {
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 13,
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    init(kakaoMap, sidoData);

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      removePolygons();
    };
  }, []);

  const removePolygons = () => {
    polygons.forEach((polygon) => polygon.setMap(null));
    setPolygons([]);
  };

  const init = async (kakaoMap, data) => {
    try {
      const geojson = data;
      const areas = geojson.features.map((unit) => {
        const coordinates = unit.geometry.coordinates[0];
        const path = coordinates.map(
          (coordinate) => new kakao.maps.LatLng(coordinate[1], coordinate[0])
        );
        return {
          name: unit.properties.SIG_KOR_NM,
          location: unit.properties.SIG_CD,
          path,
        };
      });

      areas.forEach((area) => displayArea(kakaoMap, area));
    } catch (error) {
      console.error("Error loading geojson:", error);
    }
  };

  const displayArea = (kakaoMap, area) => {
    const polygon = new kakao.maps.Polygon({
      map: kakaoMap,
      path: area.path,
      strokeWeight: 1,
      strokeColor: "#004c80",
      strokeOpacity: 0.5,
      fillColor: "#fff",
      fillOpacity: 0.7,
    });

    const customOverlay = new kakao.maps.CustomOverlay({
      content: `<div class="area" style="position: absolute; background: white; padding: 5px; border: 1px solid black;">${area.name}</div>`,
      position: new kakao.maps.LatLng(0, 0),
    });

    kakao.maps.event.addListener(polygon, "mouseover", function (mouseEvent) {
      polygon.setOptions({ fillColor: "#09f" });
      customOverlay.setPosition(mouseEvent.latLng);
      customOverlay.setMap(kakaoMap);
    });

    // kakao.maps.event.addListener(polygon, "mousemove", function (mouseEvent) {
    //   customOverlay.setPosition(mouseEvent.latLng);
    // });

    kakao.maps.event.addListener(polygon, "mouseout", function () {
      polygon.setOptions({ fillColor: "#fff" });
      customOverlay.setMap(null);
    });

    kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
      kakaoMap.setLevel(10);
      kakaoMap.panTo(mouseEvent.latLng);
    });

    setPolygons((prevPolygons) => [...prevPolygons, polygon]);
  };

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

export default DiseaseMap;
