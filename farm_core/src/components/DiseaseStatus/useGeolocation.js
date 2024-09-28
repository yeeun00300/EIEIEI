import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMapAddr } from "../../store/addressSlice/mapAddrSlice";

const { kakao } = window;

const useGeolocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocation = () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              dispatch(setMapAddr(address)); // Redux 상태 업데이트
            } else {
              dispatch(setMapAddr("주소를 찾을 수 없습니다."));
            }
          });
        },
        (error) => {
          console.error("위치 정보를 가져오는 데 실패했습니다.", error);
          dispatch(setMapAddr("위치 정보를 가져올 수 없습니다."));
        },
        options
      );
    };
    fetchLocation();
  }, [dispatch]);
};

export default useGeolocation;
