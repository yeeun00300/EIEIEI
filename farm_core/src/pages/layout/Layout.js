import React, { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import Header from "./header/Header";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
import MyFarmInfoPage from "../MyFarmInfo/MyFarmInfoPage";
import MyStockAddPage from "../MyStockAddPage/MyStockAddPage";
import { fetchLogin } from "../../store/checkLoginSlice/checkLoginSlice";

function Layout(props) {
  const dispatch = useDispatch();
  const { adminLogin } = useSelector((state) => state.loginSlice);

  // user nav list
  const USER_PRODUCTS = [
    {
      id: "My_Farm",
      label: "나의 축사",
      children: [
        { id: "My_Farm01", label: "축사 1(대전..)", route: "/My_Farm01" },
        { id: "My_Farm02", label: "축사 2(경기도..)", route: "/My_Farm02" },
        { id: "My_Farm03", label: "축사 3(대구...)", route: "/My_Farm03" },
      ],
    },
    {
      id: "My_Farm_Details",
      label: "축사 정보",
      children: [
        {
          id: "My_Farm_Details_Farm",
          label: "축사 현황",
          route: "/My_Farm_Details_Farm",
        },
        {
          id: "My_Farm_Add",
          label: "+ 축사 추가",
          route: "/My_Farm_Add",
        },
        {
          id: "My_Farm_Info_stock",
          label: "가축 상세 현황",
          route: "/My_Farm_Info_stock",
        },
        {
          id: "My_Farm_Add_stock",
          label: "+ 가축 추가",
          route: "/My_Farm_Add_stock",
        },

        {
          id: "My_Farm_Details_Disease",
          label: "축사 관리하기",
          route: "/My_Farm_Details_Disease",
        },
      ],
    },
    {
      id: "My_Farm_Board",
      label: "게시판",
      children: [
        {
          id: "My_Farm_Board_FreeBoard",
          label: "자유게시판",
          route: "/My_Farm_Board_FreeBoard",
        },
        {
          id: "My_Farm_Board_Community",
          label: "축산 관리 커뮤니티",
          route: "/My_Farm_Board_Community",
        },
      ],
    },
    {
      id: "My_Farm_MyPage",
      label: "마이페이지",
      route: "/My_Farm_MyPage",
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
      const item = apiRef.current.getItem(itemId);
      setSelectedItem(item);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItem && selectedItem.route) {
      console.log("Selected Item:", selectedItem);
      navigate(selectedItem.route);
    }
  }, [selectedItem, navigate]);

  // 사용자 정보 header에 넘겨주기----------------------------------------------
  const { checkLogin, isLoading } = useSelector(
    (state) => state.checkLoginSlice
  );
  const address = useSelector((state) => state.mapAddrSlice.address);
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (email) {
      const queryOptions = {
        conditions: [
          {
            field: "email",
            operator: "==",
            value: email,
          },
        ],
      };
      dispatch(fetchLogin({ collectionName: "users", queryOptions }));
    }
  }, [dispatch, email]);

  useEffect(() => {
    console.log("CheckLogin state:", checkLogin);
    console.log("Loading state:", isLoading);
  }, [checkLogin, isLoading]);

  if (isLoading) return <div>로딩중</div>;
  if (!checkLogin || Object.keys(checkLogin).length === 0)
    return <div>데이터가 없습니다</div>;
  // --------------------------------------------------------------------------------------

  return (
    <>
      {adminLogin ? (
        <Admin userInfo={checkLogin} address={address} />
      ) : (
        <div className={styles.layout}>
          <Header title={"FarmCore"} userInfo={checkLogin} address={address} />
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              <Box sx={{ minHeight: 352, minWidth: 180 }}>
                <RichTreeView
                  items={USER_PRODUCTS}
                  apiRef={apiRef}
                  selectedItems={selectedItem?.id ?? null}
                  onSelectedItemsChange={handleSelectedItemsChange}
                  // onItemClick={handleItemClick}
                />
              </Box>
              <Footer />
            </div>
            {/* {renderUserContent()} */}
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
