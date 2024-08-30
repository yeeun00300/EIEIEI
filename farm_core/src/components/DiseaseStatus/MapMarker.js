import React, { useEffect } from "react";
const { kakao } = window;

function MapMarker({ map }) {
  useEffect(() => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          // 마커 이미지 설정
          const imageSrc =
            "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png";
          const imageSize = new kakao.maps.Size(20, 30);
          const imageOption = { offset: new kakao.maps.Point(20, 30) };

          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          const marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: markerImage,
          });

          // 지도 중심을 현재 위치로 설정
          map.setCenter(locPosition);
        },
        (error) => {
          console.error("Geolocation error: ", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [map]);

  return null;
}

export default MapMarker;
