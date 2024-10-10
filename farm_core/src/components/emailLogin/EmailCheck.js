import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuth, applyActionCode } from "firebase/auth";
import PasswordConfirm from "../../pages/Login/Password/PasswordConfirm";
import { BeatLoader } from "react-spinners";

function EmailCheck() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mode = searchParams.get("mode"); // mode 확인
    const oobCodeFromURL = searchParams.get("oobCode");

    if (oobCodeFromURL) {
      if (mode === "verifyEmail") {
        // 이메일 인증 처리
        applyActionCode(auth, oobCodeFromURL)
          .then(() => {
            setLoading(false);
            alert("이메일 인증이 완료되었습니다.");
            navigate("/SignUp");
          })
          .catch((error) => {
            setLoading(false);
            console.error("이메일 인증 중 오류가 발생했습니다: ", error);
            setError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
          });
      } else if (mode === "resetPassword") {
        setLoading(false); // 로딩 완료
      } else {
        setLoading(false);
        setError("잘못된 요청입니다.");
      }
    }
    // else {
    //   setLoading(false);
    //   setError("왜 오류가 날까 회원가입은 되는데 흐으음...");
    // }
  }, [navigate, searchParams]);

  return (
    <div>
      {loading && (
        <div className="loadingPage">
          <h5>메일을 확인해주세요</h5>
          <BeatLoader color="#38d6b7" />
        </div>
      )}
      {error && <p>{error}</p>}
      {searchParams.get("mode") === "resetPassword" && (
        <PasswordConfirm
          auth={auth}
          oobCodeFromURL={searchParams.get("oobCode")}
          navigate={navigate}
          setLoading={setLoading}
          setError={setError}
        />
      )}
    </div>
  );
}

export default EmailCheck;
