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
import Main from "../Main/Main";

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
      "": <Main />,
      My_Farm: <Main />,
      My_Farm_Details: <h1>목장 현황</h1>,
      // My_Farm_Info: " ",
      My_Farm_Info: <h1>목장 현황</h1>,
      My_Farm_Board: <Community />,
      My_Farm_Board: "",
      My_Farm_MyPage: <MyPage />,
      My_Farm01: <DashBoard />,
      My_Farm02: <h1></h1>,
      My_Farm03: <h1>나의 목장 03</h1>,
      My_Farm_Details_Farm: <MyLiveStock />,
      My_Farm_Details_Disease: (
        <div className="page">
          <DiseaseState />
          {/* <DiseaseMap /> */}
          <CurrentMarker />
        </div>
      ),
      My_Farm_Add: <AddLiveStock />,
      My_Farm_Board_Total: (
        <h1>
          <Community />
        </h1>
      ),
      My_Farm_Board_FreeBoard: <Community />,
      My_Farm_Board_Community: <Livestock />,
    };

    return componentsMap[itemId];
  };
  // --------------------------------------------------------------------

  return (
    <>
      {adminLogin ? (
        <Admin />
      ) : (
        <div className={styles.layout}>
          <Header title={"FarmCore"} />
          <div className={styles.wrapper}>
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
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
