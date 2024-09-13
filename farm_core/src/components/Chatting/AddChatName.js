import React, { useState } from "react";
import styles from "./AddChatName.module.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Karina2 from "../../img/Karina2.jpg";

function AddChatName() {
  const [openCard, setOpenCard] = useState(false);
  const [searchCard, setSearchCard] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addBadge = (e) => {
    if (openCard == false) {
      setOpenCard(true);
    } else if (openCard == true) {
      setOpenCard(false);
    }
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
    setOpenCard(false);
    setSearchCard(false);
  };

  return (
    <div className={styles.AddChatName}>
      <button className={styles.addBtn} onClick={addBadge}>
        +
      </button>
      {openCard && (
        <div className={styles.AddUser}>
          <form className={styles.searchEmail} onSubmit={searchClick}>
            <input type="이메일" placeholder="상대 이메일" />
            <button
              onClick={(e) => {
                setInputValue(e.target.value);
              }}
            >
              찾기
            </button>
          </form>
          {searchCard && (
            <form onSubmit={submitBadge}>
              <div className={styles.searchBadge}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={Karina2} />
                  <Card.Body>
                    <Card.Title>name</Card.Title>
                    <Card.Text>email</Card.Text>
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
