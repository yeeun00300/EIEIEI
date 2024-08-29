import React from "react";
import Login from "../Login";
import { Link } from "react-router-dom";

function SignUpPage(props) {
  return (
    <div>
      <h1>회원가입</h1>
      <Login />
      <p>
        이미 계정이 있습니까? &nbsp; <Link to={"/Login"}>로그인</Link>{" "}
      </p>
    </div>
  );
}

export default SignUpPage;
