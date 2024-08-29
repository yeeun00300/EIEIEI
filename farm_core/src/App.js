import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Customer from "./pages/Customer/Customer";
import Admin from "./pages/Admin/Admin";
import SignUp from "./pages/Login/SignUp/SignUp";
import DashBoard from "./pages/DashBoard/DashBoard";
import MyPage from "./pages/MyPage/MyPage";
import Layout from "./pages/layout/Layout";
import Intro from "./pages/Intro/Intro";
import Community from "./pages/Community/Community";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setNotLogin } from "./store/loginSlice/loginSlice";
import UserInfo from "./pages/MyPage/UserInfo/UserInfo";
import MyCommunity from "./pages/MyPage/MyCommunity/MyCommunity";
import Question from "./pages/MyPage/Question/Question";
import Payment from "./pages/MyPage/Payment/Payment";
import FreeboardPage from "./pages/Community/FreeboardPage";
import NewBoardPage from "./pages/Community/NewBoardPage";
import Livestock from "./pages/Community/Livestock";
import KakaoCallBack from "./pages/Login/SignUp/KakaoCallBack";

function App() {
  const dispatch = useDispatch();
  const { notLogin } = useSelector((state) => state.loginSlice);

  // const apiKey = "9b43514a1ca3411aaada4dc62811db1d";

  // const startDate = "20200821";
  // const endDate = "20201003";

  // fetch(
  //   `/api/Agree_WS/webservices/StockRestService/getInspctDataList/${apiKey}/${startDate}/${endDate}`
  // )
  //   .then((data) => {
  //     return data.json();
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   });
  // const notLogin = true;
  // const notLogin = false;

  //  관리자 페이지 로그인 유뮤 - loginSlice => notLogin
  const logInOX = () => {
    if (notLogin) {
      dispatch(setNotLogin({ notLogin: false }));
    } else {
      dispatch(setNotLogin({ notLogin: true }));
    }
  };
  // const localStorageUserId = localStorage.getItem("id");

  return (
    // <div className="App">
    // Final Project!
    <BrowserRouter>
      <Routes>
        {notLogin ? (
          // 비로그인시
          <Route path="/">
            <Route index element={<Intro />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="oauth" element={<KakaoCallBack />} />
            {/* <Route path="Login" element={<Login />} /> */}
          </Route>
        ) : (
          // 로그인시
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="DashBoard" element={<DashBoard />} />
            {/* <Route path="LiveStock" element={<LiveStock />} /> */}
            <Route path="Customer" element={<Customer />} />
            <Route path="Community" element={<Community />} />
            <Route path="freeBoard" element={<FreeboardPage />} />
            <Route path="newBoard" element={<NewBoardPage />} />
            <Route path="livestockBoard" element={<Livestock />} />
            <Route path="MyPage" element={<MyPage />} />
            {/* <Route path="UserInfo" element={<UserInfo />} />
            <Route path="MyCommunity" element={<MyCommunity />} />
            <Route path="Question" element={<Question />} />
            <Route path="payment" element={<Payment />} /> */}
          </Route>
        )}
        <Route path="Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
