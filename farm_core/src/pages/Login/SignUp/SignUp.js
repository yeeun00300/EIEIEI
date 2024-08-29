import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  addDatas,
  checkUserIdExists,
  db,
  getUserAuth,
  joinUser,
} from "../../../firebase";
import Address from "./../../../api/address/Address";
import logoImg from "./../../../img/TitleLogo.png";
import { FaRegUser, FaImage } from "react-icons/fa";
// import { FaImage } from "react-icons/fa6";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDatabase } from "firebase/database";

function SignUp() {
  const auth = getAuth();
  const navigator = useNavigate("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    id: "",
    password: "",
    address: "",
    farm: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [userid, setUserid] = useState("");

  const [idCheck, setIdCheck] = useState(false); // 아이디 중복 확인 여부 상태
  const [idCheckMessage, setIdCheckMessage] = useState("");
  // 주소
  const [address, setAddress] = useState({ address: "" });
  // 프로필 이미지
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const [popup, setPopup] = useState(false);
  // 비밀번호 유효성 검사
  // const checkPassword = () => {
  // const numPassword
  // };

  // 카카오 소셜 로그인
  useEffect(() => {
    const kakaoKey = "6d4fbd00bc61fb974013babde4a96588"; // 카카오 JavaScript 키
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idCheck) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    try {
      const userUid = `${values.id}_${new Date().getTime()}`;
      const userData = {
        username: values.username,
        email: values.email,
        id: values.id,
        password: values.password,
        address: address.address,
        farm: values.farm,
        createdAt: new Date().toISOString(),
      };
      await joinUser(userUid, userData);
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   values.email,
      //   values.password
      // );
      // const { user } = userCredential;
      // const

      // const userObj = {
      //   id: values.userid,
      //   name: values.username,
      //   password: values.password,
      //   email: values.email,
      //   address: values.address,
      //   farm: values.farm,
      //   createdAt: new Date(),
      //   uid: user.uid,
      // };
      // await setDoc(doc(db, "users", user.uid), values);
      // await joinUser(("users", user.uid), values);
      console.log("데이터 추가 성공");
      alert("회원가입에 성공했습니다.");

      // 회원가입 성공시 이동할 페이지
      navigator("/LogIn");
      // window.location.
    } catch (error) {
      console.error(error);
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  // 프로필 이미지
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // 아이디 중복확인
  const handleIdCheck = async () => {
    if (!values.id) {
      setIdCheckMessage("아이디를 입력해주세요.");
      return;
    }

    const exists = await checkUserIdExists(values.id);

    if (exists) {
      setIdCheck(false);
      setIdCheckMessage("이미 사용 중인 아이디입니다.");
    } else {
      setIdCheck(true);
      setIdCheckMessage("사용 가능한 아이디입니다.");
    }
  };

  // 주소찾기
  // const [enroll_company, setEnroll_company] = useState({
  //   address: "",
  // });

  // const handleInput = (e) => {
  //   setEnroll_company({
  //     ...address,
  //     // ...enroll_company,
  //     [setAddress]: e.target.value,
  //   });
  // };

  const handleComplete = (data) => {
    setAddress({
      ...address,
      // ...enroll_company,
    });
    setPopup(!popup);
  };

  // 카카오 로그인
  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공:", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            console.log("사용자 정보:", response);
            // 카카오 로그인 성공 시 처리할 로직 추가
            // navigator("/");
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
          // value={imgRef}
        />

        <div className={styles.name}>
          <div className={styles.img}>
            <FaRegUser />
          </div>
          <input
            placeholder="이름을 입력해주세요."
            type="text"
            name="username"
            value={values.username}
            // onChange={(e) => setUsername(e.target.value)}
            onChange={handleChange}
          />
        </div>
        <div>
          아이디
          <input
            placeholder="ID를 입력해주세요."
            type="text"
            name="id"
            // onChange={(e) => setUserid(e.target.value)}
            value={values.id}
            // onChange={(e) => {
            //   setUserid(e.target.value);
            //   setIdCheck(false);
            //   setIdCheckMessage("");
            // }}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleIdCheck}>
            중복확인
          </button>
          {idCheckMessage && <p>{idCheckMessage}</p>}
        </div>
        <div>
          비밀번호
          <input
            placeholder="대소문자,숫자 조합 8~16자 이내"
            type="password"
            name="password"
            value={values.password}
            // onChange={(e) => setPassword(e.target.value)}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          비밀번호 확인
          <input
            placeholder="위 비밀번호와 동일하게 입력해주세요."
            type="password"
            // value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          이메일
          <input
            placeholder="Email을 입력해주세요"
            type="email"
            name="email"
            value={values.email}
            // onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setAddress(e.target.value)}
            // onChange={handleInput}
            value={address.address}
          />
          <button onClick={handleComplete}>우편번호 찾기</button>
          <div>
            <input placeholder="상세주소를 입력해주세요." />
          </div>
          {popup && (
            <Address company={address} setcompany={setAddress}></Address>
          )}
        </div>
        <div>
          농장 번호
          <input
            placeholder="축사 번호를 입력해주세요"
            type="number"
            name="farm"
            value={values.farm}
            onChange={handleChange}
          />
        </div>

        <div className={styles.button}>
          <button type="submit">회원가입</button>
          <button>취소</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
