import React, { useState, useEffect } from "react";
import styles from "./PlaceSearch.module.scss"; // 스타일 모듈 import
const { kakao } = window;

function PlaceSearch({ map }) {
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [markers, setMarkers] = useState([]); // 마커를 상태로 관리

  // Define searchPlaces function outside useEffect
  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
        displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 중 오류가 발생했습니다.");
      }
    });
  };

  const displayPlaces = (places) => {
    const bounds = new kakao.maps.LatLngBounds();
    removeMarker(); // 기존 마커 삭제

    const newMarkers = places.map((place) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
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

    setMarkers(newMarkers); // 생성된 마커를 상태에 저장
    map.setBounds(bounds); // 지도 범위를 검색된 장소로 설정
  };

  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  useEffect(() => {
    if (!map) return;

    document
      .getElementById("search-btn")
      .addEventListener("click", searchPlaces);

    return () => {
      document
        .getElementById("search-btn")
        .removeEventListener("click", searchPlaces);
    };
  }, [keyword, map, markers]); // markers를 의존성 배열에 추가

  // 목록에서 아이템 클릭 시 지도 이동 및 확대
  const handleItemClick = (place, index) => {
    const position = new kakao.maps.LatLng(place.y, place.x);

    map.setCenter(position);
    map.setLevel(3); // 확대 레벨 설정 (작을수록 더 확대됨)

    // 마커에 인포윈도우를 표시 (마커 클릭과 동일한 효과)
    const marker = markers[index];
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;z-index:1;">${place.place_name}</div>`,
    });
    infowindow.open(map, marker);
  };

  // 엔터키로 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchPlaces(); // 이제 이 함수는 정의된 상태입니다.
    }
  };

  return (
    <div className={styles.placeSearchContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
          placeholder="검색할 키워드를 입력하세요"
          className={styles.searchInput}
        />
        <button id="search-btn" className={styles.searchButton}>
          검색
        </button>
      </div>
      <ul id="placesList" className={styles.placesList}>
        {places.map((place, index) => (
          <li
            key={index}
            className={styles.placeItem}
            onClick={() => handleItemClick(place, index)} // 클릭 이벤트 추가
          >
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
