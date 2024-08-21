import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Customer from "./pages/Customer/Customer";
import Admin from "./pages/Admin/Admin";
import SignIn from "./pages/Login/SignIn/SignIn";
import SignUp from "./pages/Login/SignUp/SignUp";

function App() {
  return (
    // <div className="App">
    // Final Project!
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />}></Route>
          <Route path="Login" element={<Login />}>
            <Route path="SignIn" element={<SignIn />}></Route>
            <Route path="SignUp" element={<SignUp />}></Route>
          </Route>
          <Route path="Customer" element={<Customer />}></Route>
          <Route path="Admin" element={<Admin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
