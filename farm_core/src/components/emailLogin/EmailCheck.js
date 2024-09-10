import { applyActionCode, getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EmailCheck(props) {
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const actionCode = new URLSearchParams(location.search).get("oobCode");

  useEffect(() => {
    if (actionCode) {
      applyActionCode(auth, actionCode)
        .then(() => {
          alert("이메일 인증이 완료되었습니다.");
          navigate("/SignUp"); // 인증 후 로그인 페이지로 이동
        })
        .catch((error) => {
          console.error("이메일 인증 실패: ", error);
          alert("이메일 인증에 실패했습니다.");
        });
    }
  }, [actionCode, auth, navigate]);

  return (
    <div>
      <h1>이메일 인증 중...</h1>
    </div>
  );
}
export default EmailCheck;
