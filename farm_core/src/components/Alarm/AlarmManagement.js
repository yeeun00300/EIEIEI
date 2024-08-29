import React, { useState } from "react";
import Alarm from "./Alarm";
import Sort from "../../pages/Admin/components/Sort";

function AlarmManagement({}) {
  const [sort, setSort] = useState("전부");
  const SelectedDiseaseWeather = () => {
    const weatherDescription = `< 특보 현황 >
   ○ 폭염경보: 부산, 경상남도(양산, 창원, 김해, 밀양, 의령, 함안, 창녕, 진주, 하동, 합천, 산청, 함양)
   ○ 폭염주의보: 울산, 경상남도(거창, 통영, 거제, 고성, 남해, 사천)
  
   <예비특보 현황>
   ○ 풍랑 예비특보(27일 오전(06~12시)): 남해동부바깥먼바다
   사용 예시`;
    const diseaseDescription = `
    [경기도청] 도민께서는 아프리카돼지열병 확산방지 및 조기 종식을 위하여 발생지역의 방문을 자제하여 주시기 바랍니다.
    `;

    if (sort === "전부") {
      return (
        <>
          <h1> ⁎ 날씨 알림</h1>
          <Alarm title={"날씨 알림"} description={weatherDescription} />
          <h1> ⁎ 질병 알림</h1>
          <Alarm title={"질병 알림"} description={diseaseDescription} />
        </>
      );
    } else if (sort === "날씨") {
      return <Alarm title={"날씨 알림"} description={weatherDescription} />;
    } else if (sort === "질병") {
      return <Alarm title={"질병 알림"} description={diseaseDescription} />;
    }
  };
  return (
    <>
      <Sort
        title="알람 종류별 :"
        name="stock"
        setSort={setSort}
        sortArr={[
          { id: "All", value: "전부", htmlFor: "All" },
          { id: "Weather", value: "날씨", htmlFor: "Weather" },
          { id: "Disease", value: "질병", htmlFor: "Disease" },
        ]}
      />
      {SelectedDiseaseWeather()}
    </>
  );
}

export default AlarmManagement;
