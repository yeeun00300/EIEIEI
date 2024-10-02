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
          } else {
          }
        } catch (error) {}
      };

      fetchData();
    }
  }, []);

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
    try {
      const selectedFarmId = farmData.farmNumber; // 사용자가 선택한 farmId
      const farmDocIndex = farmIdList.indexOf(selectedFarmId); // 선택된 farmId의 인덱스 찾기

      if (farmDocIndex !== -1) {
        const farmDocId = docId[farmDocIndex]; // 인덱스를 통해 docId에서 문서 ID 찾기

        const subCollections = {
          farmCureList: {
            farmNumber: selectedFarmId || "",
            symptom: farmData.symptom || "",
            symptomCount: farmData.symptomCount || "",
            fever: farmData.fever !== undefined ? farmData.fever : false,
            feverMean: farmData.feverMean || "",
            cough: farmData.cough !== undefined ? farmData.cough : false,
            coughCount: farmData.coughCount || "",
            diarrhea: farmData.diarrhea || "",
            diarrheaCount: farmData.diarrheaCount || "",
            ventilation: farmData.ventilation || "",
            lampCondition: farmData.lampCondition || "",
            feedSupply: farmData.feedSupply || "",
          },
        };

        // 선택된 farmId에 맞는 문서 ID로 서브컬렉션에 데이터 추가
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
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.label}>가축들이 열이 있습니까?</label>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={farmData.fever === true}
                onChange={handleCheckboxChange}
                name="feverYes"
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>예</span>

              <input
                type="checkbox"
                checked={farmData.fever === false}
                onChange={handleCheckboxChange}
                name="feverNo"
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>아니오</span>
            </div>
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
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.label}>
              가축들이 기침을 하고 있습니까?
            </label>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={farmData.cough === true}
                onChange={handleCheckboxChange}
                name="coughYes"
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>예</span>

              <input
                type="checkbox"
                checked={farmData.cough === false}
                onChange={handleCheckboxChange}
                name="coughNo"
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>아니오</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>기침 빈도</label>
            <input
              type="text"
              name="coughCount"
              placeholder="예: 하루 3회"
              onChange={handleChange}
              value={farmData.coughCount || ""}
              className={styles.input}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.label}>설사 증상 여부</label>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={farmData.diarrhea === true}
                onChange={handleCheckboxChange}
                name="diarrheaYes"
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>예</span>

              <input
                type="checkbox"
                checked={farmData.diarrhea === false}
                onChange={handleCheckboxChange}
                name="diarrheaNo"
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>아니오</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>설사 빈도</label>
            <input
              type="text"
              name="diarrheaCount"
              placeholder="예: 하루 2회"
              onChange={handleChange}
              value={farmData.diarrheaCount || ""}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>환기 상태</label>
            <input
              type="text"
              name="ventilation"
              placeholder="환기 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.ventilation || ""}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>램프 상태</label>
            <input
              type="text"
              name="lampCondition"
              placeholder="램프 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.lampCondition || ""}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>사료 공급 상태</label>
            <input
              type="text"
              name="feedSupply"
              placeholder="사료 공급 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.feedSupply || ""}
              className={styles.input}
            />
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
