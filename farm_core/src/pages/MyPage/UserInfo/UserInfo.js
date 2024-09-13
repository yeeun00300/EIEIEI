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
import {
  updateDatas,
  uploadProfileImage,
  useFetchCollectionData,
  useFetchUser,
} from "../../../firebase";
import {
  setEmail,
  setName,
  setTel,
  setUserNickname,
} from "./../../../store/myPageSlice/userEditSlice";
import { setProfileImage } from "../../../store/loginSlice/loginSlice";

function UserInfo() {
  const dispatch = useDispatch();
  const { address, zoneCode, isOpen } = useSelector(
    (state) => state.addressSlice
  );
  const { name, email, profileImages, nickname, phone } = useSelector(
    (state) => state.userEditSlice.userInfo
  );
  const [file, setFile] = useState(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(profileImages);

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
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        dispatch(setName(value));
        break;
      case "email":
        dispatch(setEmail(value));
        break;
      case "nickname":
        dispatch(setUserNickname(value));
        break;
      case "phone":
        dispatch(setTel(value));
        break;
      default:
        break;
    }
  };
  const handleSave = async () => {
    const userId = userInfo[0]?.docId;
    if (userId) {
      try {
        let profileImageUrl = profileImages;

        // 파일이 선택된 경우, Firebase Storage에 업로드
        if (file) {
          profileImageUrl = await uploadProfileImage(file);
          dispatch(setProfileImage(profileImageUrl)); // 프로필 이미지 URL 업데이트
          console.log("Profile Image URL after dispatch:", profileImageUrl); // 콘솔에 출력
        }

        // Firestore에 사용자 데이터 업데이트
        await updateDatas("users", userId, {
          name,
          email,
          profileImages: profileImageUrl, // 업데이트된 프로필 이미지 URL
          nickname,
          phone,
          address,
          zoneCode,
        });

        alert("저장 완료");
      } catch (error) {
        console.error("저장 실패:", error);
      }
    } else {
      console.error("User ID가 없습니다.");
    }
  };
  useFetchCollectionData("users");

  useEffect(() => {
    if (userInfo.length > 0) {
      const user = userInfo[0];
      dispatch(setName(user.name));
      dispatch(setEmail(user.email));
      dispatch(setUserNickname(user.nickname));
      dispatch(setTel(user.phone));
      // dispatch(setFarm(user.farm));
      dispatch(setAddress(user.address));
      dispatch(setZoneCode(user.zoneCode));
      setPreviewUrl(user.profileImages || img); // 초기 프로필 이미지 URL 설정
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
              <img src={previewUrl || img} className={styles.personImg} />
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
                name="nickname"
                value={nickname || ""}
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
                name="phone"
                type="tel"
                value={phone || ""}
                onChange={handleChange}
              />
            </div>
            {/* <div>
              <span>축사번호 :</span>
              <input
                name="farm"
                type="number"
                value={farm || ""}
                onChange={handleChange}
              />
            </div> */}
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
