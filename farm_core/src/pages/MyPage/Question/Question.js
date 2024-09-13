import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Question.module.scss";
import { addDatas, useFetchCollectionData } from "../../../firebase";
import { useSelector } from "react-redux";
import kroDate from "../../../utils/korDate";

function Question(props) {
  // Fetch user data
  useFetchCollectionData("users");

  // Get user data from Redux state
  const users = useSelector((state) => state.userInfoEditSlice.userInfo);
  const INITIALDATA = {
    category: "koreaCow",
    name: users[0]?.name || "",
    message: "",
  };

  // Log the fetched user data
  console.log("Fetched users from Redux: ", users);

  const [formData, setFormData] = useState(INITIALDATA);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addObj = {
        category: formData.category,
        name: formData.name,
        message: formData.name,
        docId: users[0].docId,
        userEmail: users[0].email,
        userPhoneNumber: users[0].phone,
        createdAt: kroDate(),
        communityType: "question",
      };
      await addDatas("community", addObj);
      alert("문의 사항이 성공적으로 저장되었습니다");
      setFormData(INITIALDATA);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("문의사항 저장에 실패했습니다.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page">
      <div className={styles.contact}>
        <h2>연락처 및 문의</h2>
        <p>이메일: FarmCore@gmail.com</p>
        <p>전화번호: 070-7111-1020</p>
        <form onSubmit={handleSubmit}>
          <div className="category-name-container">
            <div>
              <label htmlFor="category">카테고리 :</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="KoreaCow">한우</option>
                <option value="DiaryCow">낙농</option>
                <option value="EggChicken">산란계</option>
                <option value="Chicken">육계</option>
                <option value="Pork">양돈</option>
              </select>
            </div>
            <div>
              <label htmlFor="name">이름 :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className={styles.box}>
            <label htmlFor="message">문의 내용:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">저장하기</button>
        </form>
      </div>
    </div>
  );
}

export default Question;
