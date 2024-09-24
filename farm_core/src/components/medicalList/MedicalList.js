import React, { useEffect, useState } from "react";
import styles from "./MedicalList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addFarmData,
  addField,
} from "../../store/addLiveStockSlice/addLiveStockSlice";
import { getAuth } from "firebase/auth";
import {
  addFarmDataWithSubcollections,
  addMessage,
  fetchFarmDocumentByEmail,
  getSubCollection,
  useFetchCollectionData,
} from "../../firebase";
import userInfoEditSlice from "./../../store/userInfoEditSlice/UserInfoEditSlice";
import { fetchExcelStock } from "../../store/stockSlice/stockSlice";

function MedicalList(props) {
  const dispatch = useDispatch();
  const farmData = useSelector((state) => state.AddLiveStockSlice);

  console.log(farmData);
  // const farmData = useSelector((state) => state.userInfoEditSlice);

  // useFetchCollectionData("farm");
  const [docId, setDocId] = useState([]); // docId 상태 추가
  const [farmIdList, setFarmIdList] = useState([]);
  console.log(docId);
  console.log(farmIdList);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchData = async () => {
        try {
          // 이메일로 모든 문서 검색
          const documents = await fetchFarmDocumentByEmail(email);
          console.log("Fetched documents:", documents); // 디버깅용 로그
          if (documents.length > 0) {
            setDocId(documents.map((doc) => doc.id)); // 첫 번째 문서의 ID를 설정
            setFarmIdList(
              documents.map((doc) => doc.farmId).filter((id) => id)
            ); // 모든 farmId를 배열로 설정
          } else {
            console.log("No documents found for this email.");
          }
        } catch (error) {
          console.error("문서 검색 실패:", error.message || error);
        }
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

    // 'Yes' 체크박스는 'true'로, 'No' 체크박스는 'false'로 설정
    const isYesCheckbox = name.includes("Yes");

    dispatch(
      addField({
        fieldName: name.replace("Yes", "").replace("No", ""),
        fieldValue: isYesCheckbox ? checked : !checked,
      })
    );
    console.log("cough state updated:", farmData.cough);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting farm data:", farmData);

      // 폼 데이터와 하위 컬렉션 데이터 준비
      const subCollections = {
        farmCureList: {
          farmNumber: farmData.farmNumber || "",
          symptom: farmData.symptom || "",
          symptomCount: farmData.symptomCount || "",
          fever: farmData.fever || "",
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

      console.log("SubCollections data:", subCollections);

      const farmDocId = await addMessage(
        "farm",
        docId,
        "farmCureList",
        subCollections.farmCureList
      );

      alert("데이터가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("데이터 저장 실패:", error.message || error);
      alert("데이터 저장에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className="container">
        <h2>축사 문진표</h2>

        <div className="form-section">
          <h3>의뢰인 정보</h3>
          <span>축사 번호</span>
          <select
            name="farmNumber"
            value={farmData.farmNumber || ""}
            onChange={handleSelectChange}
          >
            <option value="">축사 번호를 선택해주세요</option>
            {farmIdList.map((farmId, index) => (
              <option key={index} value={farmId}>
                {farmId}
              </option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <h3>가축 건강 상태</h3>
          <div className="field-group">
            <label htmlFor="symptom">공통 증상:</label>
            <textarea
              id="symptom"
              name="symptom"
              placeholder="가축들이 보이는 공통 증상을 기재하세요"
              onChange={handleChange}
              value={farmData.symptom || ""}
            ></textarea>
          </div>
          <div className="field-group">
            <label htmlFor="symptomCount">영향을 받은 가축 수:</label>
            <input
              type="text"
              id="symptomCount"
              name="symptomCount"
              placeholder="영향을 받은 가축의 수를 입력하세요"
              onChange={handleChange}
              value={farmData.symptomCount || ""}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>질병 및 상태 체크 리스트</h3>
          <div className="field-group">
            <span>1. 가축들이 열이 있습니까?</span>
            <span>
              <input
                type="checkbox"
                id="feverYes"
                name="feverYes"
                checked={farmData.fever === true}
                onChange={handleCheckboxChange}
              />{" "}
              예
              <input
                type="checkbox"
                id="feverNo"
                name="feverNo"
                checked={farmData.fever === false}
                onChange={handleCheckboxChange}
              />{" "}
              아니요
            </span>
          </div>
          <div className="field-group">
            <label htmlFor="feverMean">평균 체온 (°C):</label>
            <input
              type="text"
              id="feverMean"
              name="feverMean"
              placeholder="예: 39°C"
              onChange={handleChange}
              value={farmData.feverMean || ""}
            />
          </div>

          <div className="field-group">
            <span>2. 가축들이 기침을 하고 있습니까?</span>
            <span>
              <input
                type="checkbox"
                id="coughYes"
                name="coughYes"
                checked={farmData.cough === true}
                onChange={handleCheckboxChange}
              />{" "}
              예
              <input
                type="checkbox"
                id="coughNo"
                name="coughNo"
                checked={farmData.cough === false}
                onChange={handleCheckboxChange}
              />{" "}
              아니요
            </span>
          </div>
          <div className="field-group">
            <label htmlFor="coughCount">기침 빈도:</label>
            <input
              type="text"
              id="coughCount"
              name="coughCount"
              placeholder="예: 하루 3회"
              onChange={handleChange}
              value={farmData.coughCount || ""}
            />
          </div>

          <div className="field-group">
            <span>3. 설사 증상이 있습니까?</span>
            <span>
              <input
                type="checkbox"
                id="diarrheaYes"
                name="diarrheaYes"
                checked={farmData.diarrhea === true}
                onChange={handleCheckboxChange}
              />{" "}
              예
              <input
                type="checkbox"
                id="diarrheaNo"
                name="diarrheaNo"
                checked={farmData.diarrhea === false}
                onChange={handleCheckboxChange}
              />{" "}
              아니요
            </span>
          </div>
          <div className="field-group">
            <label htmlFor="diarrheaCount">설사 횟수:</label>
            <input
              type="text"
              id="diarrheaCount"
              name="diarrheaCount"
              placeholder="예: 하루 5회"
              onChange={handleChange}
              value={farmData.diarrheaCount || ""}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>사육 환경</h3>
          <div className="field-group">
            <label htmlFor="ventilation">환기 상태:</label>
            <input
              type="text"
              id="ventilation"
              name="ventilation"
              placeholder="환기 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.ventilation || ""}
            />
          </div>
          <div className="field-group">
            <label htmlFor="lampCondition">조명 상태:</label>
            <input
              type="text"
              id="lampCondition"
              name="lampCondition"
              placeholder="조명 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.lampCondition || ""}
            />
          </div>
          <div className="field-group">
            <label htmlFor="feed">사료 공급 상태:</label>
            <input
              type="text"
              id="feedSupply"
              name="feedSupply"
              placeholder="사료 공급 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.feedSupply || ""}
            />
          </div>
        </div>

        <button type="submit">제출</button>
      </div>
    </form>
  );
}

export default MedicalList;
