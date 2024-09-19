// src/components/Question/Question.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Question.module.scss";
import {
  fetchQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  startEditing,
  stopEditing,
} from "../../../store/myPageSlice/questionSlice";
import { useSelector as useReduxSelector } from "react-redux";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import kroDate from "../../../utils/korDate";

function Question() {
  const dispatch = useDispatch();
  const { questions, isEditing, editingQuestion } = useSelector(
    (state) => state.questions
  );
  const users =
    useReduxSelector((state) => state.userInfoEditSlice.userInfo) || [];

  const INITIALDATA = {
    stockType: "koreaCow",
    nickname: users[0]?.nickname || "",
    message: "",
    file: null,
    filePreview: null,
    isEditing: false,
  };

  const [formData, setFormData] = useState(INITIALDATA);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (isEditing && editingQuestion) {
      setFormData({
        stockType: editingQuestion.stockType,
        nickname: editingQuestion.nickname,
        message: editingQuestion.message,
        file: null,
        filePreview: editingQuestion.imageUrl || null,
        isEditing: true,
      });
    }
  }, [isEditing, editingQuestion]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file: file,
        filePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (question) => {
    dispatch(startEditing(question));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!users[0]?.docId) {
      console.error("User DocID is missing.");
      alert("사용자 정보를 확인할 수 없습니다.");
      return;
    }

    try {
      const addObj = {
        stockType: formData.stockType,
        nickname: formData.nickname,
        message: formData.message,
        docId: users[0]?.docId,
        userEmail: users[0]?.email,
        userPhoneNumber: users[0]?.phone,
        createdAt: kroDate(),
        communityType: "question",
        imageUrl: formData.filePreview,
        file: formData.file,
      };

      if (formData.isEditing) {
        await dispatch(updateQuestion({ ...addObj, id: editingQuestion.id }));
        alert("문의 사항이 성공적으로 수정되었습니다");
      } else {
        await dispatch(addQuestion(addObj));
        alert("문의 사항이 성공적으로 저장되었습니다");
      }

      setFormData(INITIALDATA);
      dispatch(stopEditing());
    } catch (error) {
      console.error("Error adding or updating document: ", error);
      alert("문의사항 저장 또는 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteQuestion(id));
      alert("문의 사항이 성공적으로 삭제되었습니다");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("문의사항 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="page">
      {isEditing ? (
        <div className={styles.contact}>
          <h2>문의 수정</h2>
          <form onSubmit={handleSubmit}>
            <div className="category-name-container">
              <div>
                <label htmlFor="stockType">가축 종류 :</label>
                <select
                  id="stockType"
                  name="stockType"
                  value={formData.stockType}
                  onChange={handleChange}
                >
                  <option value="koreanCow">한우</option>
                  <option value="dairyCow">낙농</option>
                  <option value="eggChicken">산란계</option>
                  <option value="chicken">육계</option>
                  <option value="pork">양돈</option>
                </select>
              </div>
              <div>
                <label htmlFor="nickname">닉네임 :</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
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
            <div>
              <label htmlFor="image">사진 업로드 :</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.filePreview && (
                <div>
                  <img
                    src={formData.filePreview}
                    alt="Preview"
                    width="100"
                    height="100"
                  />
                </div>
              )}
            </div>
            <button type="submit">저장</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>문의사항 리스트</h2>
          <List>
            {questions.map((question) => (
              <ListItem key={question.id}>
                <ListItemText primary={question.message} />
                <Button onClick={() => handleEdit(question)}>수정</Button>
                <Button onClick={() => handleDelete(question.id)}>삭제</Button>
              </ListItem>
            ))}
          </List>
          <div className={styles.contact}>
            <h2>문의사항 추가</h2>
            <form onSubmit={handleSubmit}>
              <div className="category-name-container">
                <div>
                  <label htmlFor="stockType">가축 종류 :</label>
                  <select
                    id="stockType"
                    name="stockType"
                    value={formData.stockType}
                    onChange={handleChange}
                  >
                    <option value="koreanCow">한우</option>
                    <option value="dairyCow">낙농</option>
                    <option value="eggChicken">산란계</option>
                    <option value="chicken">육계</option>
                    <option value="pork">양돈</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="nickname">닉네임 :</label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
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
              <div>
                <label htmlFor="image">사진 업로드 :</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {formData.filePreview && (
                  <div>
                    <img
                      src={formData.filePreview}
                      alt="Preview"
                      width="100"
                      height="100"
                    />
                  </div>
                )}
              </div>
              <button type="submit">저장</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
