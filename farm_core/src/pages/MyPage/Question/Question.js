import React, { useState, useEffect } from "react";
import styles from "./Question.module.scss";
import {
  addDatas,
  updateDatas,
  deleteDatas,
  uploadImage,
  getDatas,
  getSubCollection,
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

function Question() {
  const users = useSelector((state) => state.userInfoEditSlice.userInfo);
  const [formData, setFormData] = useState({
    stockType: "koreanCow",
    authorNickName: users[0]?.nickname || "",
    message: "",
    file: null,
    filePreview: null,
    isEditing: false,
  });
  const [questions, setQuestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // 선택한 질문을 저장할 상태
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchQuestions = async () => {
      const queryOptions = {
        conditions: [
          { field: "communityType", operator: "==", value: "question" },
          { field: "email", operator: "==", value: email },
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
        authorNickName: formData.authorNickName,
        message: formData.message,
        docId: users[0].docId,
        email: users[0].email,
        userPhoneNumber: users[0].phone,
        createdAt: new Date().toLocaleDateString(),
        communityType: "question",
        imageUrl: fileUrl,
      };

      if (isEditing) {
        // 이미 존재하는 문서일 경우 업데이트
        await updateDatas("community", editingQuestion.id, addObj);
        alert("문의 사항이 성공적으로 수정되었습니다");
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === editingQuestion.id ? { ...q, ...addObj } : q
          )
        );
      } else {
        // 새로운 문서 추가
        const addedDocRef = await addDatas("community", addObj);
        const newQuestion = { ...addObj, id: addedDocRef.id }; // Firestore에서 반환된 ID 사용
        alert("문의 사항이 성공적으로 저장되었습니다");
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
      }

      setFormData({
        stockType: "koreanCow",
        authorNickName: users[0]?.nickname || "",
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
      authorNickName: question.authorNickName,
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
      authorNickName: users[0]?.nickname || "",
      message: "",
      file: null,
      filePreview: null,
      isEditing: false,
    });
    setIsAdding(true); // 문의 추가 모드로 변경
  };

  const handleViewAnswers = async (question) => {
    try {
      const adminResponse = await getSubCollection(
        "community",
        question.id,
        "comments"
      );
      setSelectedQuestion({ ...question, adminResponse });
    } catch (error) {
      console.error("Error fetching answers: ", error);
    }
  };
  return (
    <div className="container">
      {/* 문의 추가 버튼 */}
      {!isAdding && !isEditing && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          className={styles.addButton}
        >
          문의 추가
        </Button>
      )}

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
                id="nickname
"
                name="nickname
"
                label="닉네임"
                value={formData.authorNickName}
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
                <Button
                  variant="contained"
                  component="span"
                  className={styles.addFileBtn}
                >
                  첨부파일
                </Button>
              </label>
              {formData.filePreview && (
                <Box className={styles.imagePreview}>
                  <img src={formData.filePreview} alt="미리보기" />
                </Box>
              )}
            </Box>
            <Box className={styles.box}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.addFileBtn}
              >
                {isEditing ? "수정하기" : "문의하기"}
              </Button>
            </Box>
          </form>
        </Box>
      )}

      {!isAdding && !isEditing && (
        <Box className={styles.listContainer}>
          <Typography variant="h4" className={styles.listHeader}>
            문의 사항 목록
          </Typography>
          <List>
            {questions.map((question) => (
              <ListItem key={question.id} className={styles.listItem}>
                <ListItemText
                  primary={`${question.authorNickName} 님의 문의`}
                  secondary={question.message}
                />
                <Box className={styles.itemActions}>
                  {question.imageUrl && (
                    <img
                      src={question.imageUrl}
                      alt="첨부 이미지"
                      className={styles.imagePreviewSmall}
                    />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(question)}
                    className={styles.editDeleteBtn}
                  >
                    수정
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(question.id)}
                    className={styles.editDeleteBtn}
                  >
                    삭제
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleViewAnswers(question)} // 문의 내역 보기
                    className={styles.viewAnswerBtn}
                  >
                    답변 보기
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* 선택한 문의의 관리자 답변 표시 */}
      {selectedQuestion && (
        <Box className={styles.adminResponseContainer}>
          <Typography variant="h5">문의 내용</Typography>
          <Typography variant="body1">{selectedQuestion.message}</Typography>
          <Typography variant="h6">관리자 답변</Typography>
          {selectedQuestion.adminResponse &&
            selectedQuestion.adminResponse.map((response, index) => (
              <Typography key={index} variant="body2">
                {response.subContent}
              </Typography>
            ))}
          <Button
            variant="contained"
            onClick={() => setSelectedQuestion(null)} // 선택 해제
            className={styles.closeResponseBtn}
          >
            닫기
          </Button>
        </Box>
      )}
    </div>
  );
}

export default Question;
