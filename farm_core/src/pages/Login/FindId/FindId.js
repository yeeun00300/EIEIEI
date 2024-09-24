import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setIsLoading } from "../../store/loginSlice/loginSlice";
import { getAuth } from "firebase/auth";

const FindId = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("유효하지 않은 이메일 주소입니다.");
      return;
    }

    dispatch(setIsLoading(true));

    try {
      // Firebase에서 이메일로 사용자 ID 검색
      const user = await auth.fetchSignInMethodsForEmail(email);

      if (user.length > 0) {
        // 아이디가 존재하면 이메일로 전송
        // 이 부분은 실제 이메일 전송 로직이 필요함
        setMessage(`귀하의 아이디는: ${user[0]}`); // 예시로 사용자 ID를 표시
      } else {
        alert("이메일로 등록된 아이디가 없습니다.");
      }
    } catch (error) {
      console.error("아이디 찾기 오류:", error);
      dispatch(setError("아이디 찾기 실패: " + error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div>
      <form onSubmit={handleFindId}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
          required
        />
        <button type="submit">아이디 찾기</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FindId;
