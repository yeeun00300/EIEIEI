import React, { useEffect } from "react";
import styles from "./UserMenu.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { setNotLogin } from "../../../store/loginSlice/loginSlice";

function UserMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getUserAuth();

  const email = useSelector((state) => state.loginSlice.email);
  useEffect(() => {
    // 이메일이 변경될 때마다 리렌더링
    console.log("이메일이 변경되었습니다:", email);
  }, [email]);
  // console.log(email);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 성공");
        dispatch(setNotLogin(true));
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃 실패", error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.userEmail}>
        로그인된 이메일
        <p>{email}</p>
      </div>
      <div className={styles.btns}>
        <Link className={styles.btn} to={"/My_Farm_MyPage"}>
          <button className="squareGlobalEditBtn">회원정보수정</button>
        </Link>
        <button className="squareGlobalDeleteBtn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
