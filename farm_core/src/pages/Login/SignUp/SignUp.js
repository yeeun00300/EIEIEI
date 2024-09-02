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
  setIdCheck,
  setImgFile,
  setUsername,
} from "../../../store/joinUserSlice/joinUserSlice";
import { useDispatch, useSelector } from "react-redux";

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

    passwordError,
    passwordMatchError,
    passwordMatchSuccess,
    idCheck,
    id,
    idCheckMessage,
  } = useSelector((state) => state.user);
  const addressPopup = useSelector((state) => state.user.addressPopup);
  const imgRef = useRef();

  useEffect(() => {
    const kakaoKey = "6d4fbd00bc61fb974013babde4a96588";
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUsername({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userObj = {
        id,
        name: username,
        email,
        address,
        detailedAddress,
        farm,
        createdAt: new Date(),
      };

      console.log(`테스트용${userObj.detailedAddress}`);
      await addDatas("users", userObj);
      console.log(userObj);
      alert("회원가입에 성공했습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      console.error("회원가입 실패:", error);
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setImgFile(reader.result));
    };
  };

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
        {imgFile ? (
          <img src={imgFile} alt="프로필 이미지" />
        ) : (
          <FaImage size={100} />
        )}
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImgFile}
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
          {addressPopup && <Address onComplete={handleComplete} />}
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
