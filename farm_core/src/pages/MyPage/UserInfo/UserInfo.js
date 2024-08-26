import React, { useEffect, useState } from "react";
import styles from "./UserInfo.module.scss";
import img from "../../../img/person.png";
import DaumPostcode from "react-daum-postcode";
import { Button } from "@mui/material";
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
  const { id } = useParams();
  const userId = Number(id);
  const { address, zoneCode, isOpen } = useSelector(
    (state) => state.addressSlice
  );

  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  console.log(userInfo);

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

  console.log(userInfo);
  useEffect(() => {
    const queryOptions = {
      conditions: [{ filed: "id", operator: "==", value: userId }],
    };
    dispatch(fetchUser({ collectionName: "users", queryOptions }));
  }, []);

  return (
    <div>
      <div className="wrapper">
        <h1>My Page</h1>
        <hr />
        <div className={styles.wrapper}>
          <div className={styles.userInfo}>
            <div className={styles.profile}>
              <img src={img} className={styles.personImg} />

              <input type="file" className={styles.hidden} />
            </div>
            <div className={styles.profileBtn}>
              <button>프로필사진변경하기</button>
            </div>
            <div>
              이름 : <input />
            </div>
            <div>
              생년월일 : <input type="date" />
            </div>
            <div>
              전화번호 : <input />
            </div>
            <div className={styles.addr}>
              주소 :
              <p>
                <input
                  placeholder="주소"
                  onChange={handleChange}
                  value={address}
                />
              </p>
              <p>
                <input placeholder="상세주소를 작성해주세요" />
              </p>
              <p>
                <input
                  placeholder="우편번호"
                  type="number"
                  disabled
                  value={zoneCode}
                  onChange={handleChange}
                />
              </p>
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
