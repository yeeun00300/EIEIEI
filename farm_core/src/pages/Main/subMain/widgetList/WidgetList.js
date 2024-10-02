import React from "react";
import Checkbox from "@mui/joy/Checkbox";

function WidgetList({ setWidgetList, widgetList, setFetchLayoutCount }) {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setWidgetList((prevList) => {
      if (checked) {
        // 체크된 경우 값 추가
        const resultArr = [...prevList, value];
        setFetchLayoutCount(resultArr.length);
        return resultArr;
      } else {
        // 체크 해제된 경우 값 제거
        const resultArr = prevList?.filter((item) => item !== value);
        setFetchLayoutCount(resultArr.length);
        return resultArr;
      }
    });
  };

  // console.log(widgetList);
  return (
    <>
      {/* {widgetList ? (
        <> */}
      {/* <Checkbox
        color="primary"
        label="축사이름"
        value="1"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "1") == "1" ? true : false}
      /> */}
      <Checkbox
        color="primary"
        label="백신정보"
        value="2"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "2") == "2" ? true : false}
      />
      <Checkbox
        color="primary"
        label="가축별 총 데이터"
        value="3"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "3") == "3" ? true : false}
      />
      <Checkbox
        color="primary"
        label="물 사료 소비량"
        value="4"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "4") == "4" ? true : false}
      />
      <Checkbox
        color="primary"
        label="질병 지도 데이터"
        value="5"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "5") == "5" ? true : false}
      />
      <Checkbox
        color="primary"
        label="온도 조절"
        value="6"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "6") == "6" ? true : false}
      />
      <Checkbox
        color="primary"
        label="습도 조절"
        value="7"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "7") == "7" ? true : false}
      />
      <Checkbox
        color="primary"
        label="조도 조절"
        value="8"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "8") == "8" ? true : false}
      />
      <Checkbox
        color="primary"
        label="CO2 조절"
        value="9"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={widgetList.filter((item) => item == "9") == "9" ? true : false}
      />
      <Checkbox
        color="primary"
        label="NH3 조절"
        value="10"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={
          widgetList.filter((item) => item == "10") == "10" ? true : false
        }
      />
      <Checkbox
        color="primary"
        label="5일 날씨"
        value="11"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={
          widgetList.filter((item) => item == "11") == "11" ? true : false
        }
      />
      <Checkbox
        color="primary"
        label="현재 농장 가축 수"
        value="12"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={
          widgetList.filter((item) => item == "12") == "12" ? true : false
        }
      />
      <Checkbox
        color="primary"
        label="발정상태&생산량"
        value="13"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={
          widgetList.filter((item) => item == "13") == "13" ? true : false
        }
      />
      <Checkbox
        color="primary"
        label="건강 상태"
        value="14"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={
          widgetList.filter((item) => item == "14") == "14" ? true : false
        }
      />
      <Checkbox
        color="primary"
        label="폐사율"
        value="15"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={
          widgetList.filter((item) => item == "15") == "15" ? true : false
        }
      />
      <Checkbox
        color="primary"
        label="cctv"
        value="16"
        variant="outlined"
        onChange={handleCheckboxChange}
        checked={
          widgetList.filter((item) => item == "16") == "16" ? true : false
        }
      />

      {/* <div> */}
      {/* 온도 조절 */}
      {/* {selectedWidgets.temperature && <TempPiNeedleWidget />} */}
      {/* 습도 조절 */}
      {/* {selectedWidgets.humidity && <HumidPiChartWidget />} */}
      {/* 조도 조절 */}
      {/* {selectedWidgets.light && <LightPiChartWidget />} */}
      {/* CO2 조절 */}
      {/* {selectedWidgets.co2 && <CO2PiChartWidget />} */}
      {/* NH3 조절 */}
      {/* {selectedWidgets.nh3 && <NH3PiChartWidget />} */}
      {/* </div> */}
    </>
  );
}

export default WidgetList;
