import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { fetchLogin } from "../../../store/checkLoginSlice/checkLoginSlice";
import AccordionAlarm from "../../../components/Alarm/AccordionAlarm";
import { fetchWeatherData } from "../../../store/weatherSlice/weatherSlice";

function Header({ title, userInfo, address }) {
  const dispatch = useDispatch();
  const { userAddress, email, farm, name, profileImages } = userInfo;
  const { weatherIssueAlarm, isLoading } = useSelector(
    (state) => state.weatherSlice
  );
  // const address = useSelector((state) => state.mapAddrSlice.address);
  const hereAddress = address;
  useEffect(() => {
    const queryOptions = {
      orderBys: [{ field: "weatherDate", direction: "desc" }],
    };
    dispatch(
      fetchWeatherData({
        collectionName: "weatherInfo",
        queryOptions: queryOptions,
      })
    );

    console.log(`확인용`);
  }, [dispatch]);

  useEffect(() => {
    console.log("weatherIssueAlarm 값 변경", weatherIssueAlarm);
  }, [weatherIssueAlarm]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={logoImg} alt="" />
        <div className={styles.logoText}>{title}</div>
      </div>
      <div className={styles.address}>
        {hereAddress ? hereAddress : "현재 정보가 없습니다"}
      </div>
      <div className={styles.userInfo}>
        <div className={styles.alarmInfo}>
          <FaRegBell size={25} />
          <div className={styles.alarmList}>
            {isLoading ? (
              <div>알람 로딩 확인용</div>
            ) : (
              <AccordionAlarm weatherIssueAlarm={weatherIssueAlarm} />
            )}
          </div>
        </div>
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
