import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { applyActionCode, getAuth } from "firebase/auth";

function EmailCheck() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const oobCodeFromURL = searchParams.get("oobCode");
    console.log("Query String:", queryString);
    console.log("Search params:", urlParams.toString());
    console.log("oobCode from URL:", oobCodeFromURL);

    if (oobCodeFromURL) {
      applyActionCode(auth, oobCodeFromURL)
        .then(() => {
          setLoading(false); // 로딩 완료
          alert("이메일 인증이 완료되었습니다.");
          navigate("/SignUp"); // 인증이 완료되면 회원가입 페이지로
        })
        .catch((error) => {
          setLoading(false); // 로딩 완료
          console.error("이메일 인증 중 오류가 발생했습니다: ", error);
          setError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
        });
    }
  }, [navigate, searchParams]);

  return (
    <div className="container">
      <h1>이메일 인증 중...</h1>
      {loading && <p>인증 코드 확인 중입니다...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default EmailCheck;
