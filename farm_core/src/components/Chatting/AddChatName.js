import React, { useEffect, useState } from "react";
import styles from "./AddChatName.module.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Karina2 from "../../img/Karina2.jpg";
import someone from "../../img/person.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userInfoEditSlice/UserInfoEditSlice";

function AddChatName() {
  const dispatch = useDispatch();
  const [openCard, setOpenCard] = useState(false);
  const [searchCard, setSearchCard] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  //   console.log(selectedUser, searchEmail);
  console.log(userInfo);

  const addBadge = () => {
    setOpenCard((prevState) => !prevState);
  };

  const submitBadge = (e) => {
    e.preventDefault();

    setOpenCard(false);
  };
  const searchClick = (e) => {
    e.preventDefault();
    setSearchCard(true);
  };
  const searchComplete = (e) => {
    setSearchEmail(" ");
    setSelectedUser(" ");
    setInputValue((prevState) => prevState);
    setOpenCard(false);
    setSearchCard(false);
  };

  useEffect(() => {
    if (inputValue) {
      const queryOptions = {
        conditions: [
          { field: "email", operator: ">=", value: inputValue },
          //   { field: "name", operator: ">=", value: inputValue },
        ],
        orderBys: [{ field: "email", direction: "asc" }],
      };

      dispatch(
        fetchUser({ collectionName: "users", queryOptions: queryOptions })
      );
    }
  }, [dispatch, inputValue]);
  return (
    <div className={styles.AddChatName}>
      <button className={styles.addBtn} onClick={addBadge}>
        +
      </button>
      {openCard && (
        <div className={styles.AddUser}>
          <form
            className={styles.searchEmail}
            onSubmit={(e) => {
              e.preventDefault();
              setInputValue(e.target.elements.email.value); // 입력값 저장
              setSearchCard(true);
              if (userInfo?.length > 0) {
                const firstUser = userInfo[0];
                setSearchEmail(firstUser.email);
                setSelectedUser(firstUser);
              }
            }}
          >
            <input type="text" name="email" placeholder="상대 이메일" />
            {/* <button onClick={searchClick}>찾기</button> */}
            <button>찾기</button>
          </form>
          {searchCard && (
            <form onSubmit={submitBadge}>
              <div className={styles.searchBadge}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={selectedUser?.profileImages || someone}
                  />
                  <Card.Body>
                    <Card.Title>{selectedUser?.name || "X"}</Card.Title>
                    <Card.Text>{searchEmail || "X"}</Card.Text>
                    <Button variant="primary" onClick={searchComplete}>
                      추가하기
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default AddChatName;
