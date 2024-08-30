import React, { useState, useEffect } from "react";
const { kakao } = window;

function PlaceSearch({ map }) {
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!map) return;

    const ps = new kakao.maps.services.Places(); // 장소 검색 객체

    // 키워드로 장소를 검색하는 함수
    const searchPlaces = () => {
      if (!keyword.trim()) {
        alert("키워드를 입력해주세요!");
        return;
      }

      ps.keywordSearch(keyword, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data); // 검색된 장소를 상태에 저장
          displayPlaces(data); // 검색된 장소를 지도에 표시
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 중 오류가 발생했습니다.");
        }
      });
    };

    // 검색 결과를 지도에 마커로 표시하는 함수
    const displayPlaces = (places) => {
      const bounds = new kakao.maps.LatLngBounds(); // 지도의 범위를 설정하는 객체

      // 기존 마커 삭제
      removeMarker();

      // 장소마다 마커 생성
      places.forEach((place, index) => {
        const position = new kakao.maps.LatLng(place.y, place.x);
        const marker = new kakao.maps.Marker({
          map: map,
          position: position,
        });

        bounds.extend(position); // 지도의 범위에 마커 위치 추가

        // 마커 클릭 시 인포윈도우에 장소명 표시
        kakao.maps.event.addListener(marker, "click", () => {
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;z-index:1;">${place.place_name}</div>`,
          });
          infowindow.open(map, marker);
        });

        // 마커를 배열에 저장
        markers.push(marker);
      });

      map.setBounds(bounds); // 지도 범위를 검색된 장소가 모두 보이도록 재설정
    };

    // 기존 마커 삭제 함수
    const removeMarker = () => {
      markers.forEach((marker) => marker.setMap(null));
      markers = [];
    };

    let markers = []; // 마커를 담을 배열

    // 검색 버튼 클릭 시 장소 검색
    document
      .getElementById("search-btn")
      .addEventListener("click", searchPlaces);

    // Cleanup on component unmount
    return () => {
      document
        .getElementById("search-btn")
        .removeEventListener("click", searchPlaces);
    };
  }, [keyword, map]);

  return (
    <div>
      <div>
        <input
          type="text"
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색할 키워드를 입력하세요"
          style={{ width: "300px", padding: "5px", marginBottom: "10px" }}
        />
        <button id="search-btn">검색</button>
      </div>
      <ul id="placesList" style={{ listStyle: "none", padding: 0 }}>
        {places.map((place, index) => (
          <li key={index} className="item" style={{ marginBottom: "10px" }}>
            <span>{index + 1}. </span>
            <strong>{place.place_name}</strong>
            {place.road_address_name && (
              <div>
                <small>{place.road_address_name}</small>
                <br />
                <small>{place.address_name}</small>
              </div>
            )}
            <small>{place.phone}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaceSearch;
