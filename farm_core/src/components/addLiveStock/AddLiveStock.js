import React, { useState } from "react";
import styles from "./LiveStock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  setAddress,
  setZoneCode,
  toggleOpen,
} from "../../store/myPageSlice/addressSlice";
import { addField } from "../../store/addLiveStockSlice/addLiveStockSlice";
import { addFarmData } from "../../store/addLiveStockSlice/addLiveStockSlice";

function AddLiveStock(props) {
  const dispatch = useDispatch();
  const { zoneCode, address, isOpen } = useSelector(
    (state) => state.addressSlice
  );
  const {
    farmName,
    farmId,
    farmScale,
    farm_stockType,
    farmBuild,
    farmCondition,
    facilities,
    insuranceDetail,
    note,
  } = useSelector((state) => state.AddLiveStockSlice);

  // State to manage detailed address
  const [detailAddress, setDetailAddress] = useState("");

  const open = useDaumPostcodePopup();

  const completeHandler = (data) => {
    const { address: selectedAddress, zonecode } = data;
    dispatch(setAddress(selectedAddress));
    dispatch(setZoneCode(zonecode));
    dispatch(toggleOpen());
    setDetailAddress(""); // Clear the detail address after selecting
  };

  const openPostcodePopup = () => {
    open({
      onComplete: completeHandler,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "farmAddress") {
      setDetailAddress(value); // Update detail address
    } else {
      dispatch(addField({ fieldName: name, fieldValue: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const farmData = {
      farmName,
      farmId,
      farmAddress: address + " " + detailAddress, // Combine address and detail address
      farmScale,
      farm_stockType,
      farmBuild,
      farmCondition,
      facilities,
      insuranceDetail,
      note,
    };

    dispatch(addFarmData({ collectionName: "farm", addObj: farmData }));
  };

  return (
    <div className="page">
      <div className={styles.box}>
        <h1>축사 추가하기</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="farmName">축사 이름:</label>
            <input
              type="text"
              name="farmName"
              value={farmName}
              placeholder="축사 이름을 정해주세요"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="farmId">축사 번호:</label>
            <input
              type="number"
              name="farmId"
              value={farmId}
              placeholder="축사 번호를 입력해주세요"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="farmAddress">축사 위치:</label>
            <input
              name="farmAddress"
              type="text"
              value={address} // Use address for the main address input
              onClick={openPostcodePopup}
              onChange={handleChange}
              placeholder="상세 주소까지 입력해주세요"
            />
          </div>
          <div>
            <label htmlFor="detailAddress">상세 주소:</label>
            <input
              name="farmAddress"
              type="text"
              value={detailAddress} // Use detailAddress for additional input
              onChange={handleChange}
              placeholder="상세 주소를 입력해주세요"
            />
          </div>
          <div>
            <label htmlFor="farmScale">면적:</label>
            <input
              type="text"
              name="farmScale"
              value={farmScale}
              placeholder="예: 500m²"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="farm_stockType">축사 유형:</label>
            <input
              type="text"
              name="farm_stockType"
              value={farm_stockType}
              placeholder="예: 한우, 낙농, 닭, 돼지"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="farmBuild">건축 연도:</label>
            <input
              type="number"
              name="farmBuild"
              value={farmBuild}
              placeholder="예: 1995"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="farmCondition">건물 상태:</label>
            <input
              type="text"
              name="farmCondition"
              value={farmCondition}
              placeholder="예: 양호, 보통, 불량"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="facilities">설치 시설:</label>
            <input
              type="text"
              name="facilities"
              value={facilities}
              placeholder="예: 급수기, 환풍기"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="insuranceDetail">가입한 보험 번호:</label>
            <input
              type="text"
              name="insuranceDetail"
              value={insuranceDetail}
              placeholder="보험 번호를 입력하세요"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="note">기타 메모:</label>
            <textarea
              name="note"
              value={note}
              placeholder="추가 정보를 입력하세요"
              onChange={handleChange}
            />
          </div>
          <button type="submit">저장하기</button>
        </form>
      </div>
    </div>
  );
}

export default AddLiveStock;
