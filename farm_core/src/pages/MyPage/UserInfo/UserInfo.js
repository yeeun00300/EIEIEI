import React, { useEffect } from "react";
import styles from "./UserInfo.module.scss";
import img from "../../../img/person.png";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setZoneCode,
  toggleOpen,
} from "../../../store/myPageSlice/addressSlice";
import userInfoEditSlice, {
  fetchUser,
} from "./../../../store/userInfoEditSlice/UserInfoEditSlice";
import { useParams } from "react-router-dom";

function UserInfo(props) {
  const dispatch = useDispatch();
  const { address, zoneCode, isOpen } = useSelector(
    (state) => state.addressSlice
  );

  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  console.log(userInfo);
  const email = localStorage.getItem("email");

  const themeObj = {
    bgColor: "#FFFFFF",
    pageBgColor: "#FFFFFF",
    postcodeTextColor: "#C05850",
    emphTextColor: "#222222",
  };

  const postCodeStyle = {
    width: "360px",
    height: "480px",
  };

  const completeHandler = (data) => {
    const { address, zonecode } = data;
    dispatch(setAddress(address));
    dispatch(setZoneCode(zonecode));
    dispatch(toggleOpen());
  };

  const closeHandler = (state) => {
    dispatch(toggleOpen());
  };

  const toggleHandler = () => {
    dispatch(toggleOpen());
  };

  const handleChange = (e) => {
    dispatch(setAddress(e.target.value));
  };

  useEffect(() => {
    const queryOptions = {
      conditions: [{ field: "email", operator: "==", value: email }],
    };
    dispatch(fetchUser({ collectionName: "users", queryOptions }));
  }, []);

  return (
    <div className="page">
      <div className={styles.wrapper}>
        <h1>My Page</h1>
        <hr />
        <div className={styles.wrapper}>
          <div className={styles.userInfo}>
            <div className={styles.profile}>
              <img
                src={userInfo[0].profileImages}
                className={styles.personImg}
              />
              <input type="file" className={styles.hidden} />
              <p className={styles.profileContent}>프로필사진 변경하기</p>
            </div>
            <div className={styles.profileBtn}></div>
            <div>
              <span>이름 :</span> <input value={userInfo[0].name} />
            </div>
            <div>
              <span>농장번호 :</span>{" "}
              <input type="number" value={userInfo[0].farm} />
            </div>
            <div>
              <span>전화번호 :</span> <input />
            </div>
            <div className={styles.addr}>
              <span>주소 :</span>
              <div className={styles.addrInputs}>
                <input
                  placeholder="주소"
                  onChange={handleChange}
                  value={address}
                  className={styles.addrIP}
                />
                <input
                  placeholder="우편번호"
                  type="number"
                  disabled
                  value={zoneCode}
                  onChange={handleChange}
                  className={styles.addrZone}
                />
              </div>
              <input
                placeholder="상세주소를 작성해주세요"
                className={styles.addr2}
              />
              <button onClick={toggleHandler}>주소 찾기</button>
            </div>
            {isOpen && (
              <div>
                <DaumPostcode
                  onComplete={completeHandler}
                  theme={themeObj}
                  style={postCodeStyle}
                  onClose={closeHandler}
                />
              </div>
            )}
            <div className={styles.buttons}>
              <button className={styles.google}>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
