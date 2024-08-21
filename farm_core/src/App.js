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
  return (
    // <div className="App">
    // Final Project!
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* 첫화면 */}
          <Route path="Main" element={<Main />}>
            <Route path="Login" element={<Login />}>
              <Route path="SignIn" element={<SignIn />}></Route>
              <Route path="SignUp" element={<SignUp />}></Route>
            </Route>
          </Route>
          {/* 메인화면 */}
          <Route path="DashBoard" element={<DashBoard />}>
            <Route path="Customer" element={<Customer />}></Route>
            <Route path="Admin" element={<Admin />}></Route>
            <Route path="MyPage" element={<MyPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
