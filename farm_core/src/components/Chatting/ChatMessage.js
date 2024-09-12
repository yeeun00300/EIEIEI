import React, { useEffect } from "react";
import someone from "../../img/person.png";
import styles from "./ChatMessage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchChattingMessage } from "../../store/chattingSlice/chattingSlice";

function ChatMessage({ message, chatRoomName }) {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chattingSlice);
  console.log(messages);
  const selectUid = localStorage.getItem("uid");
  const email = localStorage.getItem("email");
  useEffect(() => {
    dispatch(
      fetchChattingMessage({
        collectionName: "chatting",
        docId: email,
        subCollectionName: chatRoomName,
      })
    );
  }, []);
  return (
    <>
      {message.send == "received" ? (
        <div className={styles.received}>
          <img src={message.img} />
          <p>{message.message}</p>
          <span className="message-timestamp"></span>
        </div>
      ) : (
        <div className={styles.sent}>
          <img src={someone} />
          <p>{message.message}</p>
          <span className="message-timestamp"></span>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
