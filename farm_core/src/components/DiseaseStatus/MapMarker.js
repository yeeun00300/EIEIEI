import React, { useEffect, useState } from "react";
const { kakao } = window;

function MapMarker({ map, setPlaces }) {
  const [markers, setMarkers] = useState([]); // 마커 상태 추가
  const [userMarker, setUserMarker] = useState(null); // 사용자 위치 마커 상태 추가

  useEffect(() => {
    if (!map) return;

    const searchNearbyPlaces = (lat, lon) => {
      const ps = new kakao.maps.services.Places();
      const keywords = ["동물병원"]; // 검색할 키워드

      let allPlaces = []; // 모든 장소를 저장할 배열

      keywords.forEach((keyword) => {
        ps.keywordSearch(
          keyword,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              allPlaces = [...allPlaces, ...data]; // 모든 검색 결과를 배열에 추가

              const bounds = new kakao.maps.LatLngBounds();
              const newMarkers = data.map((place, index) => {
                const position = new kakao.maps.LatLng(place.y, place.x);

                // 사용자 정의 마커 이미지
                const markerImageSrc = `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png`; // 기본 제공되는 이미지 URL
                const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
                const imgOptions = {
                  spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지 전체 크기
                  spriteOrigin: new kakao.maps.Point(0, index * 46 + 10), // 스프라이트 이미지에서 사용할 영역의 좌상단 좌표
                  offset: new kakao.maps.Point(13, 37), // 마커의 좌표에 맞출 이미지 내의 좌표
                };

                // 마커 이미지 생성
                const markerImage = new kakao.maps.MarkerImage(
                  markerImageSrc,
                  imageSize,
                  imgOptions
                );

                // 마커 생성
                const marker = new kakao.maps.Marker({
                  map: map,
                  position: position,
                  image: markerImage, // 마커 이미지 설정
                });

                bounds.extend(position);

                return marker;
              });

              setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]); // 새로운 마커 추가
              map.setBounds(bounds); // 지도 범위 설정
              setPlaces(allPlaces); // 모든 장소를 상태에 저장
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              console.log(`검색 결과가 존재하지 않습니다: ${keyword}`);
            } else if (status === kakao.maps.services.Status.ERROR) {
              console.log("검색 중 오류가 발생했습니다.");
            }
          },
          { location: new kakao.maps.LatLng(lat, lon) }
        );
      });
    };

    // 현재 위치를 기준으로 장소 검색
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // 사용자 위치를 나타내는 마커 생성
        const userPosition = new kakao.maps.LatLng(latitude, longitude);
        const userMarkerImageSrc = `http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png`; // 사용자 위치 마커 이미지 URL
        const userImageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
        const userImgOptions = {
          spriteSize: new kakao.maps.Size(27, 35), // 스프라이트 이미지 전체 크기
          spriteOrigin: new kakao.maps.Point(0, 0), // 사용자 위치 마커의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커의 좌표에 맞출 이미지 내의 좌표
        };

        // 사용자 위치 마커 이미지 생성
        const userMarkerImage = new kakao.maps.MarkerImage(
          userMarkerImageSrc,
          userImageSize,
          userImgOptions
        );

        // 사용자 위치 마커 생성
        const marker = new kakao.maps.Marker({
          map: map,
          position: userPosition,
          image: userMarkerImage, // 사용자 위치 마커 이미지 설정
        });

        // 사용자 위치 마커 상태 업데이트
        setUserMarker(marker);

        // 지도 중심을 사용자 위치로 설정
        map.setCenter(userPosition);

        // 장소 검색
        searchNearbyPlaces(latitude, longitude);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      markers.forEach((marker) => marker.setMap(null)); // 컴포넌트 언마운트 시 마커 제거
      if (userMarker) userMarker.setMap(null); // 사용자 위치 마커 제거
      setMarkers([]); // 상태 초기화
      setUserMarker(null); // 사용자 위치 마커 상태 초기화
    };
  }, [map, setPlaces]);

  return null; // 이 컴포넌트는 렌더링할 UI가 없으므로 null을 반환합니다.
}

export default MapMarker;
