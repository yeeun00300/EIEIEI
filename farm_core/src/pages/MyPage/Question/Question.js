import React, { useState, useEffect } from "react";
import styles from "./Question.module.scss";
import {
  addDatas,
  updateDatas,
  deleteDatas,
  uploadImage,
  useFetchCollectionData,
  getDatas,
} from "../../../firebase";
import { useSelector } from "react-redux";
import kroDate from "../../../utils/korDate";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, List, ListItem, ListItemText } from "@mui/material";

function Question() {
  useFetchCollectionData("users");

  const users = useSelector((state) => state.userInfoEditSlice.userInfo) || [];

  const INITIALDATA = {
    stockType: "koreaCow",
    nickname: users[0]?.nickname || "",
    message: "",
    file: null,
    filePreview: null,
    isEditing: false,
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIALDATA);
  const [questions, setQuestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const queryOptions = {
        conditions: [
          { field: "communityType", operator: "==", value: "question" },
        ],
      };
      const fetchedQuestions = await getDatas("community", queryOptions);

      const rowsWithId = fetchedQuestions.map((question) => ({
        ...question,
        id: question.docId,
      }));

      setQuestions(rowsWithId);
    };
    fetchQuestions();
  }, []);

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

  const updateQuestions = async () => {
    const queryOptions = {
      conditions: [
        { field: "communityType", operator: "==", value: "question" },
      ],
    };
    const fetchedQuestions = await getDatas("community", queryOptions);

    const rowsWithId = fetchedQuestions.map((question) => ({
      ...question,
      id: question.docId,
    }));

    setQuestions(rowsWithId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!users[0]?.docId) {
      console.error("User DocID is missing.");
      alert("사용자 정보를 확인할 수 없습니다.");
      return;
    }

    try {
      let fileUrl = "";
      if (formData.file) {
        fileUrl = await uploadImage(
          `images/${formData.file.name}`,
          formData.file
        );
      }

      const addObj = {
        stockType: formData.stockType,
        nickname: formData.nickname,
        message: formData.message,
        docId: users[0]?.docId,
        userEmail: users[0]?.email,
        userPhoneNumber: users[0]?.phone,
        createdAt: kroDate(),
        communityType: "question",
        imageUrl: fileUrl,
      };

      if (isEditing && editingQuestion) {
        await updateDatas("community", editingQuestion.docId, addObj);
        alert("문의 사항이 성공적으로 수정되었습니다");
      } else {
        await addDatas("community", addObj);
        alert("문의 사항이 성공적으로 저장되었습니다");
      }

      setFormData(INITIALDATA);
      setIsEditing(false);
      setEditingQuestion(null);
      updateQuestions(); // Update the questions list
    } catch (error) {
      console.error("Error adding or updating document: ", error);
      alert("문의사항 저장 또는 수정에 실패했습니다.");
    }
  };

  const handleEdit = (question) => {
    console.log(question);
    setEditingQuestion(question);
    setFormData({
      stockType: question.stockType,
      nickname: question.nickname,
      message: question.message,
      file: null,
      filePreview: null,
      isEditing: true,
    });
    setIsEditing(question);
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDatas("community", docId);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.docId !== docId)
      );
      alert("문의 사항이 성공적으로 삭제되었습니다");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("문의사항 삭제에 실패했습니다.");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "stockType", headerName: "가축 종류", width: 150 },
    { field: "message", headerName: "문의 내용", width: 300 },
    { field: "createdAt", headerName: "작성일", width: 200 },
    {
      field: "actions",
      headerName: "액션",
      width: 200,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row)}>수정</button>
          <button onClick={() => handleDelete(params.row.docId)}>삭제</button>
        </div>
      ),
    },
  ];

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
                  <option value="KoreaCow">한우</option>
                  <option value="DiaryCow">낙농</option>
                  <option value="EggChicken">산란계</option>
                  <option value="Chicken">육계</option>
                  <option value="Pork">양돈</option>
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
            <div className={styles.fileUpload}>
              <label htmlFor="file">첨부파일:</label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.filePreview && (
                <div className={styles.imagePreview}>
                  <img src={formData.filePreview} />
                </div>
              )}
            </div>
            <button type="submit">
              {formData.isEditing ? "수정하기" : "저장하기"}
            </button>
            {formData.isEditing && (
              <button type="button" onClick={() => setIsEditing(false)}>
                취소하기
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className={styles.listContainer}>
          <h2 className={styles.listHeader}>문의 목록</h2>
          <List>
            {questions.map((question) => (
              <ListItem key={question.id} className={styles.listItem}>
                <div className={styles.itemDetails}>
                  <ListItemText
                    primary={`[${question.stockType}] ${question.message}`}
                    secondary={`작성일: ${question.createdAt}`}
                  />
                </div>
                {question.imageUrl && (
                  <div className={styles.imagePreview}>
                    <img src={question.imageUrl} />
                  </div>
                )}

                <div className={styles.itemActions}>
                  <Button onClick={() => handleEdit(question)}>수정</Button>
                  <Button onClick={() => handleDelete(question.id)}>
                    삭제
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
          <button
            className={styles.addQuestionButton}
            onClick={() => setIsEditing(true)}
          >
            새 문의하기
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;
