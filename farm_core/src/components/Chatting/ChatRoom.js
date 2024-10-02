import React, { useEffect, useRef, useState } from "react";
import { Avatar, styled } from "@mui/material";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import * as FaIcons from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import styles from "./ChatRoom.module.scss";
import { addMessage, getUserAuth } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import someone from "../../img/person.png";
import { fetchChattingMessage } from "../../store/chattingSlice/chattingSlice";

function ChatRoom({ chattingUser }) {
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const { uid, email } = auth?.currentUser;
  const now = serverTimestamp();
  const [inputValue, setInputValue] = useState("");
  const [chatRoomName, setChatRoomName] = useState("");
  // const { messages, chattingUser, isLoading } = useSelector(
  const { messages, isLoading } = useSelector((state) => state.chattingSlice);
  // 상대 이메일 선별 (선별된 데이터 :filteredUser )
  const filteredUser = chattingUser.filter(
    (item) => item.user1.email === chatRoomName
  );
  const selectDocId = chatRoomName && filteredUser[0].docId;

  const { userInfo } = useSelector((state) => state.userInfoEditSlice);

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

  const sendMessage = (e) => {
    e.preventDefault();
    const addObj = {
      // createdAt: now,
      profileUrl: chatRoomName && filteredUser[0].user2.photoUrl,
      text: inputValue,
      uid: uid,
    };
    addMessage("chatting", selectDocId, "chattingRoom", addObj);
    setInputValue("");
  };

  useEffect(() => {
    dispatch(
      fetchChattingMessage({
        collectionName: "chatting",
        docId: selectDocId,
        subCollectionName: "chattingRoom",
      })
    );
    // setSubCollectionData(RTdata);
  }, [chatRoomName]);

  return (
    <>
      <nav className={styles.chatRoomNav}>
        {chattingUser?.map((item, idx) => {
          const { name, photoUrl, email } = item.user1;
          return (
            <Stack direction="row" spacing={1} key={idx}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <button className={styles.BadgeBtn}>
                  <Avatar
                    alt={email}
                    src={photoUrl}
                    sx={{ width: 56, height: 56 }}
                    onClick={(e) => {
                      chatRoomName !== e.target.alt
                        ? setChatRoomName(e.target.alt)
                        : setChatRoomName("");
                    }}
                  />
                </button>
              </StyledBadge>
            </Stack>
          );
        })}
      </nav>
      {chatRoomName ? (
        <section>
          <main className={styles.message}>
            {messages?.map((item, idx) => {
              if (!chattingUser) {
                <div></div>;
              } else {
                const myProfile = item?.profileUrl;
                // const filteredData = chattingUser?.filter(
                //   (item) => item.docId == email
                // );
                // const filterUrl = filteredData[0]?.chattingRoom;
                // const selectData = filterUrl?.filter(
                //   (item) => item.userName == chatRoomName
                // );
                // const selectUrl = selectData[0]?.photoUrl;
                if (item.uid === uid) {
                  return (
                    <ChatMessage
                      message={item}
                      chatRoomName={chatRoomName}
                      photoUrl={myProfile ? myProfile : someone}
                      send
                      key={idx}
                    />
                  );
                } else {
                  return (
                    <ChatMessage
                      message={item}
                      photoUrl={myProfile ? myProfile : someone}
                      chatRoomName={chatRoomName}
                      key={idx}
                    />
                  );
                }
              }
            })}
          </main>

          <form onSubmit={sendMessage} className={styles.sendForm}>
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button disabled={!inputValue} type="submit">
              <FaIcons.FaPaperPlane />
            </button>
          </form>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export default ChatRoom;
