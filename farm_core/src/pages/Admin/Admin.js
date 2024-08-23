import React, { useEffect } from "react";
import styles from "./Admin.module.scss";
import { Divider } from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import Customer from "./../Customer/Customer";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";

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
      "user-info": <h1>회원정보</h1>,
      "user-stock-info": <h1>가축 이력</h1>,
      "user-blackList": <h1>블랙 리스트</h1>,
      "customer-management": <h1>게시판 관리</h1>,
      "customer-QnA": <h1>문의 사항</h1>,
      "customer-declare": <h1>신고 게시물</h1>,
      "weather-condition": <h1>날씨 현황</h1>,
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
    <div className={styles.AdminPage}>
      <div className={styles.AdminTitle}>
        <h1>관리자페이지</h1>
        <button>홈페이지로 돌아가기</button>
      </div>
      <div className={styles.AdminContainer}>
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
        <div className={styles.AdminWrapper}>
          Wrapper
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Admin;
