import React, { useEffect, useState } from "react";
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
  const { chattingRoom, isLoading } = useSelector(
    (state) => state.chattingSlice
  );
  const email = localStorage.getItem("email");

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
      <header>
        <h4>채팅방</h4>
      </header>
      <ChatRoom chattingRoom={chattingRoom} />
    </div>
  );
}

export default Chatting;
