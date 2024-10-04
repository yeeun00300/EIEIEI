import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField } from "../../store/addLiveStockSlice/addLiveStockSlice";
import { fetchFarmDocumentByEmail, addMessage } from "../../firebase";
import styles from "./MedicalList.module.scss";
import { MenuItem, Select } from "@mui/material";

function MedicalList(props) {
  const dispatch = useDispatch();
  const farmData = useSelector((state) => state.AddLiveStockSlice);

  const [docId, setDocId] = useState([]);
  const [farmIdList, setFarmIdList] = useState([]);
  const [isFormValid, setIsFormValid] = useState(true); // 폼 유효성 상태 관리
  const [errors, setErrors] = useState({}); // 에러 메시지 상태 관리
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 여부 상태 관리

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchData = async () => {
        try {
          const documents = await fetchFarmDocumentByEmail(email);
          if (documents.length > 0) {
            setDocId(documents.map((doc) => doc.id));
            setFarmIdList(
              documents.map((doc) => doc.farmId).filter((id) => id)
            );
          }
        } catch (error) {}
      };

      fetchData();
    }
  }, []);

  // 유효성 검사 로직
  const validateForm = () => {
    const newErrors = {};

    // 필수 필드 유효성 체크
    if (!farmData.farmNumber) newErrors.farmNumber = "필수 항목입니다.";
    if (!farmData.symptom) newErrors.symptom = "필수 항목입니다.";
    if (!farmData.symptomCount) newErrors.symptomCount = "필수 항목입니다.";
    if (farmData.fever === undefined)
      newErrors.fever = "필수 항목입니다. 예/아니오를 선택해주세요.";
    if (!farmData.feverMean) newErrors.feverMean = "필수 항목입니다.";
    if (farmData.cough === undefined)
      newErrors.cough = "필수 항목입니다. 예/아니오를 선택해주세요.";
    if (!farmData.coughCount) newErrors.coughCount = "필수 항목입니다.";
    if (farmData.diarrhea === undefined)
      newErrors.diarrhea = "필수 항목입니다. 예/아니오를 선택해주세요.";
    if (!farmData.diarrheaCount) newErrors.diarrheaCount = "필수 항목입니다.";
    if (!farmData.ventilation) newErrors.ventilation = "필수 항목입니다.";
    if (!farmData.lampCondition) newErrors.lampCondition = "필수 항목입니다.";
    if (!farmData.feedSupply) newErrors.feedSupply = "필수 항목입니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 에러가 없으면 true 반환
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addField({ fieldName: name, fieldValue: value }));
  };

  const handleSelectChange = (e) => {
    const selectedFarmId = e.target.value;
    dispatch(addField({ fieldName: "farmNumber", fieldValue: selectedFarmId }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const isYesCheckbox = name.includes("Yes");

    dispatch(
      addField({
        fieldName: name.replace("Yes", "").replace("No", ""),
        fieldValue: isYesCheckbox ? checked : !checked,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // 제출 시에만 에러 메시지 표시

    // 유효성 검사 후 폼 제출
    if (validateForm()) {
      try {
        const selectedFarmId = farmData.farmNumber;
        const farmDocIndex = farmIdList.indexOf(selectedFarmId);

        if (farmDocIndex !== -1) {
          const farmDocId = docId[farmDocIndex];

          const subCollections = {
            farmCureList: {
              farmNumber: selectedFarmId || "",
              symptom: farmData.symptom || "",
              symptomCount: farmData.symptomCount || "",
              fever: farmData.fever !== undefined ? farmData.fever : false,
              feverMean: farmData.feverMean || "",
              cough: farmData.cough !== undefined ? farmData.cough : false,
              coughCount: farmData.coughCount || "",
              diarrhea:
                farmData.diarrhea !== undefined ? farmData.diarrhea : false,
              diarrheaCount: farmData.diarrheaCount || "",
              ventilation: farmData.ventilation || "",
              lampCondition: farmData.lampCondition || "",
              feedSupply: farmData.feedSupply || "",
            },
          };

          await addMessage(
            "farm",
            farmDocId,
            "farmCureList",
            subCollections.farmCureList
          );
          window.alert("문진표 작성이 완료되었습니다.");
          window.location.reload();
        } else {
          alert("유효한 문서 ID가 없습니다.");
        }
      } catch (error) {
        alert("데이터 저장에 실패했습니다.");
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>축사 문진표</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>축사 번호</label>
            <Select
              name="farmNumber"
              value={farmData.farmNumber || ""}
              onChange={handleSelectChange}
              className={styles.input}
            >
              <MenuItem value="">축사 번호를 선택해주세요</MenuItem>
              {farmIdList.map((farmId, index) => (
                <MenuItem
                  key={index}
                  value={farmId}
                  className={styles.subInput}
                >
                  {farmId}
                </MenuItem>
              ))}
            </Select>
            {isSubmitted && errors.farmNumber && (
              <p className={styles.error}>{errors.farmNumber}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>공통 증상</label>
            <textarea
              name="symptom"
              rows="4"
              placeholder="가축들이 보이는 공통 증상을 기재하세요"
              onChange={handleChange}
              value={farmData.symptom || ""}
              className={styles.input}
            />
            {isSubmitted && errors.symptom && (
              <p className={styles.error}>{errors.symptom}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>영향을 받은 가축 수</label>
            <input
              type="number"
              name="symptomCount"
              placeholder="영향을 받은 가축의 수를 입력하세요"
              onChange={handleChange}
              value={farmData.symptomCount || ""}
              className={styles.input}
            />
            {isSubmitted && errors.symptomCount && (
              <p className={styles.error}>{errors.symptomCount}</p>
            )}
          </div>

          {/* 열 여부 체크박스 */}
          <div className={styles.checkboxGroup}>
            <label className={styles.label}>가축들이 열이 있습니까?</label>
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={farmData.fever === true}
                  onChange={handleCheckboxChange}
                  name="feverYes"
                  className={styles.checkbox}
                />
                예
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={farmData.fever === false}
                  onChange={handleCheckboxChange}
                  name="feverNo"
                  className={styles.checkbox}
                />
                아니오
              </label>
            </div>
            {isSubmitted && errors.fever && (
              <p className={styles.error}>{errors.fever}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>평균 체온 (°C)</label>
            <input
              type="text"
              name="feverMean"
              placeholder="예: 39°C"
              onChange={handleChange}
              value={farmData.feverMean || ""}
              className={styles.input}
            />
            {isSubmitted && errors.feverMean && (
              <p className={styles.error}>{errors.feverMean}</p>
            )}
          </div>

          {/* 기침 여부 체크박스 */}
          <div className={styles.checkboxGroup}>
            <label className={styles.label}>기침을 합니까?</label>
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={farmData.cough === true}
                  onChange={handleCheckboxChange}
                  name="coughYes"
                  className={styles.checkbox}
                />
                예
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={farmData.cough === false}
                  onChange={handleCheckboxChange}
                  name="coughNo"
                  className={styles.checkbox}
                />
                아니오
              </label>
            </div>
            {isSubmitted && errors.cough && (
              <p className={styles.error}>{errors.cough}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>기침하는 가축 수</label>
            <input
              type="number"
              name="coughCount"
              placeholder="기침하는 가축 수를 입력하세요"
              onChange={handleChange}
              value={farmData.coughCount || ""}
              className={styles.input}
            />
            {isSubmitted && errors.coughCount && (
              <p className={styles.error}>{errors.coughCount}</p>
            )}
          </div>

          {/* 설사 여부 체크박스 */}
          <div className={styles.checkboxGroup}>
            <label className={styles.label}>설사를 합니까?</label>
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={farmData.diarrhea === true}
                  onChange={handleCheckboxChange}
                  name="diarrheaYes"
                  className={styles.checkbox}
                />
                예
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={farmData.diarrhea === false}
                  onChange={handleCheckboxChange}
                  name="diarrheaNo"
                  className={styles.checkbox}
                />
                아니오
              </label>
            </div>
            {isSubmitted && errors.diarrhea && (
              <p className={styles.error}>{errors.diarrhea}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>설사하는 가축 수</label>
            <input
              type="number"
              name="diarrheaCount"
              placeholder="설사하는 가축 수를 입력하세요"
              onChange={handleChange}
              value={farmData.diarrheaCount || ""}
              className={styles.input}
            />
            {isSubmitted && errors.diarrheaCount && (
              <p className={styles.error}>{errors.diarrheaCount}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>환기가 잘 되나요?</label>
            <input
              type="text"
              name="ventilation"
              placeholder="환기가 잘 되고 있다면 '좋음', 아니다면 '나쁨'이라고 입력하세요"
              onChange={handleChange}
              value={farmData.ventilation || ""}
              className={styles.input}
            />
            {isSubmitted && errors.ventilation && (
              <p className={styles.error}>{errors.ventilation}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>조명 상태</label>
            <input
              type="text"
              name="lampCondition"
              placeholder="조명 상태를 기재하세요"
              onChange={handleChange}
              value={farmData.lampCondition || ""}
              className={styles.input}
            />
            {isSubmitted && errors.lampCondition && (
              <p className={styles.error}>{errors.lampCondition}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>사료 공급 여부</label>
            <input
              type="text"
              name="feedSupply"
              placeholder="사료 공급 여부를 기재하세요"
              onChange={handleChange}
              value={farmData.feedSupply || ""}
              className={styles.input}
            />
            {isSubmitted && errors.feedSupply && (
              <p className={styles.error}>{errors.feedSupply}</p>
            )}
          </div>

          <button type="submit" className="globalBtn">
            제출하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default MedicalList;
