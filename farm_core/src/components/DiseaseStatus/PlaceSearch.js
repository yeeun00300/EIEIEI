import React, { useState, useEffect } from "react";
import styles from "./PlaceSearch.module.scss"; // 스타일 모듈 import
const { kakao } = window;

function PlaceSearch({ map }) {
  const [keyword, setKeyword] = useState(""); // 검색 키워드 상태
  const [places, setPlaces] = useState([]); // 검색 결과 장소 상태
  const [markers, setMarkers] = useState([]); // 마커 상태

  // 장소 검색 함수
  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data); // 검색된 장소 저장
        displayPlaces(data); // 지도에 마커 표시
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 중 오류가 발생했습니다.");
      }
    });
  };

  // 장소를 지도에 마커로 표시하는 함수
  const displayPlaces = (places) => {
    const bounds = new kakao.maps.LatLngBounds();
    removeMarker(); // 기존 마커 삭제

    const newMarkers = places.map((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);

      // 마커 이미지 설정
      const markerImageSrc = `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png`;
      const imageSize = new kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691),
        spriteOrigin: new kakao.maps.Point(0, index * 46 + 10),
        offset: new kakao.maps.Point(13, 37),
      };

      // 마커 생성
      const markerImage = new kakao.maps.MarkerImage(
        markerImageSrc,
        imageSize,
        imgOptions
      );

      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        image: markerImage,
      });

      bounds.extend(position);

      // 마커 클릭 시 인포윈도우 표시
      kakao.maps.event.addListener(marker, "click", () => {
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;z-index:1;">${place.place_name}</div>`,
        });
        infowindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers); // 마커 상태 업데이트
    map.setBounds(bounds); // 지도 범위 설정
  };

  // 기존 마커 삭제 함수
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
  }, [keyword, map, markers]); // 마커 상태에 따라 useEffect 실행

  // 목록 아이템 클릭 시 지도 이동 및 인포윈도우 표시
  const handleItemClick = (place, index) => {
    const position = new kakao.maps.LatLng(place.y, place.x);

    map.setCenter(position);
    map.setLevel(3);

    const marker = markers[index];
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;z-index:1;">${place.place_name}</div>`,
    });
    infowindow.open(map, marker);
  };

  // 엔터키 입력 시 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchPlaces();
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
          onKeyDown={handleKeyDown}
          placeholder="검색할 키워드를 입력하세요"
          className={styles.searchInput}
        />
        <button id="search-btn" className={styles.searchButton}>
          검색
        </button>
      </div>
      <ul id="placesList" className={styles.placesList}>
        {places.length > 0 ? (
          places.map((place, index) => (
            <li
              key={index}
              className={styles.placeItem}
              onClick={() => handleItemClick(place, index)}
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
          ))
        ) : (
          <li className={styles.placeholderItem}>키워드를 입력해주세요.</li>
        )}
      </ul>
    </div>
  );
}

export default PlaceSearch;
