import React from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

function Header({ title }) {
  const address = useSelector((state) => state.mapAddrSlice.address);
  // const profileImage = useSelector((state) => state.loginSlice.profilImage);
  const profileImage = useSelector(
    (state) => state.profileImageSlice.downloadURL
  );

  console.log("Profile Image URL:", profileImage); // 상태 로그 추가

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={logoImg} alt="" />
        <div className={styles.logoText}>{title}</div>
      </div>
      <div className={styles.address}>
        {address ? address : "현재 정보가 없습니다"}
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
