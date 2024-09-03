import React, { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Nav from "./nav/Nav";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";
import TreeViewComp from "../../components/TreeViewComp/TreeViewComp";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAdminLogin } from "../../store/loginSlice/loginSlice";
import { Box } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import MyPage from "../MyPage/MyPage";
import Community from "../Community/Community";
import FreeboardPage from "../Community/FreeboardPage";
import Admin from "../Admin/Admin";
import Weather from "../../api/Weather/Weather";
import MyLiveStock from "../../components/MyLiveStock/MyLiveStock";
import Livestock from "../Community/Livestock";
import AddLiveStock from "../../components/addLiveStock/AddLiveStock";
import DiseaseIssueItem from "../../components/Admin-Disease/DiseaseIssueItem/DiseaseIssueItem";
import DiseaseState from "../../components/Admin-Disease/DiseaseState";
import DiseaseMap from "../../components/DiseaseStatus/DiseaseMap";
import CurrentMarker from "../../components/DiseaseStatus/CurrentMarker";
import { setMapAddr } from "../../store/addressSlice/mapAddrSlice";
import DashBoard from "../DashBoard/DashBoard";

function Layout(props) {
  const dispatch = useDispatch();
  const { adminLogin } = useSelector((state) => state.loginSlice);

  // user nav list
  const USER_PRODUCTS = [
    {
      id: "My_Farm",
      label: "나의 축사",
      children: [
        { id: "My_Farm01", label: "축사 1(대전..)" },
        { id: "My_Farm02", label: "축사 2(경기도..)" },
        { id: "My_Farm03", label: "축사 3(대구...)" },
      ],
    },
    {
      id: "My_Farm_Details",
      label: "축사 정보",
      children: [
        { id: "My_Farm_Details_Farm", label: "축사 현황" },
        { id: "My_Farm_Add", label: "+ 축사 추가" },
        { id: "My_Farm_Info_stock", label: "가축 상세 현황" },
        { id: "My_Farm_Add_stock", label: "+ 가축 추가" },

        { id: "My_Farm_Details_Disease", label: "축사 관리하기" },
      ],
    },
    {
      id: "My_Farm_Board",
      label: "게시판",
      children: [
        { id: "My_Farm_Board_FreeBoard", label: "자유게시판" },
        { id: "My_Farm_Board_Community", label: "축산 관리 커뮤니티" },
      ],
    },
    {
      id: "My_Farm_MyPage",
      label: "마이페이지",
    },
  ];

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

  // --------------------------------------------------------------------
  // user nav component
  const renderUserContent = () => {
    const componentsMap = {
      // "": "",
      // My_Farm: <Outlet />,
      // My_Farm_Details: " ",
      "": <DashBoard />,
      My_Farm: <DashBoard />,
      My_Farm_Details: <h1>목장 현황</h1>,
      // My_Farm_Info: " ",
      "": <MyLiveStock />,
      My_Farm: <MyLiveStock />,
      My_Farm_Info: <h1>목장 현황</h1>,
      My_Farm_Board: <Community />,
      My_Farm_Board: "",
      My_Farm_MyPage: <MyPage />,
      My_Farm01: <DashBoard />,
      My_Farm02: <h1></h1>,
      My_Farm03: <h1>나의 목장 03</h1>,

      My_Farm_Details_Farm: <MyLiveStock />,
      // My_Farm_Details_CCTV: <h1>CCTV</h1>,
      My_Farm_Details_Disease: (
        <div className="page">
          <DiseaseState />
          {/* <DiseaseMap /> */}
          <CurrentMarker />
        </div>
      ),
      // My_Farm_Info_Info: <h1>상세정보</h1>,
      My_Farm_Add: <AddLiveStock />,
      My_Farm_Board_Total: (
        <h1>
          <Community />
        </h1>
      ),
      My_Farm_Board_FreeBoard: <Community />,
      My_Farm_Board_Community: <Livestock />,
      // My_Farm_MyPage_InfoEdit: <h1>회원정보/수정</h1>,
      // My_Farm_MyPage_MyBoard: <h1>내 게시글</h1>,
      // My_Farm_MyPage_Inquire: <h1>1:1문의하기</h1>,
      // My_Farm_MyPage_Payment: <h1>결제 내역</h1>,
    };

    return componentsMap[itemId];
    // return componentsMap[itemId] || <h1>Default Content</h1>;
  };
  // --------------------------------------------------------------------

  return (
    <>
      {adminLogin ? (
        // <div className={styles.layout}>
        //   <Header title={"AdminPage"} />
        //   <div className={styles.wrapper}>
        // {/* <TreeViewComp
        //   contents={MUI_X_PRODUCTS}
        //   renderContent={renderContent}
        // /> */}
        //     {/* <div className={styles.nav}>
        //       <Box sx={{ minHeight: 352, minWidth: 250 }}>
        //         <RichTreeView
        //           items={MUI_X_PRODUCTS}
        //           apiRef={apiRef}
        //           selectedItems={selectedItem?.id ?? null}
        //           onSelectedItemsChange={handleSelectedItemsChange}
        //         />
        //       </Box>
        //       <Footer />
        //     </div>
        //     {renderContent()}
        //   </div>
        // </div> */}
        <Admin />
      ) : (
        <div className={styles.layout}>
          <Header title={"FarmCore"} />
          <div className={styles.wrapper}>
            {/* <Nav contents={USER_PRODUCTS} renderContent={renderUserContent} /> */}
            <div className={styles.nav}>
              <Box sx={{ minHeight: 352, minWidth: 180 }}>
                <RichTreeView
                  items={USER_PRODUCTS}
                  apiRef={apiRef}
                  selectedItems={selectedItem?.id ?? null}
                  onSelectedItemsChange={handleSelectedItemsChange}
                />
              </Box>
              <Footer />
            </div>
            {renderUserContent()}
            {/* <Outlet /> */}
            {/* <Weather /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
