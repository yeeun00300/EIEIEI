import React from "react";
import styles from "./UserMenu.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { setNotLogin } from "../../../store/loginSlice/loginSlice";
import UserInfo from "../../MyPage/UserInfo/UserInfo";

function UserMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getUserAuth();

  const email = useSelector((state) => state.loginSlice.email);
  console.log(email);
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
      <div>
        Email:
        <input type="text" value={email} readOnly />
      </div>
      <div>
        농장수:
        <input />
      </div>
      <div>
        <Link to={"/userinfo"}>
          <button>회원정보수정</button>
        </Link>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
}

export default UserMenu;
