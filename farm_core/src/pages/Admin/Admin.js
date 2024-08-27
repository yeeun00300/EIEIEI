import React, { useEffect } from "react";
import styles from "./Admin.module.scss";
import { Divider } from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import Customer from "./../Customer/Customer";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";
import TreeViewComp from "../../components/TreeViewComp/TreeViewComp";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import AdminUser from "../../components/Admin-User/AdminUser";
import Weather from "../../api/Weather/Weather";
import Alarm from "../../components/Alarm/Alarm";
import AdminStock from "../../components/Admin-User/AdminStock";
import AdminBlackList from "../../components/Admin-User/AdminBlackList";
import CustomerManagement from "../../components/Admin-Customer/CustomerManagement";
import CustomerQnA from "../../components/Admin-Customer/CustomerQnA";
import CustomerDeclare from "../../components/Admin-Customer/CustomerDeclare";
import WeatherIssue from "../../components/Admin-Weather/WeatherIssue";

function Admin() {
  const MUI_X_PRODUCTS = [
    {
      id: "user",
      label: "회원 관리",
      children: [
        { id: "user-info", label: "회원 정보" },
        { id: "user-stock-info", label: "가축 이력" },
        { id: "user-blackList", label: "블랙 리스트" },
      ],
    },
    {
      id: "customer",
      label: "고객 센터 관리",
      children: [
        { id: "customer-management", label: "게시판 관리" },
        { id: "customer-QnA", label: "문의 사항" },
        { id: "customer-declare", label: "신고 게시물" },
      ],
    },
    {
      id: "weather",
      label: "기상 현황",
      children: [
        { id: "weather-condition", label: "날씨 현황" },
        { id: "weather-issue", label: "기상 특보" },
        { id: "weather-notice", label: "알림 목록" },
      ],
    },
    {
      id: "disease",
      label: "질병 현황",
      children: [
        { id: "disease-state", label: "질병 현황" },
        { id: "disease-issue", label: "질병 특보" },
        { id: "disease-consult", label: "문진표 목록" },
        { id: "disease-notice", label: "알림 목록" },
      ],
    },
    {
      id: "alarm",
      label: "알림",
      children: [
        { id: "alarm-weather", label: "날씨 알림" },
        { id: "alarm-disease", label: "질병 알림" },
      ],
    },
  ];
  // tabindex =0 ,-1, aria-selected="true"

  // 선택된 리스트(컴포넌트)의 id와 label 을 가져온다-----------------------
  const apiRef = useTreeViewApiRef();
  const [selectedItem, setSelectedItem] = React.useState({
    id: "",
    label: "",
  });

  const handleSelectedItemsChange = (event, itemId) => {
    if (itemId == null) {
      setSelectedItem(null);
    } else {
      setSelectedItem(apiRef.current.getItem(itemId));
    }
  };
  const itemId = selectedItem.id;
  // console.log(itemId);
  // ---------------------------------------------------------------------

  // 선택 리스트의 정보를 화면에 나타낸다 ----------------------------------
  const renderContent = () => {
    const weatherDescription = `< 특보 현황 >
   ○ 폭염경보: 부산, 경상남도(양산, 창원, 김해, 밀양, 의령, 함안, 창녕, 진주, 하동, 합천, 산청, 함양)
   ○ 폭염주의보: 울산, 경상남도(거창, 통영, 거제, 고성, 남해, 사천)
  
   <예비특보 현황>
   ○ 풍랑 예비특보(27일 오전(06~12시)): 남해동부바깥먼바다
   사용 예시`;
    const diseaseDescription = `
    [경기도청] 도민께서는 아프리카돼지열병 확산방지 및 조기 종식을 위하여 발생지역의 방문을 자제하여 주시기 바랍니다.
    `;
    const componentsMap = {
      "": " ",
      user: " ",
      customer: " ",
      weather: " ",
      disease: " ",
      alarm: " ",
      "user-info": <AdminUser />,
      "user-stock-info": <AdminStock />,
      "user-blackList": <AdminBlackList />,
      "customer-management": <CustomerManagement />,
      "customer-QnA": <CustomerQnA />,
      "customer-declare": <CustomerDeclare />,
      "weather-condition": <Weather />,
      "weather-issue": <WeatherIssue />,
      "weather-notice": <h1>알림 목록</h1>,
      "disease-state": <h1>질병 현황</h1>,
      "disease-issue": <h1>질병 특보</h1>,
      "disease-consult": <h1>문진표 목록</h1>,
      "disease-notice": <h1>알림 목록</h1>,
      "alarm-weather": (
        <Alarm title={"날씨 알림"} description={weatherDescription} />
      ),
      "alarm-disease": (
        <Alarm title={"질병 알림"} description={diseaseDescription} />
      ),
    };

    return componentsMap[itemId] || <h1>Default Content</h1>;
  };
  // --------------------------------------------------------------------

  useEffect(() => {}, [itemId]);
  return (
    <div className={styles.layout}>
      <Header title={"AdminPage test Server"} />
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <Box sx={{ minHeight: 352, minWidth: 200 }}>
            <RichTreeView
              items={MUI_X_PRODUCTS}
              apiRef={apiRef}
              selectedItems={selectedItem?.id ?? null}
              onSelectedItemsChange={handleSelectedItemsChange}
            />
          </Box>
          <Footer />
        </div>
        <div className={styles.container}>{renderContent()}</div>
      </div>
      {/* <div className={styles.AdminContainer}>
          <div className={styles.AdminNav}>
            <ul className={styles.AdminNavList}>
              <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <RichTreeView
                  items={MUI_X_PRODUCTS}  
                  apiRef={apiRef}
                  selectedItems={selectedItem?.id ?? null}
                  onSelectedItemsChange={handleSelectedItemsChange}
                />
              </Box>
            </ul>
          </div>
          <div>
            Wrapper
            {renderContent()}
          </div> */}
    </div>
  );
}

export default Admin;
