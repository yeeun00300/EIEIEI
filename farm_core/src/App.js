import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setNotLogin } from "./store/loginSlice/loginSlice";
import { useEffect } from "react";
import Main from "./pages/Main/Main";
import Intro from "./pages/Intro/Intro";
import Layout from "./pages/layout/Layout";
import EmailSignUp from "./components/emailLogin/EmailSignUp";
import EmailCheck from "./components/emailLogin/EmailCheck";
import Password from "./pages/Login/Password/Password";
import PasswordConfirm from "./pages/Login/Password/PasswordConfirm";
import SignUp from "./pages/Login/SignUp/SignUp";
import KakaoCallBack from "./pages/Login/SignUp/KakaoCallBack";
import RegularPayment from "./pages/RegularPayment/RegularPayment";
import MyLiveStock from "./components/MyLiveStock/MyLiveStock";
import AddLiveStock from "./components/addLiveStock/AddLiveStock";
import MyStockPage from "./components/MyStockPage/MyStockPage";
import MyStockDetails from "./pages/MyStockDetails/MyStockDetails";
import Community from "./pages/Community/Community";
import FreeboardPage from "./pages/Community/FreeboardPage";
import Livestock from "./pages/Community/Livestock";
import NewBoardPage from "./pages/Community/NewBoardPage";
import MyPage from "./pages/MyPage/MyPage";
import { fetchFarmList } from "./store/checkLoginSlice/checkLoginSlice";
import FirstPage from "./pages/FirstPage/FirstPage";
import RedirectToFirstFarm from "./pages/redirect/RedirectToFirstFarm ";
import Payment from "./pages/MyPage/Payment/Payment";

function App() {
  const dispatch = useDispatch();
  const { notLogin } = useSelector((state) => state.loginSlice);
  const { farmList, farmLoading } = useSelector(
    (state) => state.checkLoginSlice
  );

  useEffect(() => {
    const storedNotLogin = JSON.parse(localStorage.getItem("notLogin"));
    const storedEmail = localStorage.getItem("email");

    if (storedNotLogin !== null) {
      dispatch(setNotLogin(storedNotLogin));
    }

    if (storedEmail) {
      dispatch(setEmail(storedEmail));

      // Firebase에서 농장 리스트 가져오기
      const queryOptions = {
        conditions: [
          {
            field: "email",
            operator: "==",
            value: storedEmail,
          },
        ],
      };
      dispatch(fetchFarmList({ collectionName: "farm", queryOptions }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {notLogin ? (
          <Route path="/">
            <Route index element={<Intro />} />
            <Route path="EmailSignUp" element={<EmailSignUp />} />
            <Route path="verify-email" element={<EmailCheck />} />
            <Route path="password" element={<Password />} />
            <Route path="passwordconfirm" element={<PasswordConfirm />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="oauth" element={<KakaoCallBack />} />
            <Route path="RegularPayment" element={<RegularPayment />} />
          </Route>
        ) : (
          <Route path="/" element={<Layout />}>
            {/* 최초 로그인시 농장 추가하러 가기 */}
            <Route path="/FirstPage" element={<FirstPage />} />
            {/* farm 존재여부 확인 */}
            <Route
              path="/"
              element={
                <RedirectToFirstFarm
                  farmList={farmList}
                  farmLoading={farmLoading}
                />
              }
            />
            {/* 나의 축사(농장수 만큼 반복예정 path추가하기) */}
            <Route
              path="/My_Farm/:farmId"
              element={<Main farmList={farmList} />}
            />
            {/* 축사 데이터 */}
            <Route path="My_Farm_Details_Farm" element={<MyLiveStock />} />
            {/* 축사추가 */}
            <Route path="My_Farm_Add" element={<AddLiveStock />} />
            {/* 축사 정보 및 제어 */}
            <Route path="My_Farm_Details_Disease" element={<MyStockPage />} />
            {/* 가축 현황 및 관리 */}
            <Route path="My_Farm_Info_stock" element={<MyStockDetails />} />
            {/* 자유게시판 */}
            <Route path="My_Farm_Board_FreeBoard" element={<Community />} />
            <Route
              path="My_Farm_Board_FreeBoard/:id"
              element={<FreeboardPage />}
            />
            {/* 축산 관리 커뮤니티 */}
            <Route path="My_Farm_Board_Community" element={<Livestock />} />
            <Route
              path="My_Farm_Board_Community/:id"
              element={<FreeboardPage />}
            />
            {/* 커뮤니티 새 글 쓰기 */}
            <Route path="My_Farm_Board_NewBoard" element={<NewBoardPage />} />
            <Route
              path="/My_Farm_Board_NewBoard/:id"
              element={<NewBoardPage />}
            />
            {/* 마이페이지 */}
            <Route path="My_Farm_MyPage" element={<MyPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
