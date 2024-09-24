import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField } from "../../store/addLiveStockSlice/addLiveStockSlice";
import { fetchFarmDocumentByEmail, addMessage } from "../../firebase";
import styles from "./MedicalList.module.scss";

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
      const subCollections = {
        farmCureList: {
          farmNumber: farmData.farmNumber || "",
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

      // docId 배열에서 첫 번째 아이디를 선택합니다.
      if (docId.length > 0) {
        const farmDocId = await addMessage(
          "farm",
          docId[0], // 첫 번째 문서 ID 사용
          "farmCureList",
          subCollections.farmCureList
        );

        alert("데이터가 성공적으로 저장되었습니다!");
        window.location.reload();
      } else {
        alert("유효한 문서 ID가 없습니다.");
      }
    } catch (error) {
      console.error("데이터 저장 실패:", error.message || error);
      alert("데이터 저장에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="container">
        <h2>축사 문진표</h2>

        <div className="form-section">
          <h3>의뢰인 정보</h3>
          <div className="mb-3">
            <label className="form-label" htmlFor="farmNumber">
              축사 번호
            </label>
            <select
              name="farmNumber"
              className="form-select"
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
        </div>

        <div className="form-section">
          <h3>가축 건강 상태</h3>
          <div className="mb-3">
            <label className="form-label" htmlFor="symptom">
              공통 증상:
            </label>
            <textarea
              id="symptom"
              name="symptom"
              className="form-control"
              placeholder="가축들이 보이는 공통 증상을 기재하세요"
              onChange={handleChange}
              value={farmData.symptom || ""}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="symptomCount">
              영향을 받은 가축 수:
            </label>
            <input
              type="text"
              id="symptomCount"
              name="symptomCount"
              className="form-control"
              placeholder="영향을 받은 가축의 수를 입력하세요"
              onChange={handleChange}
              value={farmData.symptomCount || ""}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>질병 및 상태 체크 리스트</h3>
          <div className="mb-3">
            <span>1. 가축들이 열이 있습니까?</span>
            <div>
              <input
                type="checkbox"
                id="feverYes"
                name="feverYes"
                checked={farmData.fever === true}
                onChange={handleCheckboxChange}
              />{" "}
              <label htmlFor="feverYes">예</label>
              <input
                type="checkbox"
                id="feverNo"
                name="feverNo"
                checked={farmData.fever === false}
                onChange={handleCheckboxChange}
              />{" "}
              <label htmlFor="feverNo">아니요</label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="feverMean">
              평균 체온 (°C):
            </label>
            <input
              type="text"
              id="feverMean"
              name="feverMean"
              className="form-control"
              placeholder="예: 39°C"
              onChange={handleChange}
              value={farmData.feverMean || ""}
            />
          </div>

          <div className="mb-3">
            <span>2. 가축들이 기침을 하고 있습니까?</span>
            <div>
              <input
                type="checkbox"
                id="coughYes"
                name="coughYes"
                checked={farmData.cough === true}
                onChange={handleCheckboxChange}
              />{" "}
              <label htmlFor="coughYes">예</label>
              <input
                type="checkbox"
                id="coughNo"
                name="coughNo"
                checked={farmData.cough === false}
                onChange={handleCheckboxChange}
              />{" "}
              <label htmlFor="coughNo">아니요</label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="coughCount">
              기침 빈도:
            </label>
            <input
              type="text"
              id="coughCount"
              name="coughCount"
              className="form-control"
              placeholder="예: 하루 3회"
              onChange={handleChange}
              value={farmData.coughCount || ""}
            />
          </div>

          <div className="mb-3">
            <span>3. 설사 증상이 있습니까?</span>
            <div>
              <input
                type="checkbox"
                id="diarrheaYes"
                name="diarrheaYes"
                checked={farmData.diarrhea === true}
                onChange={handleCheckboxChange}
              />{" "}
              <label htmlFor="diarrheaYes">예</label>
              <input
                type="checkbox"
                id="diarrheaNo"
                name="diarrheaNo"
                checked={farmData.diarrhea === false}
                onChange={handleCheckboxChange}
              />{" "}
              <label htmlFor="diarrheaNo">아니요</label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="diarrheaCount">
              설사 횟수:
            </label>
            <input
              type="text"
              id="diarrheaCount"
              name="diarrheaCount"
              className="form-control"
              placeholder="예: 하루 5회"
              onChange={handleChange}
              value={farmData.diarrheaCount || ""}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>사육 환경</h3>
          <div className="mb-3">
            <label className="form-label" htmlFor="ventilation">
              환기 상태:
            </label>
            <input
              type="text"
              id="ventilation"
              name="ventilation"
              className="form-control"
              placeholder="환기 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.ventilation || ""}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="lampCondition">
              램프 상태:
            </label>
            <input
              type="text"
              id="lampCondition"
              name="lampCondition"
              className="form-control"
              placeholder="램프 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.lampCondition || ""}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="feedSupply">
              사료 공급 상태:
            </label>
            <input
              type="text"
              id="feedSupply"
              name="feedSupply"
              className="form-control"
              placeholder="사료 공급 상태를 입력하세요"
              onChange={handleChange}
              value={farmData.feedSupply || ""}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          제출
        </button>
      </div>
    </form>
  );
}

export default MedicalList;
