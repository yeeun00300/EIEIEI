import React, { useEffect, useRef } from "react";
const { kakao } = window;

function MapMarker({ map, onPositionChange, onInitialPositionSet }) {
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userPosition = new kakao.maps.LatLng(latitude, longitude);

        const userMarkerImageSrc =
          "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png";
        const userImageSize = new kakao.maps.Size(36, 37);
        const userImgOptions = {
          spriteSize: new kakao.maps.Size(27, 35),
          spriteOrigin: new kakao.maps.Point(0, 0),
          offset: new kakao.maps.Point(13, 37),
        };

        const userMarkerImage = new kakao.maps.MarkerImage(
          userMarkerImageSrc,
          userImageSize,
          userImgOptions
        );

        const marker = new kakao.maps.Marker({
          map: map,
          position: userPosition,
          image: userMarkerImage,
        });

        userMarkerRef.current = marker;
        map.setCenter(userPosition);
        if (onPositionChange) onPositionChange(userPosition); // 위치 정보 전달
        if (onInitialPositionSet) onInitialPositionSet(userPosition); // 초기 위치 설정
      },
      (error) => {
        console.error("위치 정보를 가져오는 데 실패했습니다.", error);
      }
    );

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
    };
  }, [map, onPositionChange, onInitialPositionSet]);

  return null;
}

export default MapMarker;
