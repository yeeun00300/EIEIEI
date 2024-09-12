import React, { useState } from "react";
import { getUserAuth } from "../../firebase";
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

function Chatting() {
  const auth = getUserAuth();
  const [user] = useAuthState(auth);
  const [chatRoomName, setChatRoomName] = useState("");

  const chatBadge = [
    { name: "me", img: someone, message: "안녕?" },
    { name: "Karina", img: Karina1, message: "누구세요", send: "received" },
    { name: "JiMin", img: Karina2, message: "누구?", send: "received" },
  ];

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
        <form>
          <input />
          <button>
            <FaIcons.FaPaperPlane />
          </button>
        </form>
      </section>
    </div>
  );
}

export default Chatting;
