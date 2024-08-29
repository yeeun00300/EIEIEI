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
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerRed.png";
          const imageSize = new kakao.maps.Size(64, 69);
          const imageOption = { offset: new kakao.maps.Point(27, 69) };

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

          // Geocoder를 사용해 좌표를 주소로 변환
          const geocoder = new kakao.maps.services.Geocoder();

          geocoder.coord2Address(lon, lat, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              console.log(address);
              // 인포윈도우에 주소 표시
              const message = `
                    <div style="padding:5px; font-size:14px; display:inline-block; 
                                background-color:white; border-radius:5px; 
                                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);">
                      ${address} (내위치)
                    </div>`;
              const infowindow = new kakao.maps.InfoWindow({
                content: message,
              });

              infowindow.open(map, marker);
              map.setCenter(locPosition);
            }
          });
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
