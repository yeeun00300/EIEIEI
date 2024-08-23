import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Customer from "./pages/Customer/Customer";
import Admin from "./pages/Admin/Admin";
import SignIn from "./pages/Login/SignIn/SignIn";
import SignUp from "./pages/Login/SignUp/SignUp";
import DashBoard from "./pages/DashBoard/DashBoard";
import MyPage from "./pages/MyPage/MyPage";
import Layout from "./pages/layout/Layout";
import Intro from "./pages/Intro/Intro";
import Community from "./pages/Community/Community";
import FreeboardPage from "./pages/Community/FreeboardPage";

function App() {
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
  const notLogin = false;
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
          </Route>
        ) : (
          // 로그인시
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="DashBoard" element={<DashBoard />} />
            <Route path="Customer" element={<Customer />} />
            <Route path="Admin" element={<Admin />} />
            <Route path="Community">
              <Route index element={<Community />} />
              <Route path="freeboard" element={<FreeboardPage />} />
            </Route>
            <Route path="MyPage" element={<MyPage />} />
            <Route path="UserInfo" element={<UserInfo />} />
            <Route path="my-community" element={<MyCommunity />} />
            <Route path="question" element={<Question />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        )}
        <Route path="Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
