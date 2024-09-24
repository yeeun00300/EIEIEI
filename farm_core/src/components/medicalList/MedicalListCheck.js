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
import styles from "../../pages/MyPage/MyCommunity/MyCommunity.module.scss";
import { fetchFarmDocumentByEmail, updateFarmDocument } from "../../firebase";
import kroDate from "../../utils/korDate";

function MedicalListCheck() {
  const dispatch = useDispatch();
  const [document, setDocument] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [lastModified, setLastModified] = useState(null); // lastModified 상태
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchData = async () => {
        try {
          const document = await fetchFarmDocumentByEmail(email);
          setDocument(document);
          setLastModified(document.lastModified || "정보 없음"); // Firebase에서 받은 lastModified 값 설정
        } catch (error) {
          console.error("문서 검색 실패:", error.message || error);
        }
      };

      fetchData();
    }
  }, []);

  if (!document) {
    return <p>Loading...</p>;
  }

  const handleViewDetails = () => {
    setSelectedDocument(document);
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
      setDocument((prev) => ({
        ...prev,
        ...selectedDocument,
        lastModified: currentTime,
      }));
      setLastModified(currentTime);

      setIsEditing(false);
      setOpenModal(false);
      window.alert("수정이 완료되었습니다!");
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  return (
    <div>
      <TableContainer className={styles.tableContainer}>
        <Table>
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
            <TableRow key={document.farmId}>
              <TableCell>{document.farmName}</TableCell>
              <TableCell>{document.farmId}</TableCell>
              <TableCell>{lastModified || "정보 없음"}</TableCell>
              <TableCell>
                <Button onClick={handleViewDetails}>자세히 보기</Button>
              </TableCell>
              <TableCell>
                <Button>삭제</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{isEditing ? "수정하기" : "상세 정보"}</DialogTitle>
        <DialogContent>
          {selectedDocument &&
            (isEditing ? (
              <div>
                <TextField
                  label="주소"
                  name="farmAddress"
                  value={selectedDocument.farmAddress || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="축사 이름"
                  name="farmName"
                  value={selectedDocument.farmName || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="축사 번호"
                  name="farmId"
                  value={selectedDocument.farmId || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="축사 유형"
                  name="farm_stockType"
                  value={selectedDocument.farm_stockType || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="면적"
                  name="farmScale"
                  value={selectedDocument.farmScale || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="건축 연도"
                  name="farmBuild"
                  value={selectedDocument.farmBuild || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="건물 상태"
                  name="farmCondition"
                  value={selectedDocument.farmCondition || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="시설"
                  name="facilities"
                  value={selectedDocument.facilities || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="보험 세부사항"
                  name="insuranceDetail"
                  value={selectedDocument.insuranceDetail || ""}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div>
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
            ))}
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <>
              <Button onClick={handleSave}>저장</Button>
              <Button onClick={handleCloseModal}>취소</Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit}>수정</Button>
              <Button onClick={handleCloseModal}>닫기</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MedicalListCheck;
