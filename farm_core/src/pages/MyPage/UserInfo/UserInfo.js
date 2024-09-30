import React, { useEffect, useState } from "react";
import styles from "./UserInfo.module.scss";
import img from "../../../img/person.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserByEmail,
  updateDatas,
  uploadProfileImage,
  useFetchCollectionData,
} from "../../../firebase";
import {
  updateUserInfo,
  fetchUser,
} from "../../../store/userInfoEditSlice/UserInfoEditSlice";
import { toggleOpen } from "../../../store/myPageSlice/addressSlice";
import { useDaumPostcodePopup } from "react-daum-postcode";
import DeleteAccount from "./../../../components/DeleteAccount/DeleteAccount";
import KORMap from "../../../components/diseaseMonth/KORMap";

function UserInfo() {
  useFetchCollectionData("users", fetchUser);
  const dispatch = useDispatch();
  const {
    name,
    email,
    nickname,
    phone,
    address,
    detailedAddress,
    profileImages,
    userInfo,
  } = useSelector((state) => state.userInfoEditSlice);

  const [file, setFile] = useState(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(img);
  const [isEditing, setIsEditing] = useState(true);

  const open = useDaumPostcodePopup();

  useEffect(() => {
    if (!initialDataLoaded) {
      dispatch(fetchUser({ collectionName: "users", queryOptions: { email } }));
      setInitialDataLoaded(true);
    }
  }, [dispatch, initialDataLoaded]);

  useEffect(() => {
    const currentUserEmail = email;

    if (!initialDataLoaded && currentUserEmail) {
      fetchUserByEmail(currentUserEmail).then((userData) => {
        if (userData.length > 0) {
          const user = userData[0];
          dispatch(
            updateUserInfo({
              name: user.name || "",
              email: user.email || "",
              nickname: user.nickname || "",
              phone: user.phone || "",
              address: user.address || "",
              detailedAddress: user.detailedAddress || "",
              profileImages: user.profileImages || img,
            })
          );
          setPreviewUrl(user.profileImages || img);
        }
        setInitialDataLoaded(true);
      });
    }
  }, [dispatch, email, initialDataLoaded]);

  const completeHandler = (data) => {
    console.log("Address Data:", data); // 확인
    const address = `${data.address}`;
    const detailedAddress = `${data.bname} ${
      data.buildingName ? data.buildingName : ""
    }`;
    dispatch(updateUserInfo({ address, detailedAddress }));
    dispatch(toggleOpen());
  };

  const openAddressPopup = () => {
    open({
      onComplete: completeHandler,
    });
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
    dispatch(updateUserInfo({ [name]: value }));
  };

  const handleSave = async () => {
    const userId = userInfo[0]?.docId;
    if (userId) {
      try {
        let profileImageUrl = profileImages || img;

        if (file) {
          profileImageUrl = await uploadProfileImage(file);
          dispatch(updateUserInfo({ profileImages: profileImageUrl }));
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

        // 페이지를 새로고침
        alert("저장 완료");
        setIsEditing(false);
        window.location.reload(); // 페이지 새로고침
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
    <div className="container">
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
              <input
                placeholder="주소"
                value={address || ""}
                onChange={(e) =>
                  dispatch(updateUserInfo({ address: e.target.value }))
                }
                className={styles.addrIP}
              />
            </div>

            <div className={styles.addr2Wrapper}>
              <input
                placeholder="상세주소를 작성해주세요"
                className={styles.addr2}
                value={detailedAddress || ""}
                onChange={(e) =>
                  dispatch(updateUserInfo({ detailedAddress: e.target.value }))
                }
              />
              <button className="squareGlobalBtn" onClick={openAddressPopup}>
                주소 검색
              </button>
            </div>

            <div className={styles.btnWrap}>
              {isEditing ? (
                <div>
                  <button className="globalBtn " onClick={handleSave}>
                    저장
                  </button>
                  <button
                    className="globalDeleteBtn"
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <button
                  className={styles.editBtn}
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </button>
              )}
            </div>
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
