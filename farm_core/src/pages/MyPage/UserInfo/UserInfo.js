import React, { useEffect, useState } from "react";
import styles from "./UserInfo.module.scss";
import img from "../../../img/person.png";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setZoneCode,
  toggleOpen,
} from "../../../store/myPageSlice/addressSlice";
import { fetchUser } from "./../../../store/userInfoEditSlice/UserInfoEditSlice";
import { updateDatas, uploadProfileImage } from "../../../firebase";
import {
  setEmail,
  setName,
  setTel,
  setUserNickname,
} from "./../../../store/myPageSlice/userEditSlice";
import { setProfileImage } from "../../../store/loginSlice/loginSlice";
import { setFarm } from "../../../store/joinUserSlice/joinUserSlice";

function UserInfo() {
  const dispatch = useDispatch();
  const { address, zoneCode, isOpen } = useSelector(
    (state) => state.addressSlice
  );
  const { name, email, profileImage, nickName, tel, farm } = useSelector(
    (state) => state.userEditSlice.userInfo
  );
  const [file, setFile] = useState(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  const userEmail = localStorage.getItem("email");

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

  const closeHandler = () => {
    dispatch(toggleOpen());
  };

  const toggleHandler = () => {
    dispatch(toggleOpen());
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    try {
      let profileImageUrl = profileImage;
      if (file) {
        profileImageUrl = await uploadProfileImage(file);
        dispatch(setProfileImage(profileImageUrl));
      }

      // dispatch를 통해 상태 업데이트
      switch (name) {
        case "name":
          dispatch(setName(value));
          break;
        case "email":
          dispatch(setEmail(value));
          break;
        case "nickName":
          dispatch(setUserNickname(value));
          break;
        case "tel":
          dispatch(setTel(value));
          break;
        case "farm":
          dispatch(setFarm(value));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  const handleSave = () => {
    const userId = userInfo[0]?.docId;
    if (userId) {
      updateDatas("users", userId, {
        name,
        email,
        profileImage,
        nickName,
        tel,
        farm,
        address,
        zoneCode,
      })
        .then(() => {
          alert("저장 완료");
        })
        .catch((error) => {
          console.error("저장 실패:", error);
        });
    } else {
      console.error("User ID가 없습니다.");
    }
  };

  useEffect(() => {
    const queryOptions = {
      conditions: [{ field: "email", operator: "==", value: userEmail }],
    };
    dispatch(fetchUser({ collectionName: "users", queryOptions }));
  }, [dispatch, userEmail]);

  useEffect(() => {
    if (userInfo.length > 0) {
      const user = userInfo[0];
      // 상태를 업데이트하여 input 필드에 데이터 표시
      dispatch(setName(user.name));
      dispatch(setEmail(user.email));
      dispatch(setUserNickname(user.nickName));
      dispatch(setTel(user.tel));
      dispatch(setFarm(user.farm));
      dispatch(setAddress(user.address));
      dispatch(setZoneCode(user.zoneCode));
      setInitialDataLoaded(true);
    }
  }, [userInfo, dispatch]);

  if (!initialDataLoaded) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="page">
      <div className={styles.wrapper}>
        <h1>My Page</h1>
        <hr />
        <div className={styles.wrapper}>
          <div className={styles.userInfo}>
            <div className={styles.profile}>
              <img src={profileImage || img} className={styles.personImg} />
              <input
                type="file"
                className={styles.hidden}
                onChange={handleFileChange}
              />
              <p className={styles.profileContent}>프로필사진 변경하기</p>
            </div>
            <div>
              <span>이름 :</span>
              <input name="name" value={name || ""} onChange={handleChange} />
            </div>
            <div>
              <span>닉네임 :</span>
              <input
                name="nickName"
                value={nickName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>이메일 :</span>
              <input
                name="email"
                type="email"
                value={email || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>핸드폰 번호 :</span>
              <input
                name="tel"
                type="tel"
                value={tel || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>축사번호 :</span>
              <input
                name="farm"
                type="number"
                value={farm || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.addr}>
              <span>주소 :</span>
              <div className={styles.addrInputs}>
                <input
                  placeholder="주소"
                  value={address || ""}
                  onChange={(e) => dispatch(setAddress(e.target.value))}
                  className={styles.addrIP}
                />
                <input
                  placeholder="우편번호"
                  type="number"
                  disabled
                  value={zoneCode || ""}
                  className={styles.addrZone}
                />
              </div>
              <input
                placeholder="상세주소를 작성해주세요"
                className={styles.addr2}
              />
              <button onClick={toggleHandler} className={styles.addrBtn}>
                주소 찾기
              </button>
            </div>
            {isOpen && (
              <DaumPostcode
                onComplete={completeHandler}
                theme={themeObj}
                style={postCodeStyle}
                onClose={closeHandler}
              />
            )}
            <div className={styles.buttons}>
              <button className={styles.google} onClick={handleSave}>
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
