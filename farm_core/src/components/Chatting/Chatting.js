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
  fetchChattingUser,
} from "../../store/chattingSlice/chattingSlice";

function Chatting() {
  const dispatch = useDispatch();
  const { chattingRoom, isLoading, chattingUser } = useSelector(
    (state) => state.chattingSlice
  );
  const email = localStorage.getItem("email");

  // 사용자 이메일 선별 (선별된 데이터 :filteredUser )
  const filteredUser = chattingUser.filter(
    (item) => item.user1.email === email
  );
  // filterUserArr.push(filteredUser);
  useEffect(() => {
    dispatch(
      fetchChattingUser({
        collectionName: "chatting",
        queryOptions: {
          conditions: [{ field: "user2.email", operator: "==", value: email }],
        },
      })
    );
  }, []);

  return (
    <div className={styles.Chatting}>
      <header>
        <h4>채팅방</h4>
      </header>
      <ChatRoom chattingUser={chattingUser} />
      {/* <ChatRoom /> */}
      <button className="globalBtn">.globalBtn</button>
      <button className="reverseGlobalBtn">.reverseGlobalBtn</button>
      <button className="globalDeleteBtn">.globalDeleteBtn</button>
      <button className="reverseGlobalDeleteBtn">
        .reverseGlobalDeleteBtn
      </button>
      <button className="globalEditBtn">.globalEditBtn</button>
      <button className="reverseGlobalEditBtn">.reverseGlobalEditBtn</button>
    </div>
  );
}

export default Chatting;
