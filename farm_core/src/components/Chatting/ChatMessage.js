import React from "react";
import styles from "./ChatMessage.module.scss";

function ChatMessage({ message, chatRoomName, send, photoUrl }) {
  const selectUid = localStorage.getItem("uid");
  const email = localStorage.getItem("email");
  // const messageClass = uid === user ? "sent" : "received";

  return (
    <>
      {!send ? (
        <div className={styles.received}>
          <img src={photoUrl} />
          <p>{message.text}</p>
          <span className="message-timestamp"></span>
        </div>
      ) : (
        <div className={styles.sent}>
          <img src={photoUrl} />
          <p>{message.text}</p>
          <span className="message-timestamp"></span>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
