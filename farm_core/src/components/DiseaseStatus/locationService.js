export const fetchLocationAndAddress = (kakao, dispatch, setMapAddr) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2Address(lon, lat, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            console.log(address);

            // Redux 상태 업데이트
            dispatch(setMapAddr(address));
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
};
