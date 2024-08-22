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

function App() {
  const apiKey = "9b43514a1ca3411aaada4dc62811db1d";

  const startDate = "20200821";
  const endDate = "20201003";

  fetch(
    `/api/Agree_WS/webservices/StockRestService/getInspctDataList/${apiKey}/${startDate}/${endDate}`
  )
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      console.log(result);
    });
  const notLogin = true;
  return (
    // <div className="App">
    // Final Project!
    <BrowserRouter>
      <Routes>
        {notLogin ? (
          // 비로그인시
          <Route path="/" element={<Intro />}>
            <Route path="signup" element={<SignUp />} />
          </Route>
        ) : (
          // 로그인시
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="DashBoard" element={<DashBoard />} />
            <Route path="Customer" element={<Customer />} />
            <Route path="MyPage" element={<MyPage />} />
            <Route path="Admin" element={<Admin />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
