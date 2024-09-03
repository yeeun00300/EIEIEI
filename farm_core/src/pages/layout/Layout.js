import React, { useEffect } from "react";
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
import { fetchLocationAndAddress } from "../../components/DiseaseStatus/locationService";
import { setMapAddr } from "../../store/addressSlice/mapAddrSlice";
const { kakao } = window;

function Layout(props) {
  const dispatch = useDispatch();
  const { adminLogin } = useSelector((state) => state.loginSlice);
  useEffect(() => {
    fetchLocationAndAddress(kakao, dispatch, setMapAddr);
  }, [dispatch]);

  // amin nav list
  // const MUI_X_PRODUCTS = [
  //   {
  //     id: "user",
  //     label: "회원 관리",
  //     children: [
  //       { id: "user-info", label: "회원 정보" },
  //       { id: "user-stock-info", label: "가축 이력" },
  //       { id: "user-blackList", label: "블랙 리스트" },
  //     ],
  //   },
  //   {
  //     id: "customer",
  //     label: "고객 센터 관리",
  //     children: [
  //       { id: "customer-management", label: "게시판 관리" },
  //       { id: "customer-QnA", label: "문의 사항" },
  //       { id: "customer-declare", label: "신고 게시물" },
  //     ],
  //   },
  //   {
  //     id: "weather",
  //     label: "기상 현황",
  //     children: [
  //       { id: "weather-condition", label: "날씨 현황" },
  //       { id: "weather-issue", label: "기상 특보" },
  //       { id: "weather-notice", label: "알림 목록" },
  //     ],
  //   },
  //   {
  //     id: "disease",
  //     label: "질병 현황",
  //     children: [
  //       { id: "disease-state", label: "질병 현황" },
  //       { id: "disease-issue", label: "질병 특보" },
  //       { id: "disease-consult", label: "문진표 목록" },
  //       { id: "disease-notice", label: "알림 목록" },
  //     ],
  //   },
  //   {
  //     id: "alarm",
  //     label: "알림",
  //     children: [
  //       { id: "alarm-weather", label: "날씨 알림" },
  //       { id: "alarm-disease", label: "질병 알림" },
  //     ],
  //   },
  // ];

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
        { id: "My_Farm_Details_stock", label: "가축 상세 현황" },
        { id: "My_Farm_Add_stock", label: "+ 가축 추가" },

        // { id: "My_Farm_Details_CCTV", label: "CCTV" },
        { id: "My_Farm_Details_Disease", label: "축사 관리하기" },
        // { id: "My_Farm_Details_Info", label: "상세정보" },
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
      // children: [
      //   { id: "My_Farm_MyPage_InfoEdit", label: "회원정보/수정" },
      //   { id: "My_Farm_MyPage_MyBoard", label: "내 게시글" },
      //   { id: "My_Farm_MyPage_Inquire", label: "1:1문의하기" },
      //   { id: "My_Farm_MyPage_Payment", label: "결제내역" },
      // ],
    },
  ];
  // const adminLogin = true;
  // const adminLogin = false;

  //  관리자 페이지 로그인 유뮤 - loginSlice => adminLogin
  // const transAdminLogin = () => {
  //   if (adminLogin) {
  //     dispatch(setAdminLogin({ adminLogin: true }));
  //   } else {
  //     dispatch(setAdminLogin({ adminLogin: false }));
  //   }
  // };

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
  // admin nav component
  // const renderContent = () => {
  //   const componentsMap = {
  //     "": " ",
  //     user: " ",
  //     customer: " ",
  //     weather: " ",
  //     disease: " ",
  //     alarm: " ",
  //     "user-info": <h1>회원정보</h1>,
  //     "user-stock-info": <h1>가축 이력</h1>,
  //     "user-blackList": <h1>블랙 리스트</h1>,
  //     "customer-management": <h1>게시판 관리</h1>,
  //     "customer-QnA": <h1>문의 사항</h1>,
  //     "customer-declare": <h1>신고 게시물</h1>,
  //     "weather-condition": <h1>날씨 현황</h1>,
  //     "weather-issue": <h1>기상 특보</h1>,
  //     "weather-notice": <h1>알림 목록</h1>,
  //     "disease-state": <h1>질병 현황</h1>,
  //     "disease-issue": <h1>질병 특보</h1>,
  //     "disease-consult": <h1>문진표 목록</h1>,
  //     "disease-notice": <h1>알림 목록</h1>,
  //     "alarm-weather": <h1>날씨 알림</h1>,
  //     "alarm-disease": <h1>질병 알림</h1>,
  //   };

  //   return componentsMap[itemId] || <h1>Default Content</h1>;
  // };
  // --------------------------------------------------------------------
  // user nav component
  const renderUserContent = () => {
    const componentsMap = {
      // "": "",
      // My_Farm: <Outlet />,
      // My_Farm_Details: " ",
      "": <MyLiveStock />,
      My_Farm: <MyLiveStock />,
      My_Farm_Details: <h1>목장 현황</h1>,
      My_Farm_Board: <Community />,
      My_Farm_Board: "",
      My_Farm_MyPage: <MyPage />,
      My_Farm01: <MyLiveStock />,
      My_Farm02: <h1></h1>,
      My_Farm03: <h1>나의 목장 03</h1>,

      My_Farm_Details_Farm: <h1>목장 현황</h1>,
      // My_Farm_Details_CCTV: <h1>CCTV</h1>,
      My_Farm_Details_Disease: (
        <div className="page">
          <DiseaseState />
          {/* <DiseaseMap /> */}
          <CurrentMarker />
        </div>
      ),
      // My_Farm_Details_Info: <h1>상세정보</h1>,
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
