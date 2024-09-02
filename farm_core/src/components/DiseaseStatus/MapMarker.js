import React, { useEffect, useState } from "react";
const { kakao } = window;

function MapMarker({ map, setPlaces }) {
  const [markers, setMarkers] = useState([]); // 마커 상태 추가

  useEffect(() => {
    if (!map) return;

    const searchNearbyPlaces = (lat, lon) => {
      const ps = new kakao.maps.services.Places();
      const keywords = ["동물위생시험소", "동물병원"]; // 검색할 키워드

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

                kakao.maps.event.addListener(marker, "click", () => {
                  const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;z-index:1;">${place.place_name}</div>`,
                  });
                  infowindow.open(map, marker);
                });

                return marker;
              });

              setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
              map.setBounds(bounds); // 지도 범위를 검색된 장소로 설정

              setPlaces(allPlaces); // 검색된 모든 장소를 상태로 설정
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              console.log(`검색 결과가 존재하지 않습니다: ${keyword}`);
            } else if (status === kakao.maps.services.Status.ERROR) {
              console.log("검색 중 오류가 발생했습니다.");
            }
          },
          {
            location: new kakao.maps.LatLng(lat, lon), // 현재 위치를 기준으로 검색
            radius: 5000, // 검색 반경 (미터 단위)
          }
        );
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          // 현재 위치에 마커 추가
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

          // 현재 위치 주변 장소 검색
          searchNearbyPlaces(lat, lon);
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
