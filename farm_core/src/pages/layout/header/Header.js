import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { getDataAll, getDatas } from "../../../firebase";

function Header({ title }) {
  const address = useSelector((state) => state.mapAddrSlice.address);
  const email = useSelector((state) => state.loginSlice.email);
  // const profileImage = useSelector((state) => state.loginSlice.profilImage);

  // const profileImage = useSelector(
  //   (state) => state.profileImageSlice.downloadURL
  // );

  // const profileImage = useSelector

  const profileImage = useSelector((state) => state.loginSlice.profileImages);
  console.log("Profile Image URL:", profileImage); // 상태 로그 추가
  console.log(`email확인:${email}`);

  // const getUserInfo = async () => {
  //   const queryOptions = {
  //     conditions: [
  //       {
  //         field: "email",
  //         operator: "==",
  //         value: email,
  //       },
  //     ],
  //   };
  //   const result = await getDatas("users", queryOptions);
  //   // const dd = result[0];
  //   // const profile = dd.profileImages;
  //   console.log(result);
  // };
  // useEffect(() => {
  //   getUserInfo();
  // }, []);

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
