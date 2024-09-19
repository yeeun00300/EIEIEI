import React, { useState } from "react";
import styles from "./LiveStock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  setAddress,
  setZoneCode,
  toggleOpen,
} from "../../store/myPageSlice/addressSlice";

import {
  addField,
  addFarmData,
} from "../../store/addLiveStockSlice/addLiveStockSlice";
import kroDate from "../../utils/korDate";
import { addFarmDataWithSubcollections } from "../../firebase";

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

  const [detailAddress, setDetailAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const open = useDaumPostcodePopup();

  const completeHandler = (data) => {
    const { address: selectedAddress, detailAddress } = data;
    dispatch(setAddress(selectedAddress));
    dispatch(setDetailAddress(detailAddress));
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
    if (name === "detailAddress") {
      setDetailAddress(value); // Update detail address
    } else {
      dispatch(addField({ fieldName: name, fieldValue: value }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!farmName) errors.farmName = "축사 이름은 필수입니다.";
    if (!farmId) errors.farmId = "축사 번호는 필수입니다.";
    if (!address) errors.address = "축사 위치는 필수입니다.";
    if (!detailAddress) errors.detailAddress = "상세 주소는 필수입니다.";
    if (!farm_stockType) errors.farm_stockType = "축사 유형은 필수입니다.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const email = localStorage.getItem("email");
    const saveLayoutString = localStorage.getItem("userLayout");
    const saveLayout = JSON.parse(saveLayoutString);

    const farmData = {
      farmName,
      farmId,
      farmAddress: address + " " + detailAddress,
      farmScale,
      farm_stockType,
      farmBuild,
      farmCondition,
      facilities,
      insuranceDetail,
      note,
      email,
      saveLayout,
    };

    const subCollections = {
      farmCureList: [
        {
          symptom: "",
          symptomCount: "",
          fever: "",
          feverMean: "",
          cough: "",
          coughCount: "",
          diarrhea: "",
          diarrheaCount: "",
          ventilation: "",
          lampCondition: "",
          feedSupply: "",
        },
      ],
      ruinInfo: {
        someDocId: {
          stockId: "",
          stockCount: "",
          diseaseType: "",
        },
      },
      vaccine: [
        {
          vaccineType: "",
          vaccineDate: kroDate(),
        },
      ],
      disease: [
        {
          diseaseType: "",
          diseaseDate: kroDate(),
          cure: "",
        },
      ],
    };

    console.log("Farm Data:", farmData);
    console.log("SubCollections:", subCollections);

    try {
      // const farmDocId = await addFarmData(farmData);
      // if (farmDocId) {
      // 상위 문서의 ID를 사용하여 하위 컬렉션 추가
      // await addFarmDataWithSubcollections(farmDocId, subCollections);
      // console.log("farm added with ID:", farmDocId);

      const farmDocId = await addFarmDataWithSubcollections(
        // email,
        farmData,
        subCollections
      );
      // const result = await dispatch(
      //   addFarmData({
      //     addObj: farmData,
      //     subcollections: subCollections,
      //   })
      // ).unwrap();
      // console.log("result값 :", result);
      console.log("Farm added with ID:", farmDocId);
      console.log("subCollections:", subCollections);
      // Clear form fields
      dispatch(addField({ fieldName: "farmName", fieldValue: "" }));
      dispatch(addField({ fieldName: "farmId", fieldValue: "" }));
      dispatch(addField({ fieldName: "farmScale", fieldValue: "" }));
      dispatch(addField({ fieldName: "farm_stockType", fieldValue: "" }));
      dispatch(addField({ fieldName: "farmBuild", fieldValue: "" }));
      dispatch(addField({ fieldName: "farmCondition", fieldValue: "" }));
      dispatch(addField({ fieldName: "facilities", fieldValue: "" }));
      dispatch(addField({ fieldName: "insuranceDetail", fieldValue: "" }));
      dispatch(addField({ fieldName: "note", fieldValue: "" }));
      setDetailAddress(""); // Clear detail address
      dispatch(setAddress("")); // Clear main address
      // }
    } catch (error) {
      console.error("Error adding farm:", error);
    }
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
              required
            />
            {formErrors.farmName && (
              <p className={styles.error}>{formErrors.farmName}</p>
            )}
          </div>
          <div>
            <label htmlFor="farmId">축사 번호:</label>
            <input
              type="number"
              name="farmId"
              value={farmId}
              placeholder="축사 번호를 입력해주세요"
              onChange={handleChange}
              required
            />
            {formErrors.farmId && (
              <p className={styles.error}>{formErrors.farmId}</p>
            )}
          </div>
          <div>
            <label htmlFor="farmAddress">축사 위치:</label>
            <input
              name="farmAddress"
              type="text"
              value={address} // Use address for the main address input
              onClick={openPostcodePopup}
              placeholder="상세 주소까지 입력해주세요"
              readOnly
            />
            {formErrors.address && (
              <p className={styles.error}>{formErrors.address}</p>
            )}
          </div>
          <div>
            <label htmlFor="detailAddress">상세 주소:</label>
            <input
              name="detailAddress"
              type="text"
              value={detailAddress}
              onChange={handleChange}
              placeholder="상세 주소를 입력해주세요"
              required
            />
            {formErrors.detailAddress && (
              <p className={styles.error}>{formErrors.detailAddress}</p>
            )}
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
              required
            />
            {formErrors.farm_stockType && (
              <p className={styles.error}>{formErrors.farm_stockType}</p>
            )}
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
