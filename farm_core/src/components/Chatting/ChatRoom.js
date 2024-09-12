import React, { useEffect, useRef, useState } from "react";
import { Avatar, styled } from "@mui/material";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import * as FaIcons from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import styles from "./ChatRoom.module.scss";
import { addMessage, getDatas, getUserAuth } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { fetchChattingMessage } from "../../store/chattingSlice/chattingSlice";
import someone from "../../img/person.png";
function ChatRoom({ chattingRoom }) {
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const now = serverTimestamp();
  const [inputValue, setInputValue] = useState("");
  const [chatRoomName, setChatRoomName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { messages } = useSelector((state) => state.chattingSlice);
  const { uid, email } = auth?.currentUser;
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const sendMessage = async (e) => {
    e.preventDefault();
    const queryOptions = {
      conditions: [{ field: "email", operator: "==", value: email }],
    };
    const addObj = {
      text: inputValue,
      createdAt: now,
      uid: uid,
    };
    addMessage("chatting", email, chatRoomName, addObj);
    setInputValue("");
  };

  useEffect(() => {
    dispatch(
      fetchChattingMessage({
        collectionName: "chatting",
        docId: email,
        subCollectionName: chatRoomName,
      })
    );
  }, [chatRoomName]);
  return (
    <>
      <nav>
        {chattingRoom.chattingRoom?.map((item, idx) => {
          const { userName, photoUrl } = item;
          return (
            <Stack direction="row" spacing={1} key={idx}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <button
                  onClick={(e) => {
                    chatRoomName !== e.target.alt
                      ? setChatRoomName(e.target.alt)
                      : setChatRoomName("");
                  }}
                >
                  <Avatar
                    alt={userName}
                    src={photoUrl}
                    sx={{ width: 56, height: 56 }}
                  />
                </button>
              </StyledBadge>
            </Stack>
          );
        })}
      </nav>
      <section>
        <main className={styles.message}>
          {messages?.map((item, idx) => {
            if (item.uid === uid) {
              return (
                <ChatMessage
                  message={item}
                  chatRoomName={chatRoomName}
                  // photoUrl={someone}
                  send
                  key={idx}
                />
              );
            } else {
              return (
                <ChatMessage
                  message={item}
                  // photoUrl={photoUrl}
                  chatRoomName={chatRoomName}
                  key={idx}
                />
              );
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
    </>
  );
}

export default ChatRoom;
