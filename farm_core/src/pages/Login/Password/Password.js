import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Password.module.scss";
import { BeatLoader } from "react-spinners";

function Password() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleResetEmail = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/verify-email?mode=resetPassword", // 비밀번호 재설정 후 리디렉션할 URL
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setSuccess("비밀번호 재설정 이메일이 발송되었습니다. 확인해주세요.");
      setLoading(false);
      // 홈으로 이동하는 대신, 비밀번호 재설정 이메일 발송 후 사용자에게 알림을 보여줍니다.
    } catch (error) {
      setLoading(false);
      setError(
        "비밀번호 재설정 이메일 발송에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>비밀번호 재설정</h1>
        <p>아래에 등록된 이메일을 입력하세요.</p>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleResetEmail} disabled={loading}>
          비밀번호 재설정 이메일 발송
        </button>
        {loading && (
          <div className="loadingPage">
            <BeatLoader color="#38d6b7" />
          </div>
        )}
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </div>
    </div>
  );
}

export default Password;
