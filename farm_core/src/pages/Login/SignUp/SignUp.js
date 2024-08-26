import React, { useCallback, useRef, useState } from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDatas, db, getUserAuth } from "../../../firebase";
import Address from "./../../../api/address/Address";
import logoImg from "./../../../img/TitleLogo.png";
import { FaRegUser, FaImage } from "react-icons/fa";
// import { FaImage } from "react-icons/fa6";
import { collection, doc, setDoc } from "firebase/firestore";

function SignUp() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  // 주소
  const [address, setAddress] = useState({ address: "" });
  // 프로필 이미지
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      const userObj = {
        id: userid,
        name: username,
        password: password,
        email: email,
        address: address,
        createdAt: new Date(),
        uid: user.uid,
      };
      await setDoc(doc(db, "users", user.uid), userObj);
      // await addDatas(("users", user.uid), userObj);
      console.log("데이터 추가 성공");

      // 회원가입 성공시 이동할 페이지
      // navigator(성공했을때 이동할 페이지)
      // window.location.
    } catch (error) {
      console.error(error);
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

  // 아이디 중복 확인
  // const onSubmitForm = useCallback(
  //   async (e) => {
  //     // 전화번호 중복 확인
  //     // if(){ //중복이라면
  //     //     setRegistered(true);
  //     // }

  //     // 중복이라면 경고 메세지 띄우고,
  //     if (registered) {
  //       setUserid("");
  //       return alert("이미 등록된 사용자입니다.");
  //     }
  //     const nickname = await makeNickname();
  //     await dispatch(registerAction({ role, userid, nickname }));
  //   },
  //   [role, userid]
  // );

  // 주소찾기
  // const [enroll_company, setEnroll_company] = useState({
  //   address: "",
  // });

  const [popup, setPopup] = useState(false);

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
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          아이디
          <input
            placeholder="ID를 입력해주세요."
            type="text"
            onChange={(e) => setUserid(e.target.value)}
            required
          />
          <button>중복확인</button>
        </div>
        <div>
          비밀번호
          <input
            placeholder="대소문자,숫자 조합 8~16자 이내"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          비밀번호 확인
          <input
            placeholder="위 비밀번호와 동일하게 입력해주세요."
            type="password"
          />
        </div>
        <div>
          이메일
          <input
            placeholder="Email을 입력해주세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className={styles.button}>
          <button type="submit">회원가입</button>
          <button>취소</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
