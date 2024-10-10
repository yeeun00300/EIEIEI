import React, { useEffect, useState } from "react";
import { addMessage, fetchFarmDocumentByEmail } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addField } from "../../store/addLiveStockSlice/addLiveStockSlice";
import kroDate from "../../utils/korDate";

const CommonFields = () => (
  <>
    <div className="form-group">
      <label htmlFor="farmId">축사 번호</label>
      <input type="text" id="farmId" name="farmId" required />
    </div>
    <div className="form-group">
      <label htmlFor="stockId">가축 개체번호</label>
      <input type="text" id="stockId" name="stockId" required />
    </div>
    <div className="form-group">
      <label htmlFor="farmAdress">가축 주소</label>
      <input type="text" id="farmAdress" name="farmAdress" required />
    </div>
    <div className="form-group">
      <label htmlFor="incomingDate">입고 날짜</label>
      <input type="date" id="incomingDate" name="incomingDate" required />
    </div>
    <div className="form-group">
      <label htmlFor="sexual">성별</label>
      <select id="sexual" name="sexual" required>
        <option value="male">수컷</option>
        <option value="female">암컷</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="size">크기</label>
      <input type="text" id="size" name="size" />
    </div>
    <div className="form-group">
      <label htmlFor="weight">무게</label>
      <input type="text" id="weight" name="weight" />
    </div>
    <div className="form-group">
      <label htmlFor="birthDate">출생 날짜</label>
      <input type="date" id="birthDate" name="birthDate" />
    </div>
    <div className="form-group">
      <label htmlFor="feed">섭취량</label>
      <input type="text" id="feed" name="feed" />
    </div>
    <div className="form-group">
      <label htmlFor="drink">수분 섭취량</label>
      <input type="text" id="drink" name="drink" />
    </div>
    <div className="form-group">
      <label htmlFor="activity">활동량</label>
      <input type="text" id="activity" name="activity" />
    </div>
    <div className="form-group">
      <label htmlFor="temp">온도</label>
      <input type="text" id="temp" name="temp" />
    </div>
  </>
);

// 특정 가축 종류별 필드 컴포넌트
const SpecificFields = ({ animalType }) => {
  switch (animalType) {
    case "cattle":
      return (
        <>
          <div className="form-group">
            <label htmlFor="breedCount">출산 횟수</label>
            <input type="number" id="breedCount" name="breedCount" />
          </div>
          <div className="form-group">
            <label htmlFor="breedDate">출산일</label>
            <input type="date" id="breedDate" name="breedDate" />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">출사 예정일</label>
            <input type="date" id="dueDate" name="dueDate" />
          </div>
        </>
      );
    case "dairy":
      return (
        <div className="form-group">
          <label htmlFor="milkProduction">우유 생산량</label>
          <input type="text" id="milkProduction" name="milkProduction" />
        </div>
      );
    case "pork":
      return (
        <div className="form-group">
          <label htmlFor="growthRate">성장 속도</label>
          <input type="text" id="growthRate" name="growthRate" />
        </div>
      );
    case "poultry":
      return (
        <div className="form-group">
          <label htmlFor="eggProduction">산란량</label>
          <input type="text" id="eggProduction" name="eggProduction" />
        </div>
      );
    default:
      return null;
  }
};

function StockCondition(props) {
  const [animalType, setAnimalType] = useState("");
  const dispatch = useDispatch();
  const farmData = useSelector((state) => state.AddLiveStockSlice);

  const [docId, setDocId] = useState(""); // docId 상태 추가
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
      // 폼 데이터와 하위 컬렉션 데이터 준비
      const subCollections = {
        farmCureList: [],
        ruinInfo: {}, // ruinInfo 데이터 준비
        vaccine: [
          {
            vaccineType: farmData.vaccine, // farmData에서 백신 정보 가져오기
            vaccineDate: kroDate(),
          },
        ], // vaccine 데이터 준비
        disease: [
          {
            diseaseType: farmData.diseaseType, // farmData에서 질병 정보 가져오기
            diagnosisDate: farmData.diagnosisDate, // 여기에 실제 진단일 추가
            cure: "",
          },
        ], // disease 데이터 준비
      };

      await addMessage("farm", docId, "vaccine", subCollections.vaccine);
      await addMessage("farm", docId, "disease", subCollections.disease);

      alert("데이터가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("데이터 저장 실패:", error.message || error);
      alert("데이터 저장에 실패했습니다.");
    }
  };

  return (
    <form id="surveyForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="animalType">가축 종류</label>
        <select
          id="animalType"
          name="animalType"
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
        >
          <option value="">선택하세요</option>
          <option value="cattle">한우</option>
          <option value="dairy">낙농</option>
          <option value="pork">양돈</option>
          <option value="poultry">양계</option>
        </select>
      </div>

      <CommonFields />

      <div className="form-group">
        <label htmlFor="isolationDate">격리 상태</label>
        <input type="date" id="isolationDate" name="isolationDate" />
      </div>
      <div className="form-group">
        <label htmlFor="mating">발정기 여부</label>
        <select id="mating" name="mating">
          <option value="true">예</option>
          <option value="false">아니오</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="pregnantDate">임신 일자</label>
        <input type="date" id="pregnantDate" name="pregnantDate" />
      </div>
      <div className="form-group">
        <label htmlFor="vaccine">백신 접종 (형식: 백신명(접종일))</label>
        <input
          type="text"
          id="vaccine"
          name="vaccine"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="diseaseType">
          질병 및 치료 (형식: 질병명(진단일): 치료일)
        </label>
        <input
          type="text"
          id="diseaseType"
          name="diseaseType"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="diagnosisDate">진단일</label>
        <input
          type="date"
          id="diagnosisDate"
          name="diagnosisDate"
          onChange={handleChange}
        />
      </div>

      <SpecificFields animalType={animalType} />

      <button type="submit">제출</button>
    </form>
  );
}

export default StockCondition;
