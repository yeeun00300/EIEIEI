import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { fetchLogin } from "../../../store/checkLoginSlice/checkLoginSlice";
import AccordionAlarm from "../../../components/Alarm/AccordionAlarm";
import {
  fetchOnData,
  fetchWeatherData,
  setOnWeatherIssueAlarm,
} from "../../../store/weatherSlice/weatherSlice";
import { getQuery } from "../../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { orderBy } from "firebase/firestore";

function Header({ title, userInfo, address }) {
  const dispatch = useDispatch();
  const { userAddress, email, farm, name, profileImages } = userInfo;
  const { weatherIssueAlarm, isLoading, onWeatherIssueAlarm } = useSelector(
    (state) => state.weatherSlice
  );

  const conditions = [];
  const orderBys = [{ field: "weatherDate", direction: "desc" }];
  const q = getQuery("weatherInfo", {
    conditions: conditions,
    orderBys: orderBys,
  });
  const [weatherInfo] = useCollectionData(q);
  dispatch(setOnWeatherIssueAlarm(weatherInfo));

  // const address = useSelector((state) => state.mapAddrSlice.address);
  const hereAddress = address;
  useEffect(() => {
    // const queryOptions = {
    //   orderBys: [{ field: "weatherDate", direction: "desc" }],
    // };
    // dispatch(
    //   fetchWeatherData({
    //     collectionName: "weatherInfo",
    //     queryOptions: queryOptions,
    //   })
    // );
    // dispatch(
    //   fetchOnData({
    //     collectionName: "weatherInfo",
    //     queryOptions: queryOptions,
    //   })
    // );
  }, [dispatch]);

  useEffect(() => {}, [weatherInfo, weatherIssueAlarm]);

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
              <div>알람 로딩</div>
            ) : (
              <AccordionAlarm weatherIssueAlarm={weatherInfo} />
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
