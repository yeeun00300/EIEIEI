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
import AdminStock from "../../components/Admin-Stock/AdminStock";
import AdminBlackList from "../../components/Admin-BlackList/AdminBlackList";
import Weather from "../../api/Weather/Weather";

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
      "customer-management": <h1>게시판 관리</h1>,
      "customer-QnA": <h1>문의 사항</h1>,
      "customer-declare": <h1>신고 게시물</h1>,
      "weather-condition": <Weather />,
      "weather-issue": <h1>기상 특보</h1>,
      "weather-notice": <h1>알림 목록</h1>,
      "disease-state": <h1>질병 현황</h1>,
      "disease-issue": <h1>질병 특보</h1>,
      "disease-consult": <h1>문진표 목록</h1>,
      "disease-notice": <h1>알림 목록</h1>,
      "alarm-weather": <h1>날씨 알림</h1>,
      "alarm-disease": <h1>질병 알림</h1>,
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
