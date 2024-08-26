import React from "react";
import styles from "./Alarm.module.scss";

function Alarm({ title }) {
  return (
    <div>
      <h1>
        {title}
        <span>2024-08-27 00:00:00</span>
      </h1>
      <h3>
        {`< 특보 현황 >
   ○ 폭염경보: 부산, 경상남도(양산, 창원, 김해, 밀양, 의령, 함안, 창녕, 진주, 하동, 합천, 산청, 함양)
   ○ 폭염주의보: 울산, 경상남도(거창, 통영, 거제, 고성, 남해, 사천)

   <예비특보 현황>
   ○ 풍랑 예비특보(27일 오전(06~12시)): 남해동부바깥먼바다
   사용 예시`}
      </h3>
    </div>
  );
}

export default Alarm;
