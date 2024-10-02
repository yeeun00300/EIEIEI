import React, { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import styles from "./PasswordConfirm.module.scss"; // 스타일 파일이름 변경

function PasswordConfirm({
  auth,
  oobCodeFromURL,
  navigate,
  setLoading,
  setError,
}) {
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부

  // 비밀번호 재설정 핸들러
  const handleResetPassword = async () => {
    if (!newPassword) {
      setError("비밀번호를 입력해 주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true); // 로딩 시작
    try {
      await confirmPasswordReset(auth, oobCodeFromURL, newPassword);
      alert("비밀번호가 성공적으로 재설정되었습니다.");
      navigate("/"); // 비밀번호 재설정 후 홈으로 이동
    } catch (error) {
      setError("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (confirmPassword) {
      setPasswordMatch(e.target.value === confirmPassword); // 비밀번호 확인과 일치 여부 확인
    }
  };

  // 비밀번호 확인 변경 핸들러
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === newPassword); // 비밀번호 일치 여부 확인
  };

  return (
    <div className={styles.passwordConfirm}>
      <div className={styles.mainpassword}>
        <h1>새로운 비밀번호를 입력해주세요.</h1>
        <input
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          value={newPassword}
          onChange={handlePasswordChange}
        />
        {/* </div> */}
        {/* <div className={styles.subpassword}> */}
        <input
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {!passwordMatch && confirmPassword && (
          <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
        )}
        <button
          onClick={handleResetPassword}
          disabled={!passwordMatch || !newPassword || !confirmPassword}
        >
          비밀번호 재설정
        </button>
      </div>
    </div>
  );
}

export default PasswordConfirm;
