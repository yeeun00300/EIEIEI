import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

function LoginPage(props) {
  return (
    <div>
      <h1>로그인</h1>
      <Login />
      <p>
        계정이 없습니까? &nbsp; <Link to={"/SignUp"}>가입하기</Link>
      </p>
    </div>
  );
}

export default LoginPage;
