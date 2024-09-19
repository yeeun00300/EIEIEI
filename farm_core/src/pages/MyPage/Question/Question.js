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
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

function UserInfo() {
  const users = useSelector((state) => state.userInfoEditSlice.userInfo);
  const [formData, setFormData] = useState({
    stockType: "koreanCow",
    nickname: users[0]?.nickname || "",
    message: "",
    file: null,
    filePreview: null,
    isEditing: false,
  });
  const [questions, setQuestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        docId: users[0].docId,
        userEmail: users[0].email,
        userPhoneNumber: users[0].phone,
        createdAt: new Date().toLocaleDateString(), // Modify with your date function
        communityType: "question",
        imageUrl: fileUrl,
      };

      if (isEditing) {
        await updateDatas("community", editingQuestion.docId, addObj);
        alert("문의 사항이 성공적으로 수정되었습니다");
      } else {
        await addDatas("community", addObj);
        alert("문의 사항이 성공적으로 저장되었습니다");
      }

      setFormData({
        stockType: "koreanCow",
        nickname: users[0]?.nickname || "",
        message: "",
        file: null,
        filePreview: null,
        isEditing: false,
      });
      setIsEditing(false);
      setEditingQuestion(null);
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding or updating document: ", error);
      alert("문의사항 저장 또는 수정에 실패했습니다.");
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData({
      stockType: question.stockType,
      nickname: question.nickname,
      message: question.message,
      file: null,
      filePreview: question.imageUrl || null,
      isEditing: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDatas("community", docId);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== docId)
      );
      alert("문의 사항이 성공적으로 삭제되었습니다");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("문의사항 삭제에 실패했습니다.");
    }
  };

  const handleAddClick = () => {
    setFormData({
      stockType: "koreanCow",
      nickname: users[0]?.nickname || "",
      message: "",
      file: null,
      filePreview: null,
      isEditing: false,
    });
    setIsAdding(true);
  };

  return (
    <div className={styles.page}>
      {(isAdding || isEditing) && (
        <Box className={styles.contact}>
          <Typography variant="h2">
            {isEditing ? "문의 수정" : "문의 추가"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className={styles.box}>
              <TextField
                select
                id="stockType"
                name="stockType"
                label="가축 종류"
                value={formData.stockType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="koreanCow">한우</MenuItem>
                <MenuItem value="dairyCow">낙농</MenuItem>
                <MenuItem value="eggChicken">산란계</MenuItem>
                <MenuItem value="chicken">육계</MenuItem>
                <MenuItem value="pork">양돈</MenuItem>
              </TextField>
            </Box>
            <Box className={styles.box}>
              <TextField
                id="nickname"
                name="nickname"
                label="닉네임"
                value={formData.nickname}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Box>
            <Box className={styles.box}>
              <TextField
                id="message"
                name="message"
                label="문의 내용"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box className={styles.box}>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file">
                <Button variant="contained" component="span">
                  첨부파일
                </Button>
              </label>
              {formData.filePreview && (
                <Box className={styles.imagePreview}>
                  <img src={formData.filePreview} alt="Preview" />
                </Box>
              )}
            </Box>
            <Box className={styles.box}>
              <Button type="submit" variant="contained" color="primary">
                {formData.isEditing ? "수정하기" : "저장하기"}
              </Button>
              {formData.isEditing && (
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsAdding(false)}
                >
                  취소하기
                </Button>
              )}
            </Box>
          </form>
        </Box>
      )}
      {!isAdding && !isEditing && (
        <Box className={styles.listContainer}>
          <Typography variant="h2" className={styles.listHeader}>
            문의 목록
          </Typography>
          <List>
            {questions.map((question) => (
              <ListItem key={question.id} className={styles.listItem}>
                <Box className={styles.itemDetails}>
                  <ListItemText
                    primary={`${question.stockType} - ${question.message}`}
                    secondary={`작성일: ${question.createdAt}`}
                  />
                </Box>
                <Box className={styles.itemActions}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(question)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(question.id)}
                  >
                    삭제
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            className={styles.addQuestionButton}
            onClick={handleAddClick}
          >
            새 문의하기
          </Button>
        </Box>
      )}
    </div>
  );
}

export default UserInfo;
