// src/components/MapMarker.js
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setMapAddr } from "../../store/addressSlice/mapAddrSlice";
const { kakao } = window;

function MapMarker({ map, onPositionChange, onInitialPositionSet }) {
  const userMarkerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!map) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = new kakao.maps.LatLng(latitude, longitude);

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2Address(longitude, latitude, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            dispatch(setMapAddr(address)); // Redux 상태 업데이트
          } else {
            dispatch(setMapAddr("주소를 찾을 수 없습니다."));
          }
        });

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
          position: newPosition,
          image: userMarkerImage,
        });

        userMarkerRef.current = marker;
        map.setCenter(newPosition);

        if (onPositionChange) onPositionChange(newPosition);
        if (onInitialPositionSet) onInitialPositionSet(newPosition);
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
  }, [map, onPositionChange, onInitialPositionSet, dispatch]);

  return null;
}

export default MapMarker;
