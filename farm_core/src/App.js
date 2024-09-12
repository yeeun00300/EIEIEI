import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import Main from "./pages/Main/Main";
import SignUp from "./pages/Login/SignUp/SignUp";
import MyPage from "./pages/MyPage/MyPage";
import Layout from "./pages/layout/Layout";
import Intro from "./pages/Intro/Intro";
import Community from "./pages/Community/Community";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setEmail, setNotLogin } from "./store/loginSlice/loginSlice";
import FreeboardPage from "./pages/Community/FreeboardPage";
import Livestock from "./pages/Community/Livestock";
import KakaoCallBack from "./pages/Login/SignUp/KakaoCallBack";
import EmailSignUp from "./components/emailLogin/EmailSignUp";
import { useEffect, useState } from "react";
import RegularPayment from "./pages/RegularPayment/RegularPayment";
import MyLiveStock from "./components/MyLiveStock/MyLiveStock";
import AddLiveStock from "./components/addLiveStock/AddLiveStock";
import MyStockAddPage from "./pages/MyStockAddPage/MyStockAddPage";
import EmailCheck from "./components/emailLogin/EmailCheck";
import MyStockPage from "./components/MyStockPage/MyStockPage";

function App() {
  const dispatch = useDispatch();
  const { notLogin } = useSelector((state) => state.loginSlice);

  useEffect(() => {
    const storedNotLogin = JSON.parse(localStorage.getItem("notLogin"));
    const storedEmail = localStorage.getItem("email");

    if (storedNotLogin !== null) {
      dispatch(setNotLogin(storedNotLogin));
    }

    if (storedEmail) {
      dispatch(setEmail(storedEmail));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {notLogin ? (
          // 비로그인시
          <Route path="/">
            <Route index element={<Intro />} />
            <Route path="EmailSignUp" element={<EmailSignUp />} />
            <Route path="verify-email" element={<EmailCheck />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="oauth" element={<KakaoCallBack />} />
            <Route path="RegularPayment" element={<RegularPayment />} />
          </Route>
        ) : (
          // 로그인시
          <Route path="/" element={<Layout />}>
            {/* index element 최초 로그인시 보여줄 예시화면 만들기 */}
            <Route index element={<Main />} />
            {/* 나의 축사(농장수 만큼 반복예정 path추가하기) */}
            <Route path="/My_Farm/:farmId" element={<Main />} />
            {/* 축사현황 */}
            <Route path="My_Farm_Details_Farm" element={<MyLiveStock />} />
            {/* 축사추가 */}
            <Route path="My_Farm_Add" element={<AddLiveStock />} />
            {/* 가축 상세 현황 */}
            {/* <Route path="My_Farm_Info_stock" element={<AddLiveStock />} /> */}
            {/* 가축 추가 */}
            <Route path="My_Farm_Add_stock" element={<MyStockAddPage />} />
            {/* 축사 관리하기 */}
            <Route path="My_Farm_Details_Disease" element={<MyStockPage />} />
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
            {/* 마이페이지 */}

            <Route path="My_Farm_MyPage" element={<MyPage />} />
            {/* 결제(라우트 옮길 예정) */}
            {/* <Route path="payment" element={<Payment />} /> */}
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
