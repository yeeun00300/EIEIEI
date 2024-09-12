import React, { useEffect, useState } from "react";
import { getUserAuth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Chatting.module.scss";
import ChatRoom from "./ChatRoom";
import Tooltip from "@mui/material/Tooltip";
import Karina1 from "../../img/Karina1.jpg";
import Karina2 from "../../img/Karina2.jpg";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchChattingMessage,
  fetchChattingRoom,
} from "../../store/chattingSlice/chattingSlice";

function Chatting() {
  const dispatch = useDispatch();
  const [chatRoomName, setChatRoomName] = useState("");
  const { chattingRoom } = useSelector((state) => state.chattingSlice);

  const email = localStorage.getItem("email");
  // const filteredData = chattingRoom.filter((item) => item.docId === email);
  // const chatBadge = [
  //   { name: "me", img: someone, message: "안녕?" },
  //   { name: "Karina", img: Karina1, message: "누구세요", send: "received" },
  //   { name: "JiMin", img: Karina2, message: "누구?", send: "received" },
  // ];

  // };

  useEffect(() => {
    dispatch(
      fetchChattingRoom({
        collectionName: "chatting",
        queryOptions: {
          condition: {},
        },
      })
    );
  }, []);

  return (
    <div className={styles.Chatting}>
      {chattingRoom ? (
        <header>
          <h4>채팅방</h4>
        </header>
      ) : (
        <></>
      )}
      <ChatRoom
        chattingRoom={chattingRoom}
        chatRoomName={chatRoomName}
        setChatRoomName={setChatRoomName}
      />
    </div>
  );
}

export default Chatting;
