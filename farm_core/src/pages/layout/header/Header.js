import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { fetchLogin } from "../../../store/checkLoginSlice/checkLoginSlice";

function Header({ title, userInfo }) {
  // const { address, email, farm, name, profileImages } = userInfo;
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={logoImg} alt="" />
        <div className={styles.logoText}>{title}</div>
      </div>
      {/* <div className={styles.address}>
        {address ? address : "현재 정보가 없습니다"}
      </div> */}
      <div className={styles.userInfo}>
        <FaRegBell size={25} />
        {/* <div className={styles.user}>
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
        </div> */}
      </div>
    </div>
  );
}

export default Header;
