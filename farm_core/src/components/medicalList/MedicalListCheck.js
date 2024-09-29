import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import styles from "./MedicalListCheck.module.scss";
import {
  deleteFarmDocument,
  fetchFarmDocumentByEmail,
  updateFarmDocument,
} from "../../firebase";
import kroDate from "../../utils/korDate";

function MedicalListCheck() {
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState([]); // 다수의 문서를 위한 상태
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [lastModified, setLastModified] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchData = async () => {
        try {
          // 이메일로 모든 문서 검색
          const documents = await fetchFarmDocumentByEmail(email);
          console.log("Fetched documents:", documents); // 디버깅용 로그
          setDocuments(documents); // 다수의 문서 상태에 설정
        } catch (error) {
          console.error("문서 검색 실패:", error.message || error);
        }
      };

      fetchData();
    }
  }, []);

  if (!documents.length) {
    return <p>Loading...</p>;
  }

  const handleViewDetails = (doc) => {
    setSelectedDocument(doc);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDocument(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDocument((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const currentTime = kroDate(); // 현재 시간을 lastModified로 설정
      await updateFarmDocument(selectedDocument.id, {
        ...selectedDocument,
        lastModified: currentTime,
      });

      // 업데이트된 데이터와 함께 document 상태 및 lastModified 상태 업데이트
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === selectedDocument.id
            ? { ...doc, ...selectedDocument, lastModified: currentTime }
            : doc
        )
      );
      setLastModified(currentTime);

      setIsEditing(false);
      setOpenModal(false);
      window.alert("수정이 완료되었습니다!");
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteFarmDocument(docId); // 문서 삭제 함수 호출
        setDocuments((prev) => prev.filter((doc) => doc.id !== docId)); // 삭제된 문서를 상태에서 제거
        window.alert("삭제가 완료되었습니다!");
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }
  };

  return (
    <div className={styles.checkMain}>
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.tableWrapper}>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableCellHeader}>
                축사 이름
              </TableCell>
              <TableCell className={styles.tableCellHeader}>
                축사 번호
              </TableCell>
              <TableCell className={styles.tableCellHeader}>
                마지막 수정 시간
              </TableCell>
              <TableCell className={styles.tableCellHeader}>
                정보 보기
              </TableCell>
              <TableCell className={styles.tableCellHeader}>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className={styles.stockInfo}>
                  {doc.farmName}
                </TableCell>
                <TableCell className={styles.stockInfo}>{doc.farmId}</TableCell>
                <TableCell className={styles.stockInfo}>
                  {doc.lastModified || "정보 없음"}
                </TableCell>
                <TableCell className={styles.stockInfo}>
                  <Button
                    onClick={() => handleViewDetails(doc)}
                    className="globalBtn"
                  >
                    자세히 보기
                  </Button>
                </TableCell>
                <TableCell className={styles.stockInfo}>
                  <Button
                    onClick={() => handleDelete(doc.id)}
                    className="globalDeleteBtn"
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
        <DialogTitle>{isEditing ? "수정하기" : "상세 정보"}</DialogTitle>
        <DialogContent>
          {selectedDocument && (
            <div className={styles.farmClass}>
              {isEditing ? (
                <div className={styles.inputTag}>
                  <TextField
                    label="주소"
                    name="farmAddress"
                    value={selectedDocument.farmAddress || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="축사 이름"
                    name="farmName"
                    value={selectedDocument.farmName || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="축사 번호"
                    name="farmId"
                    value={selectedDocument.farmId || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="축사 유형"
                    name="farm_stockType"
                    value={selectedDocument.farm_stockType || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="면적"
                    name="farmScale"
                    value={selectedDocument.farmScale || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="건축 연도"
                    name="farmBuild"
                    value={selectedDocument.farmBuild || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="건물 상태"
                    name="farmCondition"
                    value={selectedDocument.farmCondition || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="시설"
                    name="facilities"
                    value={selectedDocument.facilities || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="보험 세부사항"
                    name="insuranceDetail"
                    value={selectedDocument.insuranceDetail || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              ) : (
                <div className={styles.subCheckClass}>
                  <p>
                    <strong>주소:</strong>{" "}
                    {selectedDocument.farmAddress || "정보 없음"}
                  </p>
                  <p>
                    <strong>축사 이름:</strong>{" "}
                    {selectedDocument.farmName || "정보 없음"}
                  </p>
                  <p>
                    <strong>축사 번호:</strong>{" "}
                    {selectedDocument.farmId || "정보 없음"}
                  </p>
                  <p>
                    <strong>축사 유형:</strong>{" "}
                    {selectedDocument.farm_stockType || "정보 없음"}
                  </p>
                  <p>
                    <strong>면적:</strong>{" "}
                    {selectedDocument.farmScale || "정보 없음"}
                  </p>
                  <p>
                    <strong>건축 연도:</strong>{" "}
                    {selectedDocument.farmBuild || "정보 없음"}
                  </p>
                  <p>
                    <strong>건물 상태:</strong>{" "}
                    {selectedDocument.farmCondition || "정보 없음"}
                  </p>
                  <p>
                    <strong>시설:</strong>{" "}
                    {selectedDocument.facilities || "정보 없음"}
                  </p>
                  <p>
                    <strong>보험 세부사항:</strong>{" "}
                    {selectedDocument.insuranceDetail || "정보 없음"}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="globalBtn">
                저장
              </Button>
              <Button onClick={handleCloseModal} className="globalDeleteBtn">
                취소
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit} className="globalEditBtn">
                수정
              </Button>
              <Button onClick={handleCloseModal} className="globalDeleteBtn">
                닫기
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MedicalListCheck;
