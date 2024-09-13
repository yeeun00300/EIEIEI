import React, { useEffect, useRef, useState } from "react";
import { Avatar, styled } from "@mui/material";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import * as FaIcons from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import styles from "./ChatRoom.module.scss";
import {
  addMessage,
  db,
  getCollection,
  getQuery,
  getUserAuth,
} from "../../firebase";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChattingMessage,
  fetchChattingUser,
} from "../../store/chattingSlice/chattingSlice";
import someone from "../../img/person.png";
import { fetchUser } from "../../store/userInfoEditSlice/UserInfoEditSlice";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Button from "react-bootstrap/Button";
import AddChatName from "./AddChatName";

function ChatRoom({ chattingRoom }) {
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const { uid, email } = auth?.currentUser;
  const now = serverTimestamp();
  const [inputValue, setInputValue] = useState("");
  const { messages, chattingUser, isLoading } = useSelector(
    (state) => state.chattingSlice
  );
  const [chatRoomName, setChatRoomName] = useState("");
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);

  // function getSubCollection(collectionName, docId, subCollection) {
  //   const userDocRef = doc(db, collectionName, docId);
  //   return collection(userDocRef, subCollection);
  // }
  // function getSubQuery(collectionName, docId, subCollection, queryOptions) {
  //   const { conditions = [], orderBys = [], limits } = queryOptions;
  //   const collect = getSubCollection(collectionName, docId, subCollection);
  //   let q = query(collect);

  //   conditions.forEach((condition) => {
  //     q = query(q, where(condition.field, condition.operator, condition.value));
  //   });

  //   orderBys.forEach((order) => {
  //     q = query(q, orderBy(order.field, order.direction || "desc"));
  //   });

  //   q = query(q, limit(limits));

  //   return q;
  // }

  // const conditions = [];
  // const orderBys = [{ field: "createdAt", direction: "desc" }];
  // const LIMITS = 100;
  // const q = getSubQuery("chatting", email, "Karina", {
  //   conditions,
  //   orderBys,
  //   limit: LIMITS,
  // });
  // const abc = useCollectionData(q);
  // const RTdata = abc[0];

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
    dispatch(
      fetchChattingUser({
        collectionName: "chatting",
        queryOptions: {},
      })
    );
    dispatch(
      fetchUser({
        collectionName: "users",
        queryOptions: {
          conditions: [{ field: "email", operator: "==", value: email }],
        },
      })
    );
    // setSubCollectionData(RTdata);
  }, []);

  return (
    <>
      <nav className={styles.chatRoomNav}>
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
                  className={styles.BadgeBtn}
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
        <AddChatName />
        {/* <button className={styles.DarkBtn} onClick={addBadge}>
          +
        </button> */}
      </nav>
      {chatRoomName ? (
        <section>
          <main className={styles.message}>
            {messages?.map((item, idx) => {
              if (!chattingUser) {
                <div></div>;
              } else {
                const myProfile = userInfo[0]?.profileImages;
                const filteredData = chattingUser?.filter(
                  (item) => item.docId == email
                );
                const filterUrl = filteredData[0]?.chattingRoom;
                const selectData = filterUrl?.filter(
                  (item) => item.userName == chatRoomName
                );
                const selectUrl = selectData[0]?.photoUrl;
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
                      photoUrl={selectUrl ? selectUrl : someone}
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
