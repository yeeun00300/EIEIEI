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
  fetchFarmDocumentByEmail,
  getSubCollection,
  useFetchCollectionData,
} from "../../firebase";
import userInfoEditSlice from "./../../store/userInfoEditSlice/UserInfoEditSlice";
import { fetchExcelStock } from "../../store/stockSlice/stockSlice";
import stock from "../../store/stockSlice/stockSlice";
function MedicalList(props) {
  const dispatch = useDispatch();
  const farmData = useSelector((state) => state.AddLiveStockSlice);
  const { stock } = useSelector((state) => state.stockSlice);
  console.log(stock);
  console.log(farmData);
  // const farmData = useSelector((state) => state.userInfoEditSlice);

  // useFetchCollectionData("farm");
  const [docId, setDocId] = useState(""); // docId 상태 추가
  console.log(docId);
  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchData = async () => {
        try {
          // 이메일로 문서 검색
          const document = await fetchFarmDocumentByEmail(email);
          if (document) {
            setDocId(document.id); // 문서의 docId를 설정
          }
        } catch (error) {
          console.error("문서 검색 실패:", error.message || error);
        }
      };

      fetchData();
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addField({ fieldName: name, fieldValue: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    dispatch(addField({ fieldName: name, fieldValue: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting farm data:", farmData);

      // 폼 데이터와 하위 컬렉션 데이터 준비
      const subCollections = {
        farmCureList: [
          {
            symptom: farmData.symptom || "",
            symptomCount: farmData.symptomCount || "",
            fever: farmData.fever || "",
            feverMean: farmData.feverMean || "",
            cough: farmData.cough || "",
            coughCount: farmData.coughCount || "",
            diarrhea: farmData.diarrhea || "",
            diarrheaCount: farmData.diarrheaCount || "",
            ventilation: farmData.ventilation || "",
            lampCondition: farmData.lampCondition || "",
            feedSupply: farmData.feedSupply || "",
          },
        ],
        ruinInfo: {}, // ruinInfo 데이터 준비
        vaccine: [], // vaccine 데이터 준비
        disease: [], // disease 데이터 준비
      };

      console.log("SubCollections data:", subCollections);

      const farmDocId = await addFarmDataWithSubcollections(
        docId,
        farmData,
        subCollections
      );

      if (farmDocId) {
        setDocId(farmDocId);
        console.log("Farm document ID set:", farmDocId);
        alert("데이터가 성공적으로 저장되었습니다!");
      } else {
        alert("데이터 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("데이터 저장 실패:", error.message || error);
      alert("데이터 저장에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>축사 문진표</h2>

      <div className="form-section">
        <h3>의뢰인 정보</h3>
        <div className="field-group">
          <label htmlFor="name">성명:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="의뢰인 성명을 입력하세요"
            onChange={handleChange}
            value={farmData.name || ""}
          />
        </div>
        <div className="field-group">
          <label htmlFor="phone">전화번호:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="의뢰인 전화번호를 입력하세요"
            onChange={handleChange}
            value={farmData.phone || ""}
          />
        </div>
        <div className="field-group">
          <label htmlFor="address">주소:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="축사 주소를 입력하세요"
            onChange={handleChange}
            value={farmData.address || ""}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>축사 정보</h3>
        <div className="field-group">
          <label htmlFor="barnType">축사 유형:</label>
          <input
            type="text"
            id="barnType"
            name="barnType"
            placeholder="예: 소 축사, 돼지 축사"
            onChange={handleChange}
            value={farmData.barnType || ""}
          />
        </div>
        <div className="field-group">
          <label htmlFor="numberOfAnimals">가축 수:</label>
          <input
            type="text"
            id="numberOfAnimals"
            name="numberOfAnimals"
            placeholder="예: 50마리"
            onChange={handleChange}
            value={farmData.numberOfAnimals || ""}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>가축 건강 상태</h3>
        <div className="field-group">
          <label htmlFor="symptoms">공통 증상:</label>
          <textarea
            id="symptoms"
            name="symptoms"
            placeholder="가축들이 보이는 공통 증상을 기재하세요"
            onChange={handleChange}
            value={farmData.symptoms || ""}
          ></textarea>
        </div>
        <div className="field-group">
          <label htmlFor="affectedAnimals">영향을 받은 가축 수:</label>
          <input
            type="text"
            id="affectedAnimals"
            name="affectedAnimals"
            placeholder="영향을 받은 가축의 수를 입력하세요"
            onChange={handleChange}
            value={farmData.affectedAnimals || ""}
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
              name="fever"
              checked={farmData.fever === true}
              onChange={handleCheckboxChange}
            />{" "}
            예
            <input
              type="checkbox"
              id="feverNo"
              name="fever"
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
              name="cough"
              checked={farmData.cough === true}
              onChange={handleCheckboxChange}
            />{" "}
            예
            <input
              type="checkbox"
              id="coughNo"
              name="cough"
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
              name="diarrhea"
              checked={farmData.diarrhea === true}
              onChange={handleCheckboxChange}
            />{" "}
            예
            <input
              type="checkbox"
              id="diarrheaNo"
              name="diarrhea"
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
          <label htmlFor="lighting">조명 상태:</label>
          <input
            type="text"
            id="lighting"
            name="lighting"
            placeholder="조명 상태를 입력하세요"
            onChange={handleChange}
            value={farmData.lighting || ""}
          />
        </div>
        <div className="field-group">
          <label htmlFor="feed">사료 공급 상태:</label>
          <input
            type="text"
            id="feed"
            name="feed"
            placeholder="사료 공급 상태를 입력하세요"
            onChange={handleChange}
            value={farmData.feed || ""}
          />
        </div>
      </div>

      <button type="submit">제출</button>
    </form>
  );
}

export default MedicalList;
