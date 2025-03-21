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
import { BeatLoader } from "react-spinners";

function UserInfo() {
  const dispatch = useDispatch();
  const { userInfo, isLoading, error } = useSelector(
    (state) => state.userInfoEditSlice
  );

  //입력값을 지정할 로컬상태
  const [editedUserInfo, setEditedUserInfo] = useState({
    name: "",
    nickname: "",
    phone: "",
    address: "",
    detailedAddress: "",
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(img);
  const [isEditing, setIsEditing] = useState(true);

  const open = useDaumPostcodePopup();

  useFetchCollectionData("users", fetchUser);

  useEffect(() => {
    // 유저 데이터 로드 후 처리
    // if (userInfo && userInfo[0]) {
    //   setPreviewUrl(userInfo[0].profileImages || img); // 프로필 이미지 설정
    // }
    if (userInfo && userInfo[0]) {
      setPreviewUrl(userInfo[0].profileImages || img);
      setEditedUserInfo({
        name: userInfo[0].name || "",
        nickname: userInfo[0].nickname || "",
        phone: userInfo[0].phone || "",
        address: userInfo[0].address || "",
        detailedAddress: userInfo[0].detailedAddress || "",
      });
    }
  }, [userInfo]);

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  const completeHandler = (data) => {
    const address = `${data.address}`;
    const detailedAddress = `${data.bname} ${
      data.buildingName ? data.buildingName : ""
    }`;
    dispatch(toggleOpen());
  };

  // const openAddressPopup = () => {
  //   open({
  //     onComplete: completeHandler,
  //   });
  // };

  const openAddressPopup = () => {
    open({
      onComplete: (data) => {
        setEditedUserInfo((prev) => ({
          ...prev,
          address: data.address,
          detailedAddress: `${data.bname} ${data.buildingName || ""}`,
        }));
        dispatch(toggleOpen());
      },
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const userId = userInfo[0]?.docId; // userInfo[0]에 저장된 문서 ID를 가져옴

  //   if (userId) {
  //     // 유저 정보 업데이트
  //     dispatch(
  //       userInfoUpdate({
  //         collectionName: "users", // 컬렉션 이름
  //         docId: userId, // 업데이트할 유저의 문서 ID
  //         updateObj: { [name]: value }, // 업데이트할 필드와 값
  //       })
  //     );
  //   } else {
  //     console.error("User ID를 찾을 수 없습니다.");
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSave = async () => {
  //   const userId = userInfo[0]?.docId;
  //   console.log(`유저docId확인`, userId);

  //   if (userId) {
  //     try {
  //       let profileImageUrl = previewUrl;

  //       if (file) {
  //         profileImageUrl = await uploadProfileImage(file);
  //       }
  //       await dispatch(
  //         userInfoUpdate({
  //           collectionName: "users",
  //           docId: userId,
  //           updateObj: { ...editedUserInfo, profileImages: profileImageUrl },
  //         })
  //       );

  //       alert("저장 완료");
  //       setIsEditing(false);
  //     } catch (error) {
  //       console.error("저장 실패:", error);
  //     }
  //   }
  // };

  const handleSave = async () => {
    const userId = userInfo[0]?.docId;
    if (userId) {
      try {
        let profileImageUrl = previewUrl;

        if (file) {
          profileImageUrl = await uploadProfileImage(file);
        }

        // Firestore에 업데이트 요청
        await dispatch(
          userInfoUpdate({
            collectionName: "users",
            docId: userId,
            updateObj: { ...editedUserInfo, profileImages: profileImageUrl },
          })
        );

        alert("저장 완료");

        // 최신 유저 정보 다시 불러오기
        await dispatch(fetchUser());

        // 상태 변경하여 편집 모드 종료
        setIsEditing(false);

        // 새로고침 (필요한 경우)
        // window.location.reload();
      } catch (error) {
        console.error("저장 실패:", error);
      }
    }
  };
  return (
    <div className="container">
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
              value={editedUserInfo.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <span>닉네임 :</span>
            <input
              name="nickname"
              value={editedUserInfo.nickname}
              onChange={handleChange}
            />
          </div>
          <div>
            <span>이메일 :</span>
            <input
              name="email"
              type="email"
              value={userInfo[0]?.email || ""}
              readOnly
            />
          </div>
          <div>
            <span>핸드폰 번호 :</span>
            <input
              name="phone"
              type="tel"
              value={editedUserInfo.phone}
              onChange={handleChange}
            />
          </div>
          <div className={styles.addr}>
            <span>주소 :</span>
            <input
              placeholder="주소"
              value={editedUserInfo.address}
              readOnly
              className={styles.addrIP}
            />
          </div>
          <div className={styles.addr2Wrapper}>
            <input
              placeholder="상세주소"
              className={styles.addr2}
              value={editedUserInfo.detailedAddress}
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
