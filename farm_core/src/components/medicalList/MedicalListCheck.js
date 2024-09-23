import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../pages/MyPage/MyCommunity/MyCommunity.module.scss";
import { fetchFarmData } from "../../store/addLiveStockSlice/addLiveStockSlice"; // farm 데이터를 가져오는 액션
import { fetchFarmDocumentByEmail } from "../../firebase";
import kroDate from "../../utils/korDate";

function MedicalListCheck() {
  const dispatch = useDispatch();
  const [document, setDocument] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  // const farmData = useSelector((state) => state.AddLiveStockSlice);
  // console.log(farmData);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchData = async () => {
        try {
          const document = await fetchFarmDocumentByEmail(email);
          console.log("Fetched document:", document);
          setDocument(document);
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
  };

  const handleCloseDetails = () => {
    setSelectedDocument(null);
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
              <TableCell>{kroDate()}</TableCell> {/* 마지막 수정 시간 추가 */}
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
      {selectedDocument && (
        <div className={styles.details}>
          <h3>상세 정보</h3>
          <p>
            <strong>주소:</strong> {selectedDocument.farmAddress}
          </p>
          <p>
            <strong>축사 이름:</strong> {selectedDocument.farmName}
          </p>
          <p>
            <strong>축사 번호:</strong> {selectedDocument.farmId}
          </p>
          <p>
            <strong>축사 유형:</strong> {selectedDocument.farm_stockType}
          </p>
          <p>
            <strong>면적:</strong> {selectedDocument.farmScale}
          </p>
          <p>
            <strong>건축 연도:</strong> {selectedDocument.farmBuild}
          </p>
          <p>
            <strong>건물 상태:</strong> {selectedDocument.farmCondition}
          </p>
          <p>
            <strong>시설:</strong> {selectedDocument.facilities || "정보 없음"}
          </p>
          <p>
            <strong>보험 세부사항:</strong>{" "}
            {selectedDocument.insuranceDetail || "정보 없음"}
          </p>
          <Button onClick={handleCloseDetails}>닫기</Button>
        </div>
      )}
    </div>
  );
}

export default MedicalListCheck;
