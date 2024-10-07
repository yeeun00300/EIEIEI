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
  fetchUser,
  userInfoUpdate,
} from "../../../store/userInfoEditSlice/UserInfoEditSlice";
import { toggleOpen } from "../../../store/myPageSlice/addressSlice";
import { useDaumPostcodePopup } from "react-daum-postcode";
import DeleteAccount from "./../../../components/DeleteAccount/DeleteAccount";

function UserInfo() {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(
    (state) => state.userInfoEditSlice
  );

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(img);
  const [isEditing, setIsEditing] = useState(true);

  const open = useDaumPostcodePopup();

  useFetchCollectionData("users", fetchUser);

  useEffect(() => {
    // 유저 데이터 로드 후 처리
    if (userInfo && userInfo[0]) {
      setPreviewUrl(userInfo[0].profileImages || img); // 프로필 이미지 설정
    }
  }, [userInfo]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  const completeHandler = (data) => {
    console.log("Address Data:", data); // 확인
    const address = `${data.address}`;
    const detailedAddress = `${data.bname} ${
      data.buildingName ? data.buildingName : ""
    }`;
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
    const userId = userInfo[0]?.docId; // userInfo[0]에 저장된 문서 ID를 가져옴

    if (userId) {
      // 유저 정보 업데이트
      dispatch(
        userInfoUpdate({
          collectionName: "users", // 컬렉션 이름
          docId: userId, // 업데이트할 유저의 문서 ID
          updateObj: { [name]: value }, // 업데이트할 필드와 값
        })
      );
    } else {
      console.error("User ID를 찾을 수 없습니다.");
    }
  };

  const handleSave = async () => {
    const userId = userInfo[0]?.docId;

    if (userId) {
      try {
        let profileImageUrl = previewUrl;

        if (file) {
          profileImageUrl = await uploadProfileImage(file);
          dispatch(
            userInfoUpdate({
              collectionName: "users",
              docId: userId,
              updateObj: { profileImages: profileImageUrl },
            })
          );
        }

        alert("저장 완료");
        setIsEditing(false);
      } catch (error) {
        console.error("저장 실패:", error);
      }
    }
  };
  return (
    <div className="container">
      <h1>My Page</h1>
      <hr />
      <div className={styles.wrapper}>
        <div className={styles.userInfo}>
          <div className={styles.profile}>
            <img
              src={previewUrl || img}
              className={styles.personImg}
              alt="profile"
            />
            <input
              type="file"
              className={styles.hidden}
              onChange={handleFileChange}
            />
            <p className={styles.profileContent}>프로필사진 변경하기</p>
          </div>
          <div>
            <span>이름 :</span>
            <input
              name="name"
              value={userInfo[0]?.name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <span>닉네임 :</span>
            <input
              name="nickname"
              value={userInfo[0]?.nickname || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <span>이메일 :</span>
            <input
              name="email"
              type="email"
              value={userInfo[0]?.email || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <span>핸드폰 번호 :</span>
            <input
              name="phone"
              type="tel"
              value={userInfo[0]?.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.addr}>
            <span>주소 :</span>
            <input
              placeholder="주소"
              value={userInfo[0]?.address || ""}
              readOnly
              className={styles.addrIP}
            />
          </div>
          <div className={styles.addr2Wrapper}>
            <input
              placeholder="상세주소"
              className={styles.addr2}
              value={userInfo[0]?.detailedAddress || ""}
              readOnly
            />
            <button className="squareGlobalBtn" onClick={openAddressPopup}>
              주소 검색
            </button>
          </div>
          <div className={styles.btnWrap}>
            {isEditing ? (
              <div>
                <button className="globalBtn" onClick={handleSave}>
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
  );
}

export default UserInfo;
