import {
  updateDoc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase"; // auth 추가 필요
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setNotLogin } from "../../store/loginSlice/loginSlice";
import styles from "./DeleteAccount.module.scss";
function DeleteAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email); // 현재 유저의 이메일을 상태에 저장
    }
  }, []);

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (!confirmation) return;

    if (!email) {
      alert("유저 이메일을 가져올 수 없습니다. 다시 시도하세요.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email)); // email 필드로 쿼리 생성
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref; // 첫 번째 문서의 참조 가져오기

        // isActive 필드 업데이트
        await updateDoc(userDocRef, { isActive: "N" });
        alert("회원 탈퇴 성공.");

        signOut(auth).then(() => {
          dispatch(setNotLogin(true));
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("email");
          navigate("/");
        });

        navigate("/"); // 로그인 페이지로 리디렉션
      } else {
        alert("유저 문서를 찾을 수 없습니다. 문서 경로를 확인하세요.");
      }
    } catch (error) {
      alert(`회원 탈퇴 실패: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <button
        type="button"
        onClick={handleDeleteAccount}
        className={styles.deleteAccountBtn}
      >
        회원 탈퇴
      </button>
    </div>
  );
}

export default DeleteAccount;
