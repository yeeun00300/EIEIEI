import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  setAddress,
  setDetailedAddress,
  toggleOpen,
} from "../../store/myPageSlice/addressSlice";
import {
  addField,
  addLiveStockAction,
} from "../../store/addLiveStockSlice/addLiveStockSlice";
import { getDatas } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { fetchFarmList } from "../../store/checkLoginSlice/checkLoginSlice";
import styles from "./addLiveStock.module.scss";

function AddLiveStock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address = "", detailedAddress = "" } = useSelector(
    (state) => state.addressSlice
  );
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
  const [isFarmIdExists, setIsFarmIdExists] = useState(false);

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
      // Check if farmId is being changed and validate
      if (name === "farmId") {
        checkFarmIdExists(value);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!farmName) errors.farmName = "축사 이름은 필수입니다.";
    if (farmName.length > 8)
      errors.farmName = "축사 이름은 8자리 이하로 입력해주세요.";
    if (!farmId) errors.farmId = "축사 번호는 필수입니다.";
    if (isFarmIdExists) errors.farmId = "축사 번호가 이미 존재합니다.";
    if (!address) errors.address = "축사 위치는 필수입니다.";
    if (!detailedAddress) errors.detailedAddress = "상세 주소는 필수입니다.";
    if (!farm_stockType) errors.farm_stockType = "축사 유형은 필수입니다.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkFarmIdExists = async (farmId) => {
    const queryOptions = {
      conditions: [{ field: "farmId", operator: "==", value: farmId }],
    };
    const snapshot = await getDatas("farm", queryOptions);

    console.log("Farm ID exists check:", snapshot); // 디버깅을 위한 로그
    setIsFarmIdExists(snapshot.length > 0); // 결과에 따라 상태 업데이트
  };

  const handleFarmIdCheck = async () => {
    if (farmId) {
      await checkFarmIdExists(farmId);
      if (isFarmIdExists) {
        alert("축사 번호가 이미 존재합니다.");
      } else {
        alert("축사 번호가 사용 가능합니다.");
      }
    } else {
      alert("축사 번호를 입력해 주세요.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form Errors:", formErrors);
      return;
    }
    console.log("Validation passed");

    const email = localStorage.getItem("email");

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
    };

    try {
      // Dispatch the action to add the farm data to the Firestore
      const resultAction = await dispatch(
        addLiveStockAction({ collectionName: "farm", addObj: farmData })
      );

      if (addLiveStockAction.fulfilled.match(resultAction)) {
        console.log("Farm added successfully:", resultAction.payload);
      } else {
        console.error("Failed to add farm:", resultAction.error.message);
      }

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
      await dispatch(
        fetchFarmList({
          collectionName: "farm",
          queryOptions: {
            conditions: [
              {
                field: "email",
                operator: "==",
                value: email,
              },
            ],
          },
        })
      );

      // 홈으로 이동
      navigate("/");
    } catch (error) {
      console.error("Error adding farm:", error);
    }
  };

  console.log(farm_stockType);

  return (
    <div className="page">
      <h1 className={styles.addLiveStockAddTitle}>축사 추가하기</h1>
      <div className={styles.addLiveStockBox}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="farmName">축사 이름:</label>
            <input
              type="text"
              name="farmName"
              className={styles.addLiveStockInput} // 추가된 클래스명
              value={farmName}
              placeholder="축사 이름을 정해주세요"
              onChange={handleChange}
              required
            />
            {formErrors.farmName && (
              <p className={styles.addLiveStockError}>{formErrors.farmName}</p>
            )}
          </div>
          <div>
            <label htmlFor="farmId">축사 번호:</label>
            <input
              type="number"
              name="farmId"
              className={styles.addLiveStockInput} // 추가된 클래스명
              value={farmId}
              placeholder="축사 번호를 입력해주세요"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={handleFarmIdCheck}
              className={styles.addLiveStockBtn}
            >
              중복 확인
            </button>
            {formErrors.farmId && (
              <p className={styles.addLiveStockError}>{formErrors.farmId}</p>
            )}
          </div>
          <div>
            <label htmlFor="farmAddress">축사 위치:</label>
            <input
              name="farmAddress"
              type="text"
              className={styles.addLiveStockInput} // 추가된 클래스명
              value={address} // Use address for the main address input
              onClick={openPostcodePopup}
              placeholder="상세 주소까지 입력해주세요"
              readOnly
            />
            {formErrors.address && (
              <p className={styles.addLiveStockError}>{formErrors.address}</p>
            )}
          </div>
          <div>
            <label htmlFor="detailedAddress">상세 주소:</label>
            <input
              name="detailedAddress"
              type="text"
              className={styles.addLiveStockInput} // 추가된 클래스명
              value={detailedAddress}
              onChange={handleChange}
              placeholder="상세 주소를 입력해주세요"
              required
            />
            {formErrors.detailedAddress && (
              <p className={styles.addLiveStockError}>
                {formErrors.detailedAddress}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="farmScale">면적:</label>
            <input
              type="text"
              name="farmScale"
              className={styles.addLiveStockInput} // 추가된 클래스명
              value={farmScale}
              placeholder="예: 500m²"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="farm_stockType">축사 유형:</label>
            <select
              name="farm_stockType"
              className={styles.addLiveStockSelect} // 추가된 클래스명
              value={farm_stockType}
              onChange={handleChange}
            >
              <option value="">축사 유형을 선택하세요</option>
              <option value="한우">한우</option>
              <option value="낙농">낙농</option>
              <option value="산란계">산란계</option>
              <option value="양돈">양돈</option>
              <option value="육계">육계</option>
              <option value="기타">기타</option>
            </select>
            {formErrors.farm_stockType && (
              <p className={styles.addLiveStockError}>
                {formErrors.farm_stockType}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="farmBuild">축사 건물:</label>
            <input
              type="text"
              name="farmBuild"
              className={styles.addLiveStockInput} // 추가된 클래스명
              value={farmBuild}
              placeholder="축사 건물의 형태를 입력하세요"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="farmCondition">축사 상태:</label>
            <input
              type="text"
              name="farmCondition"
              className={styles.addLiveStockInput} // 추가된 클래스명
              value={farmCondition}
              placeholder="축사 상태를 입력하세요"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="facilities">부대시설:</label>
            <textarea
              name="facilities"
              className={styles.addLiveStockTextarea} // 추가된 클래스명
              value={facilities}
              placeholder="부대시설을 입력하세요"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="insuranceDetail">보험 상세:</label>
            <textarea
              name="insuranceDetail"
              className={styles.addLiveStockTextarea} // 추가된 클래스명
              value={insuranceDetail}
              placeholder="보험 상세를 입력하세요"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="note">비고:</label>
            <textarea
              name="note"
              className={styles.addLiveStockTextarea} // 추가된 클래스명
              value={note}
              placeholder="기타 비고를 입력하세요"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.addLiveStockBtn}>
            추가하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLiveStock;
