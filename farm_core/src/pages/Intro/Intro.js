import React from "react";
import SignUp from "../Login/SignUp/SignUp";
import { Link } from "react-router-dom";

function Intro(props) {
  return (
    <div>
      <button>
        <Link to={"/SignUp"}>회원가입</Link>
      </button>
    </div>
  );
}

export default Intro;
