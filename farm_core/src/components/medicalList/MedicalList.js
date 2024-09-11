import React from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../store/medicalSlice/medicalSlice";

function MedicalList(props) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  return (
    <div>
      <h2>축사 문진표</h2>

      <div class="form-section">
        <h3>의뢰인 정보</h3>
        <div class="field-group">
          <label for="name">성명:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="의뢰인 성명을 입력하세요"
          />
        </div>
        <div class="field-group">
          <label for="phone">전화번호:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="의뢰인 전화번호를 입력하세요"
          />
        </div>
        <div class="field-group">
          <label for="address">주소:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="축사 주소를 입력하세요"
          />
        </div>
      </div>

      <div class="form-section">
        <h3>축사 정보</h3>
        <div class="field-group">
          <label for="barnType">축사 유형:</label>
          <input
            type="text"
            id="barnType"
            name="barnType"
            placeholder="예: 소 축사, 돼지 축사"
          />
        </div>
        <div class="field-group">
          <label for="numberOfAnimals">가축 수:</label>
          <input
            type="text"
            id="numberOfAnimals"
            name="numberOfAnimals"
            placeholder="예: 50마리"
          />
        </div>
      </div>

      <div class="form-section">
        <h3>가축 건강 상태</h3>
        <div class="field-group">
          <label for="symptoms">공통 증상:</label>
          <textarea
            id="symptoms"
            name="symptoms"
            placeholder="가축들이 보이는 공통 증상을 기재하세요"
          ></textarea>
        </div>
        <div class="field-group">
          <label for="affectedAnimals">영향을 받은 가축 수:</label>
          <input
            type="text"
            id="affectedAnimals"
            name="affectedAnimals"
            placeholder="영향을 받은 가축의 수를 입력하세요"
          />
        </div>
      </div>

      <div class="form-section">
        <h3>질병 및 상태 체크 리스트</h3>
        <div class="field-group">
          <span>1. 가축들이 열이 있습니까?</span>
          <span>
            <input type="checkbox" /> 예 <input type="checkbox" /> 아니요
          </span>
        </div>
        <div class="field-group">
          <label for="temperature">평균 체온 (°C):</label>
          <input
            type="text"
            id="temperature"
            name="temperature"
            placeholder="예: 39°C"
          />
        </div>

        <div class="field-group">
          <span>2. 가축들이 기침을 하고 있습니까?</span>
          <span>
            <input type="checkbox" /> 예 <input type="checkbox" /> 아니요
          </span>
        </div>
        <div class="field-group">
          <label for="coughFrequency">기침 빈도:</label>
          <input
            type="text"
            id="coughFrequency"
            name="coughFrequency"
            placeholder="예: 하루 3회"
          />
        </div>

        <div class="field-group">
          <span>3. 설사 증상이 있습니까?</span>
          <span>
            <input type="checkbox" /> 예 <input type="checkbox" /> 아니요
          </span>
        </div>
        <div class="field-group">
          <label for="diarrheaFrequency">설사 횟수:</label>
          <input
            type="text"
            id="diarrheaFrequency"
            name="diarrheaFrequency"
            placeholder="예: 하루 5회"
          />
        </div>
      </div>

      <div class="form-section">
        <h3>사육 환경</h3>
        <div class="field-group">
          <label for="ventilation">환기 상태:</label>
          <input
            type="text"
            id="ventilation"
            name="ventilation"
            placeholder="환기 상태를 입력하세요"
          />
        </div>
        <div class="field-group">
          <label for="lighting">조명 상태:</label>
          <input
            type="text"
            id="lighting"
            name="lighting"
            placeholder="조명 상태를 입력하세요"
          />
        </div>
        <div class="field-group">
          <label for="feed">사료 공급 상태:</label>
          <input
            type="text"
            id="feed"
            name="feed"
            placeholder="사료 공급 상태를 입력하세요"
          />
        </div>
      </div>

      <button type="submit">제출</button>
    </div>
  );
}

export default MedicalList;
