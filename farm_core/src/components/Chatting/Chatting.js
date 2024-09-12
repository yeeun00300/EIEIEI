import React, { useEffect, useState } from "react";
import { addDatas, addMessage, getDatas, getUserAuth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Chatting.module.scss";
import ChatRoom from "./ChatRoom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Karina1 from "../../img/Karina1.jpg";
import Karina2 from "../../img/Karina2.jpg";
import someone from "../../img/person.png";
import * as FaIcons from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import { serverTimestamp } from "firebase/firestore";

function Chatting() {
  const auth = getUserAuth();
  const [user] = useAuthState(auth);
  const [chatRoomName, setChatRoomName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const now = serverTimestamp();

  const chatBadge = [
    { name: "me", img: someone, message: "안녕?" },
    { name: "Karina", img: Karina1, message: "누구세요", send: "received" },
    { name: "JiMin", img: Karina2, message: "누구?", send: "received" },
  ];
  const sendMessage = async (e) => {
    e.preventDefault();
    // 저장할 데이터 객체를 생성한다. {text, createdAt, photoUrl, uid}
    const { uid, email } = auth?.currentUser;
    const queryOptions = {
      conditions: [{ field: "email", operator: "==", value: email }],
    };
    const { profileImages } = (await getDatas("users", queryOptions))[0];
    const addObj = {
      text: inputValue,
      createdAt: now,
      photoUrl: profileImages,
      uid: uid,
    };
    // 데이터베이스에 객체를 저장한다.
    addMessage("chatting", email, chatRoomName, addObj);

    // inputValue 를 빈 문자열로 셋팅한다.
    setInputValue("");
  };
  // const handleLoad = async () => {

  // };
  useEffect(() => {
    // handleLoad();
  }, []);

  return (
    <div className={styles.Chatting}>
      <header>
        <h4>채팅방</h4>
      </header>
      <nav>
        <Stack direction="row" spacing={1}>
          {chatBadge.map((item) => {
            return (
              <ChatRoom message={item} setChatRoomName={setChatRoomName} />
            );
          })}
        </Stack>
      </nav>
      <section>
        <main className={styles.message}>
          {chatBadge.map((item) => {
            if (item.name === chatRoomName) {
              return <ChatMessage message={item} />;
            }
          })}
        </main>
        <form onSubmit={sendMessage}>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button disabled={!inputValue} type="submit">
            <FaIcons.FaPaperPlane />
          </button>
        </form>
      </section>
    </div>
  );
}

export default Chatting;
