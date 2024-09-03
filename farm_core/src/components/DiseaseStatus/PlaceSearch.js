import React, { useState, useEffect } from "react";
import styles from "./PlaceSearch.module.scss";
const { kakao } = window;

function PlaceSearch({ map, places, setPlaces, userPosition }) {
  const [keyword, setKeyword] = useState("");
  const [markers, setMarkers] = useState([]);

  const searchPlaces = (searchKeyword, position) => {
    if (!searchKeyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const ps = new kakao.maps.services.Places();
    const searchOptions = {
      location: position, // 위치 기반 검색
      radius: 5000, // 검색 반경 (미터)
    };
    ps.keywordSearch(
      searchKeyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
          displayPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 중 오류가 발생했습니다.");
        }
      },
      searchOptions
    );
  };

  const displayPlaces = (placesData) => {
    const bounds = new kakao.maps.LatLngBounds();
    removeMarkers();

    const newMarkers = placesData.map((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);

      const markerImageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
      const imageSize = new kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691),
        spriteOrigin: new kakao.maps.Point(0, index * 46 + 10),
        offset: new kakao.maps.Point(13, 37),
      };

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

      return marker;
    });

    setMarkers(newMarkers);
    map.setBounds(bounds);
  };

  const removeMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const handleItemClick = (place) => {
    const position = new kakao.maps.LatLng(place.y, place.x);
    map.setCenter(position);
    map.setLevel(3);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchPlaces(keyword, userPosition);
    }
  };

  useEffect(() => {
    if (!map || !userPosition) return;

    // 초기 검색
    searchPlaces("동물병원", userPosition);

    return () => {
      removeMarkers();
    };
  }, [map, userPosition]);

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
        <button
          id="search-btn"
          className={styles.searchButton}
          onClick={() => searchPlaces(keyword, userPosition)}
        >
          검색
        </button>
      </div>
      <ul id="placesList" className={styles.placesList}>
        {places.length > 0 ? (
          places.map((place, index) => (
            <li
              key={index}
              className={styles.placeItem}
              onClick={() => handleItemClick(place)}
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
