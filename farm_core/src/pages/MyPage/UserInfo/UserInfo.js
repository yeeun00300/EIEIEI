import React, { useEffect, useState } from "react";
import styles from "./UserInfo.module.scss";
import img from "../../../img/person.png";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setDetailedAddress,
  toggleOpen,
} from "../../../store/myPageSlice/addressSlice";
import {
  updateDatas,
  uploadProfileImage,
  useFetchCollectionData,
} from "../../../firebase";
import {
  setName,
  setEmail,
  setTel,
  setUserNickname,
  setProfileImage,
} from "../../../store/userInfoEditSlice/UserInfoEditSlice";
import { fetchUser } from "../../../store/userInfoEditSlice/UserInfoEditSlice";

function UserInfo() {
  useFetchCollectionData("users");
  const dispatch = useDispatch();
  const { address, detailedAddress, isOpen } = useSelector(
    (state) => state.addressSlice
  );
  const { userInfo, name, email, nickname, phone, profileImages } = useSelector(
    (state) => state.userInfoEditSlice
  );

  const [file, setFile] = useState(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(img);
  const [isEditing, setIsEditing] = useState(true);
  useEffect(() => {
    if (!initialDataLoaded) {
      dispatch(fetchUser({ collectionName: "users", queryOptions: {} }));
      setInitialDataLoaded(true);
    }
  }, [dispatch, initialDataLoaded]);

  useEffect(() => {
    if (userInfo.length > 0) {
      const user = userInfo[0];
      dispatch(setName(user.name || ""));
      dispatch(setEmail(user.email || ""));
      dispatch(setUserNickname(user.nickname || ""));
      dispatch(setTel(user.phone || ""));
      dispatch(setAddress(user.address || ""));
      dispatch(setDetailedAddress(user.detailedAddress || ""));
      setPreviewUrl(user.profileImages || img);
    }
  }, [userInfo, dispatch]);

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
    const { address, detailedAddress } = data;
    dispatch(setAddress(address));
    dispatch(setDetailedAddress(detailedAddress));
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
        let profileImageUrl = profileImages || img;

        if (file) {
          profileImageUrl = await uploadProfileImage(file);
          dispatch(setProfileImage(profileImageUrl));
        }

        const updateObj = {
          name,
          email,
          profileImages: profileImageUrl,
          nickname,
          phone,
          address: address || userInfo[0].address,
          detailedAddress: detailedAddress || userInfo[0].detailedAddress,
        };

        await updateDatas("users", userId, updateObj);

        alert("저장 완료");
        setIsEditing(false);
      } catch (error) {
        console.error("저장 실패:", error);
      }
    } else {
      console.error("User ID가 없습니다.");
    }
  };

  if (!initialDataLoaded) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="page">
      <h1>My Page</h1>
      <hr />
      <div className="container">
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
            <div className={styles.addr}>
              <span>주소 :</span>
              <div className={styles.addrInputs}>
                <input
                  placeholder="주소"
                  value={address || ""}
                  onChange={(e) => dispatch(setAddress(e.target.value))}
                  className={styles.addrIP}
                />
              </div>

              <input
                placeholder="상세주소를 작성해주세요"
                className={styles.addr2}
                value={detailedAddress || ""}
                onChange={(e) => dispatch(setDetailedAddress(e.target.value))}
              />
            </div>
            <div className={styles.btnWrap}>
              {isEditing ? (
                <>
                  <button className={styles.editBtn} onClick={handleSave}>
                    저장
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <button
                  className={styles.editBtn}
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
