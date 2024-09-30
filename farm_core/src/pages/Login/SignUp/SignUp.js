import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
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
  setBirthday,
  setEmail,
  setFarm,
  setIdCheck,
  setImgFile,
  setIsPhoneVerified,
  setNickname,
  setPhone,
  setPhoneVerificationCode,
  setPhoneVerificationStatus,
  setRecaptchaVerifier,
  setUsername,
} from "../../../store/joinUserSlice/joinUserSlice";
import { useDispatch, useSelector } from "react-redux";

import { uploadProfileImage } from "../../../store/profileImageSlice/profileImageSlice";
import profileImageSlice from "./../../../store/profileImageSlice/profileImageSlice";
import { joinUser } from "./../../../firebase";
import kroDate from "../../../utils/korDate";
import { addUser } from "../../../store/userInfoEditSlice/UserInfoEditSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const {
    username,
    email,
    address,
    detailedAddress,
    farm,
    nickname,
    phone = "",
    birthday,
    imgFile,
    addressPopup,
    passwordError,
    passwordMatchError,
    passwordMatchSuccess,
    idCheck,
    id,
    idCheckMessage,
    phoneVerificationCode,
    phoneVerificationStatus,
    recaptchaVerifier,
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
      //   const kakaoKey = "6d4fbd00bc61fb974013babde4a96588";
      //   if (window.Kakao && !window.Kakao.isInitialized()) {
      //     window.Kakao.init(kakaoKey);
      //   }
      // }, []);
    }
    const emailFromStorage = localStorage.getItem("email");
    // console.log("LocalStorage에서 가져온 이메일:", emailFromStorage);
    if (emailFromStorage) {
      dispatch(setEmail(emailFromStorage));
    } else {
      // console.log("LocalStorage에 이메일이 없습니다.");
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (!recaptchaVerifier) {
  //     const verifier = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           console.log("reCAPTCHA solved");
  //         },
  //         "expired-callback": () => {
  //           console.log("reCAPTCHA expired");
  //         },
  //       },
  //       auth
  //     );
  //     dispatch(setRecaptchaVerifier(verifier));
  //   }
  // }, [recaptchaVerifier, dispatch, auth]);

  // window.recaptchaVerifier = new RecaptchaVerifier(
  //   "sign-in-button",
  //   {
  //     size: "invisible",
  //     callback: (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       // onSignInSubmit();
  //       console.log(`캡차 인증 확인`);
  //     },
  //   },
  //   auth
  // );

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // if (name === "username") {
    //   dispatch(setUsername(value));
    // } else if (name === "email") {
    //   dispatch(setEmail(value));
    // } else if (name === "address") {
    //   dispatch(
    //     setAddress({ address: value, detailedAddress: detailedAddress })
    //   );
    // } else if (name === "detailedAddress") {
    //   dispatch(setAddress({ address: address, detailedAddress: value }));
    // } else if (name === "farm") {
    //   dispatch(setFarm(value));
    // } else if (name === "phone") {
    //   dispatch(setPhone(value));
    // } else if (name === "phoneVerificationCode") {
    //   dispatch(setPhoneVerificationCode(value));
    // } else if (name === "nickname") {
    //   dispatch(setNickname(value));
    // }
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      dispatch(setPhone(numericValue));
    } else {
      switch (name) {
        case "username":
          dispatch(setUsername(value));
          break;
        case "email":
          dispatch(setEmail(value));
          break;
        case "address":
          dispatch(setAddress({ address: value, detailedAddress }));
          break;
        case "detailedAddress":
          dispatch(setAddress({ address, detailedAddress: value }));
          break;
        case "farm":
          dispatch(setFarm(value));
          break;
        case "phoneVerificationCode":
          dispatch(setPhoneVerificationCode(value));
          break;
        case "nickname":
          dispatch(setNickname(value));
          break;
        case "birthday":
          // 생년월일을 YYYY-MM-DD 형식으로 유지
          if (value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value)) {
            dispatch(setBirthday(value));
          }
          break;
        default:
          break;
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // console.log("File Info:", file);
      // console.log("File Size:", file.size);
      // console.log("File Type:", file.type);
      dispatch(uploadProfileImage(file));
    }
  };
  // const handlePhoneVerification = async () => {
  //   if (!phone) {
  //     alert("전화번호를 입력해주세요.");
  //     return;
  //   }

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       `+${phone}`,
  //       recaptchaVerifier
  //     );
  //     window.confirmationResult = confirmationResult;
  //     dispatch(setPhoneVerificationStatus("인증 코드가 발송되었습니다."));
  //   } catch (error) {
  //     dispatch(
  //       setPhoneVerificationStatus(`인증 코드 요청 실패: ${error.message}`)
  //     );
  //   }
  // };

  // // 인증 코드 확인
  // const handlePhoneVerificationSubmit = async () => {
  //   if (!phoneVerificationCode) {
  //     alert("인증 코드를 입력해주세요.");
  //     return;
  //   }

  //   try {
  //     const result = await window.confirmationResult.confirm(
  //       phoneVerificationCode
  //     );
  //     dispatch(setIsPhoneVerified(true));
  //     dispatch(setPhoneVerificationStatus("전화번호 인증이 완료되었습니다."));
  //   } catch (error) {
  //     dispatch(
  //       setPhoneVerificationStatus(`인증 코드 확인 실패: ${error.message}`)
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      alert("이미지 업로드 중입니다. 잠시만 기다려주세요.");
      return;
    }

    if (!downloadURL) {
      alert("이미지 업로드에 실패했습니다. 이미지를 다시 선택해주세요.");
      return;
    }

    const email = e.target.email.value;
    localStorage.setItem("email", email);

    const userObj = {
      id,
      name: username,
      email,
      address,
      detailedAddress,
      farm,
      nickname,
      birthday,
      phone,
      profileImages: downloadURL,
      createdAt: kroDate(),
      isActive: "Y",
      blackState: "green",
      payDate: kroDate(),
      registDate: kroDate(),
    };

    try {
      await dispatch(addUser({ collectionName: "users", userObj }));

      // addUser가 완료된 후에 navigate 호출
      alert("회원가입에 성공했습니다.");
      navigate("/", { state: { docId: id, userInfo: userObj } });
    } catch (error) {
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
    // console.log(addressPopup);
  };

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        // console.log("카카오 로그인 성공:", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            // console.log("사용자 정보:", response);
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
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h3>회원가입</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.Inputs}>
            <div>프로필 선택</div>
            {downloadURL ? (
              <img src={downloadURL} alt="프로필 이미지" />
            ) : (
              <FaImage size={90} className={styles.imgPhoto} />
            )}
            <input
              type="file"
              accept="image/*"
              id="profileImg"
              name="imgFile"
              required={true}
              onChange={handleFileChange}
              ref={imgRef}
            />
          </div>

          <div className={styles.Inputs}>
            <div>이름</div>

            <input
              placeholder="이름을 입력해주세요."
              type="text"
              name="username"
              required={true}
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className={styles.Inputs}>
            <div>닉네임</div>
            <input
              placeholder="닉네임을 입력해주세요"
              type="text"
              name="nickname"
              required={true}
              value={nickname}
              onChange={handleChange}
            />
          </div>
          <div className={styles.Inputs}>
            <div>생년월일</div>
            <input
              placeholder="YYYY-MM-DD"
              type="date"
              name="birthday"
              required={true}
              value={birthday}
              onChange={handleChange}
            />
          </div>
          <div className={styles.Inputs}>
            <div>이메일</div>
            <input
              placeholder="Email을 입력해주세요"
              type="email"
              name="email"
              required={true}
              value={email}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className={styles.Inputs}>
            <div>핸드폰 번호</div>
            <input
              placeholder="핸드폰번호를 입력해주세요"
              type="tel"
              required={true}
              name="phone"
              value={phone}
              onChange={handleChange}
              pattern="[0-9]*"
            />
          </div>

          <div className={styles.Inputs}>
            <div>주소</div>
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
            {addressPopup && <Address setcompany={handleComplete} />}
          </div>
          <div className={styles.Inputs}>
            <div></div>
            <input
              placeholder="상세주소를 입력해주세요."
              type="text"
              name="detailedAddress"
              onChange={handleChange}
              value={detailedAddress}
            />
          </div>

          <div className={styles.button}>
            <button type="submit">완료</button>
            <button type="button" onClick={() => navigate("/")}>
              취소
            </button>
          </div>
        </form>
        {/* <div id="recaptcha-container"></div> */}
      </div>
    </div>
  );
}

export default SignUp;
