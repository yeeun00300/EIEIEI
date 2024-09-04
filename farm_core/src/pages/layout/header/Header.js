import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { fetchLogin } from "../../../store/checkLoginSlice/checkLoginSlice";
import checkLoginSlice from "./../../../store/checkLoginSlice/checkLoginSlice";

function Header({ title }) {
  const dispatch = useDispatch();
  // const address = useSelector((state) => state.mapAddrSlice.address);
  const email = localStorage.getItem("email");
  // const profileImage = useSelector((state) => state.loginSlice.profilImage);
  const { checkLogin, isLoading } = useSelector(
    (state) => state.checkLoginSlice
  );
  // const profileImage = useSelector(
  //   (state) => state.profileImageSlice.downloadURL
  // );

  // const profileImage = useSelector

  const profileImage = useSelector((state) => state.loginSlice.profileImages);
  console.log("Profile Image URL:", profileImage); // 상태 로그 추가
  console.log(`email확인:${email}`);

  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "email",
          operator: "==",
          value: email,
        },
      ],
    };
    // dispatch(fetchLogin({ collectionName: "users", queryOptions }));
    dispatch(fetchLogin({ collectionName: "users", queryOptions }));

    console.log(checkLogin);
    console.log(isLoading);
  }, [email]);

  if (isLoading) return <div>로딩중</div>;

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
          {profileImage ? (
            <img
              className={styles.profileImage}
              src={profileImage}
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
