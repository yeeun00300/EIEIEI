import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDatas, checkUserIdExists, saveUserData } from "../../../firebase";
import Address from "./../../../api/address/Address";
import logoImg from "./../../../img/TitleLogo.png";
import { FaRegUser, FaImage } from "react-icons/fa";
// import { FaImage } from "react-icons/fa6";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDatabase } from "firebase/database";
import {
  setAddress,
  setAddressPopup,
  setEmail,
  setFarm,
  setIdCheck,
  setImgFile,
  setUsername,
} from "../../../store/joinUserSlice/joinUserSlice";
import { useDispatch, useSelector } from "react-redux";

import { uploadProfileImage } from "../../../store/profileImageSlice/profileImageSlice";
import profileImageSlice from "./../../../store/profileImageSlice/profileImageSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    username,
    email,
    address,
    detailedAddress,
    farm,
    imgFile,
    addressPopup,
    passwordError,
    passwordMatchError,
    passwordMatchSuccess,
    idCheck,
    id,
    idCheckMessage,
  } = useSelector((state) => state.user);
  const { downloadURL, isLoading } =
    useSelector((state) => state.profileImageSlice) || {};
  const { uid } = useSelector((state) => state.user);
  // const { downloadURL, status, error } = useSelector((state) => state.file);
  const imgRef = useRef();

  useEffect(() => {
    const kakaoKey = "6d4fbd00bc61fb974013babde4a96588";
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      dispatch(setUsername(value));
    } else if (name === "email") {
      dispatch(setEmail(value));
    } else if (name === "address") {
      dispatch(
        setAddress({ address: value, detailedAddress: detailedAddress })
      );
    } else if (name === "detailedAddress") {
      dispatch(setAddress({ address: address, detailedAddress: value }));
    } else if (name === "farm") {
      dispatch(setFarm(value));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("File Info:", file);
      console.log("File Size:", file.size);
      console.log("File Type:", file.type);
      dispatch(uploadProfileImage(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      alert("이미지 업로드 중입니다. 잠시만 기다려주세요.");
      return;
    }

    // 이미지 업로드 실패 시 경고 메시지 출력
    if (!downloadURL) {
      alert("이미지 업로드에 실패했습니다. 이미지를 다시 선택해주세요.");
      return;
    }

    const email = e.target.email.value;
    localStorage.setItem("email", email);

    try {
      const userObj = {
        id,
        name: username,
        email,
        address,
        detailedAddress,
        farm,
        uid,
        profileImages: downloadURL,
        createdAt: new Date(),
      };

      console.log(`테스트용${userObj.detailedAddress}`);
      // await addDatas("users", userObj);
      await addDatas("users", { ...userObj, uid });
      console.log(userObj);
      alert("회원가입에 성공했습니다.");
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  // const saveImgFile = () => {
  //   const file = imgRef.current.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       dispatch(setImgFile(reader.result));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleIdCheck = async () => {
    const exists = await checkUserIdExists(id);

    if (exists) {
      dispatch(
        setIdCheck({ check: false, message: "이미 사용 중인 아이디입니다." })
      );
    } else {
      dispatch(
        setIdCheck({ check: true, message: "사용 가능한 아이디입니다." })
      );
    }
  };

  const handleComplete = (data) => {
    dispatch(
      setAddress({
        address: data.address,
        detailedAddress: data.detailedAddress || "",
      })
    );
    dispatch(setAddressPopup(false));
  };

  const openAddressPopup = () => {
    dispatch(setAddressPopup(true));
    console.log(addressPopup);
  };

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공:", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            console.log("사용자 정보:", response);
            // 카카오 로그인 성공 시 처리할 로직 추가
            // navigate("/");
          },
          fail: function (error) {
            console.error("사용자 정보 요청 실패:", error);
          },
        });
      },
      fail: function (error) {
        console.error("카카오 로그인 실패:", error);
      },
    });
  };

  return (
    <div className={styles.main}>
      <img className={styles.logo} src={logoImg} />
      <h2>Farm Core</h2>
      <h3>회원가입</h3>
      <form onSubmit={handleSubmit}>
        {downloadURL ? (
          <img src={downloadURL} alt="프로필 이미지" />
        ) : (
          <FaImage size={100} />
        )}
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          name="imgFile"
          onChange={handleFileChange}
          ref={imgRef}
        />
        <div>
          이름
          <div className={styles.name}>
            <div className={styles.img}>
              <FaRegUser />
            </div>
            <input
              placeholder="이름을 입력해주세요."
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          이메일
          <input
            placeholder="Email을 입력해주세요"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          주소
          <input
            className="user_enroll_text"
            placeholder="주소를 입력해주세요."
            type="text"
            required={true}
            name="address"
            onChange={handleChange}
            value={address}
          />
          <button type="button" onClick={openAddressPopup}>
            주소 찾기
          </button>
          <div>
            <input
              placeholder="상세주소를 입력해주세요."
              type="text"
              name="detailedAddress"
              onChange={handleChange}
              value={detailedAddress}
            />
          </div>
          {addressPopup && <Address setcompany={handleComplete} />}
        </div>
        <div>
          축사 번호
          <input
            placeholder="축사 번호를 입력해주세요"
            type="number"
            name="farm"
            value={farm}
            onChange={handleChange}
          />
        </div>
        <div className={styles.button}>
          <button type="submit">완료</button>
          <button type="button" onClick={() => navigate("/")}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
