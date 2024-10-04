import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";
import { FaRegBell, FaSearchLocation } from "react-icons/fa"; // 돋보기 아이콘 추가
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import AccordionAlarm from "../../../components/Alarm/AccordionAlarm";
import { setOnWeatherIssueAlarm } from "../../../store/weatherSlice/weatherSlice";
import { getQuery } from "../../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useGeolocation from "../../../components/DiseaseStatus/useGeolocation";
import MapModal from "../../../components/DiseaseStatus/MapModal";
import CurrentMarker from "./../../../components/DiseaseStatus/CurrentMarker";
import { useNavigate } from "react-router-dom";

function Header({ title, userInfo }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userAddress, email, farm, name, profileImages } = userInfo;
  const { weatherIssueAlarm, isLoading, onWeatherIssueAlarm } = useSelector(
    (state) => state.weatherSlice
  );
  // 위치 가져오기
  const address = useSelector((state) => state.mapAddrSlice.address);
  useGeolocation();
  const [isMapModalOpen, setMapModalOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  // 실시간 날씨 알림
  const weatherConditions = [];
  const weatherOrderBys = [{ field: "weatherDate", direction: "desc" }];
  const weatherQ = getQuery("weatherInfo", {
    conditions: weatherConditions,
    orderBys: weatherOrderBys,
  });
  const [weatherInfo] = useCollectionData(weatherQ);

  // 실시간 질병 알림
  const diseaseConditions = [];
  const diseaseOrderBys = [{ field: "createdAt", direction: "desc" }];
  const diseaseQ = getQuery("diseaseInfo", {
    conditions: diseaseConditions,
    orderBys: diseaseOrderBys,
  });
  const [diseaseInfo] = useCollectionData(diseaseQ);

  const handleAddressClick = () => {
    setMapModalOpen(true);
  };
  const fixedWeatherInfo = useRef();
  const fixedDiseaseInfo = useRef();
  // const fixedDiseaseInfo = useRef(diseaseInfo && diseaseInfo);

  // 알람을 확인했을 때 빨간 점 없애기
  const [hasNewAlarm, setHasNewAlarm] = useState(false);
  useEffect(() => {
    if (weatherInfo && diseaseInfo) {
      fixedWeatherInfo.current = weatherInfo;
      fixedDiseaseInfo.current = diseaseInfo;
    }
  }, [weatherInfo, diseaseInfo]);

  useEffect(() => {
    dispatch(setOnWeatherIssueAlarm(weatherInfo));
    if (
      weatherInfo?.length > fixedWeatherInfo.current?.length ||
      diseaseInfo?.length > fixedDiseaseInfo.current?.length
    ) {
      setHasNewAlarm(true);
    } else if (
      weatherInfo?.length < fixedWeatherInfo.current?.length ||
      diseaseInfo?.length < fixedDiseaseInfo.current?.length
    ) {
      setHasNewAlarm(false);
      weatherInfo && (fixedWeatherInfo.current = weatherInfo);
      diseaseInfo && (fixedDiseaseInfo.current = diseaseInfo);
    } else if (
      weatherInfo?.length == fixedWeatherInfo.current?.length ||
      diseaseInfo?.length == fixedDiseaseInfo.current?.length
    ) {
      return;
    }
  }, [weatherInfo, diseaseInfo, weatherIssueAlarm, dispatch]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAlarmClick = () => {
    setHasNewAlarm(false);
  };

  // UserMenu 열고 닫기 함수
  const toggleUserMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  // Alarm 열고 닫기 함수
  const toggleAlarmMenu = () => {
    setIsAlarmOpen((prev) => !prev);
  };
  // 로고 누르면 홈으로 되돌아가기
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <img className={styles.logoImg} src={logoImg} alt="" />
        <div className={styles.logoText}>{title}</div>
      </div>

      {/* 480px 이하에서는 돋보기 버튼으로 대체됩니다 */}
      <div className={styles.address}>
        <span>{address ? address : "현재 정보가 없습니다"}</span>
        <button className="globalBtn" onClick={handleAddressClick}>
          위치 정보 찾기
        </button>
      </div>

      {/* 480px 이하 화면에서 주소 대신 돋보기 버튼이 나타남 */}
      <div className={styles.searchIcon} onClick={handleAddressClick}>
        <FaSearchLocation size={25} />
      </div>

      <div className={styles.userInfo}>
        <div className={styles.alarmInfo}>
          <div className={styles.bellWrapper} onClick={handleAlarmClick}>
            <FaRegBell size={25} onClick={toggleAlarmMenu} />
            {/* 빨간 점 표시 */}
            {hasNewAlarm && <span className={styles.redDot} />}
          </div>
          {isAlarmOpen && (
            <div className={styles.alarmList}>
              {isLoading ? (
                <div>알람 로딩</div>
              ) : (
                <AccordionAlarm
                  weatherIssueAlarm={weatherInfo}
                  diseaseAlarm={diseaseInfo}
                />
              )}
            </div>
          )}
        </div>
        <div className={styles.userImgInfo}>
          <div onClick={toggleUserMenu} className={styles.user}>
            {profileImages ? (
              <img
                className={styles.profileImage}
                src={profileImages}
                alt="Profile"
              />
            ) : (
              <FaRegUser size={25} />
            )}
            <div
              className={styles.usermenu}
              style={{ display: isMenuOpen ? "block" : "none" }}
            >
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
      <MapModal isOpen={isMapModalOpen} onClose={() => setMapModalOpen(false)}>
        <CurrentMarker />
      </MapModal>
    </div>
  );
}

export default Header;
