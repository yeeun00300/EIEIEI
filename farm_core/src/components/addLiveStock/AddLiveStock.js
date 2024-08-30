import React from "react";
import styles from "./LiveStock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  setAddress,
  setZoneCode,
  toggleOpen,
} from "../../store/myPageSlice/addressSlice";
function AddLiveStock(props) {
  const dispatch = useDispatch();
  const { zoneCode, address, isOpen } = useSelector(
    (state) => state.addressSlice
  );
  console.log(zoneCode);

  const { open } = useDaumPostcodePopup();

  // 이건 완성된거야
  const completeHandler = (data) => {
    const { address, zoneCode } = data;
    dispatch(setAddress(address));
    dispatch(setZoneCode());
    dispatch(toggleOpen());
    console.log(data);
  };
  // 카카오 주소 검색하는 핸들러가 필요해
  const openPostcodePopup = () => {
    open({
      onComplete: completeHandler,
    });
  };

  const closeHandler = (state) => {
    dispatch(toggleOpen());
  };
  const toggleHandler = (state) => {
    dispatch(toggleOpen());
  };
  const handleChange = (e) => {
    dispatch(setAddress(e.target.value));
  };
  return (
    <div className={styles.box}>
      <h1>축사 추가하기</h1>
      <form>
        <div>
          <label htmlFor="barName">축사 이름:</label>
          <input type="text" name="barName" />
        </div>
        <div>
          <label htmlFor="location">위치:</label>
          <input
            name="location"
            type="text"
            value={address}
            //value 를 넣어서 주소값이라고 알려주자고
            // onClick={openPostcodePopup}
            // 클릭시 주소 검색 팝업 만들어놓은거 열자고
            onChange={handleChange}
          />
          <button onClick={openPostcodePopup}>클릭</button>
        </div>
        <div>
          <label htmlFor="size">면적:</label>
          <input type="text" name="size" />
        </div>
        <div>
          <label htmlFor="barnType">축사 유형:</label>
          <input type="text" name="barnType" />
        </div>
        <div>
          <label htmlFor="yearBuilt">건축 연도:</label>
          <input type="number" name="yearBuilt" />
        </div>
        <div>
          <label htmlFor="condition">건물 상태:</label>
          <input type="text" name="condition" />
        </div>
        <div>
          <label htmlFor="manager">담당자:</label>
          <input type="text" name="manager" />
        </div>
        <div>
          <label htmlFor="facilities">설치 시설:</label>
          <input type="text" name="facilities" />
        </div>
        <div>
          <label htmlFor="operatingHours">운영 시간:</label>
          <input type="text" name="operatingHours" />
        </div>
        <div>
          <label htmlFor="insurance_details">가입한 보험 번호:</label>
          <input type="text" name="insurance_details" />
        </div>
        <div>
          <label htmlFor="note">기타 메모:</label>
          <textarea type="text" name="note" />
        </div>
      </form>
      <button>저장하기</button>
    </div>
  );
}

export default AddLiveStock;
