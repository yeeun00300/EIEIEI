import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { fetchLogin } from "../../../store/checkLoginSlice/checkLoginSlice";

function Header({ title }) {
  const dispatch = useDispatch();
  const { checkLogin, isLoading } = useSelector(
    (state) => state.checkLoginSlice
  );

  const profileImage = useSelector((state) => state.loginSlice.profileImages);
  console.log("Profile Image URL:", profileImage); // 상태 로그 추가
  // console.log(`email확인:${email}`);

  const email = localStorage.getItem("email");
  useEffect(() => {
    if (email) {
      const queryOptions = {
        conditions: [
          {
            field: "email",
            operator: "==",
            value: email,
          },
        ],
      };
      dispatch(fetchLogin({ collectionName: "users", queryOptions }));
    }
  }, [dispatch, email]);

  useEffect(() => {
    console.log("CheckLogin state:", checkLogin);
    console.log("Loading state:", isLoading);
  }, [checkLogin, isLoading]);

  if (isLoading) return <div>로딩중</div>;
  if (!checkLogin || Object.keys(checkLogin).length === 0)
    return <div>데이터가 없습니다</div>;

  const { profileImages } = checkLogin;

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={logoImg} alt="" />
        <div className={styles.logoText}>{title}</div>
      </div>
      <div className={styles.address}>
        {/* {address ? address : "현재 정보가 없습니다"} */}
      </div>
      <div className={styles.userInfo}>
        <FaRegBell size={25} />
        <div className={styles.user}>
          {profileImages ? (
            <img
              className={styles.profileImage}
              src={profileImages}
              alt="Profile"
            />
          ) : (
            <FaRegUser size={25} />
          )}
          <div className={styles.usermenu}>
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
