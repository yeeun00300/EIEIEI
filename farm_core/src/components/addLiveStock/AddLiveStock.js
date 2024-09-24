import React, { useState } from "react";
import styles from "./LiveStock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  setAddress,
  setDetailedAddress,
  toggleOpen,
} from "../../store/myPageSlice/addressSlice";
import { addField } from "../../store/addLiveStockSlice/addLiveStockSlice";
import kroDate from "../../utils/korDate";
import { addFarmDataWithSubcollections } from "../../firebase";

function AddLiveStock() {
  const dispatch = useDispatch();
  const {
    zoneCode,
    address = "",
    isOpen,
    detailedAddress = "",
  } = useSelector((state) => state.addressSlice);
  const {
    farmName = "",
    farmId = "",
    farmScale = "",
    farm_stockType = "",
    farmBuild = "",
    farmCondition = "",
    facilities = "",
    insuranceDetail = "",
    note = "",
  } = useSelector((state) => state.AddLiveStockSlice);

  const [formErrors, setFormErrors] = useState({});

  const open = useDaumPostcodePopup();

  const completeHandler = (data) => {
    const { address: selectedAddress, detailedAddress: selectedDetailAddress } =
      data;
    dispatch(setAddress(selectedAddress));
    dispatch(setDetailedAddress(selectedDetailAddress));
    dispatch(toggleOpen());
  };

  const openPostcodePopup = () => {
    open({
      onComplete: completeHandler,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "detailedAddress") {
      dispatch(setDetailedAddress(value)); // Update detailed address
    } else {
      dispatch(addField({ fieldName: name, fieldValue: value }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!farmName) errors.farmName = "축사 이름은 필수입니다.";
    if (!farmId) errors.farmId = "축사 번호는 필수입니다.";
    if (!address) errors.address = "축사 위치는 필수입니다.";
    if (!detailedAddress) errors.detailedAddress = "상세 주소는 필수입니다.";
    if (!farm_stockType) errors.farm_stockType = "축사 유형은 필수입니다.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form Errors:", formErrors);
      return;
    }
    console.log("Validation passed");

    const email = localStorage.getItem("email");
    const saveLayoutString = localStorage.getItem("userLayout");
    const saveLayout = JSON.parse(saveLayoutString);

    const farmData = {
      farmName,
      farmId,
      farmAddress: `${address} ${detailedAddress}`,
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
    };

    try {
      const farmDocId = await addFarmDataWithSubcollections(
        farmData,
        subCollections
      );
      console.log("Farm added with ID:", farmDocId);

      // Clear form fields
      const fieldsToClear = [
        "farmName",
        "farmId",
        "farmScale",
        "farm_stockType",
        "farmBuild",
        "farmCondition",
        "facilities",
        "insuranceDetail",
        "note",
      ];
      fieldsToClear.forEach((field) =>
        dispatch(addField({ fieldName: field, fieldValue: "" }))
      );
      dispatch(setAddress("")); // Clear main address
      dispatch(setDetailedAddress("")); // Clear detailed address
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
            <label htmlFor="detailedAddress">상세 주소:</label>
            <input
              name="detailedAddress"
              type="text"
              value={detailedAddress}
              onChange={handleChange}
              placeholder="상세 주소를 입력해주세요"
              required
            />
            {formErrors.detailedAddress && (
              <p className={styles.error}>{formErrors.detailedAddress}</p>
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
            <select
              name="farm_stockType"
              value={farm_stockType}
              onChange={handleChange}
            >
              <option value="">축사 유형을 선택하세요</option>{" "}
              {/* Default option */}
              <option value="한우">한우</option>
              <option value="낙농">낙농</option>
              <option value="산란계">산란계</option>
              <option value="양돈">양돈</option>
              <option value="육계">육계</option>
            </select>
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
            <label htmlFor="facilities">시설:</label>
            <input
              type="text"
              name="facilities"
              value={facilities}
              placeholder="예: 축사 내부 온도 조절기, 자동 급수기"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="insuranceDetail">보험 세부사항:</label>
            <input
              type="text"
              name="insuranceDetail"
              value={insuranceDetail}
              placeholder="예: 농업재해보험, 축산재해보험"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="note">비고:</label>
            <input
              type="text"
              name="note"
              value={note}
              placeholder="특이사항을 적어주세요"
              onChange={handleChange}
            />
          </div>
          <button type="submit">저장</button>
        </form>
      </div>
    </div>
  );
}

export default AddLiveStock;
