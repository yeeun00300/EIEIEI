import React, { useState, useEffect } from "react";
import styles from "./MedicalListSave.module.scss";
import kroDate from "../../utils/korDate";
import {
  deleteDocument,
  fetchFarmDocumentByEmail,
  getSubCollection,
  updateSubcollectionDocument,
} from "../../firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";

function MedicalListSave() {
  const [medicalData, setMedicalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subCollectionData, setSubCollectionData] = useState([]);
  const [selectedSubData, setSelectedSubData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [deleteSubData, setDeleteSubData] = useState(null);

  const email = useSelector((state) => state.loginSlice.email);

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        try {
          const documents = await fetchFarmDocumentByEmail(email);
          if (documents && documents.length > 0) {
            // 모든 문서 가져오기
            setMedicalData(documents); // 모든 축사 데이터를 상태에 저장
            const allSubCollectionData = []; // 모든 서브 컬렉션 데이터를 담을 배열

            // 각 문서에 대해 서브컬렉션 데이터 가져오기
            for (const document of documents) {
              const subData = await getSubCollection(
                "farm",
                document.id,
                "farmCureList"
              );
              // subData에 farmId를 추가하여 allSubCollectionData에 저장
              const subDataWithFarmId = subData.map((item) => ({
                ...item,
                farmDocId: document.id,
                farmId: document.farmId, // 축사 번호 추가
              }));
              allSubCollectionData.push(...subDataWithFarmId); // 모든 서브 데이터를 추가
            }
            setSubCollectionData(allSubCollectionData); // 모든 서브 컬렉션 데이터 설정
          }
        } catch (error) {
          console.error("문서 검색 실패:", error.message || error);
        }
      };

      fetchData();
    }
  }, []);

  const handleSubDataClick = (data) => {
    setSelectedSubData(data);
    setUpdatedData(data);
    setIsModalOpen(true); // 모달을 열기
  };

  const handleEdit = () => {
    setEditing(true);
    setUpdatedData(selectedSubData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // select box의 값을 boolean으로 변환
    const newValue = value === "예";
    setUpdatedData((prev) => ({
      ...prev,
      [name]:
        name === "fever" || name === "cough" || name === "diarrhea"
          ? newValue
          : value,
    }));
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedSubData(null);
    setUpdatedData({});
    setIsModalOpen(false); // 모달 닫기
  };

  const handleCloseModal = () => {
    setSelectedSubData(null);
    setIsModalOpen(false); // 모달 닫기
  };

  const handleSave = async () => {
    try {
      const currentTime = kroDate();
      const updatedSubData = {
        ...updatedData,
        lastModified: currentTime,
      };

      // medicalData[0]와 selectedSubData.docId가 유효한지 확인
      if (!selectedSubData?.docId || !selectedSubData?.farmDocId) {
        throw new Error("업데이트할 문서 또는 서브컬렉션 문서 ID가 없습니다.");
      }

      await updateSubcollectionDocument(
        selectedSubData.farmDocId, // 첫 번째 문서의 ID 사용
        "farmCureList",
        selectedSubData.docId,
        updatedSubData
      );

      // 기존 데이터 업데이트
      setSubCollectionData((prevData) => {
        return prevData.map((item) => {
          if (item.docId === selectedSubData.docId) {
            return { ...item, ...updatedSubData };
          }
          return item;
        });
      });

      setSelectedSubData((prev) => ({ ...prev, ...updatedSubData }));
      alert("수정이 완료되었습니다!");
      handleCancel();
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  const handleDelete = async (subData) => {
    try {
      const { docId, farmId, farmDocId } = subData;

      await deleteDocument("farm", farmDocId, "farmCureList", docId);

      setSubCollectionData((prevData) =>
        prevData.filter((item) => item.docId !== docId)
      );

      alert("삭제가 완료되었습니다!");
    } catch (error) {
      console.error("삭제 실패:", error.message || error);
    }
  };

  if (!medicalData) {
    return (
      <div className="loadingPage">
        <BeatLoader color="#38d6b7" />
      </div>
    );
  }

  return (
    // <div className={styles.dsads}>
    <div className={styles.save}>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeader}>축사 번호</TableCell>
              <TableCell className={styles.tableHeader}>증상</TableCell>
              <TableCell className={styles.tableHeader}>
                마지막 수정일
              </TableCell>
              <TableCell className={styles.tableHeader}>상세보기</TableCell>
              <TableCell className={styles.tableHeader}>삭제하기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCollectionData.length > 0 ? (
              subCollectionData.map((subData) => {
                return (
                  <TableRow key={subData.docId}>
                    <TableCell>{subData.farmId}</TableCell>
                    <TableCell>{subData.symptom}</TableCell>
                    <TableCell>
                      {subData.lastModified || "수정 이력이 없습니다."}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleSubDataClick(subData)}
                        className={`globalBtn ${styles.customPadding}`}
                      >
                        보기
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(subData)}
                        className={`globalDeleteBtn ${styles.customPadding}`}
                      >
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5}>문진표 작성 이력이 없습니다.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={selectedSubData !== null}
        onClose={() => setSelectedSubData(null)}
      >
        <DialogTitle>상세 증상</DialogTitle>
        <DialogContent>
          {selectedSubData && (
            <div className={styles.subcontainer}>
              <h2 className={styles.detailHeader}>상세 정보</h2>
              <div className={styles.detailItem}>
                <strong>증상:</strong> {selectedSubData.symptom}
              </div>
              <div className={styles.detailItem}>
                <strong>영향을 받은 가축 수:</strong>{" "}
                {selectedSubData.symptomCount}
              </div>
              <div className={styles.detailItem}>
                <strong>열이 있습니까?</strong>{" "}
                {selectedSubData.fever ? "예" : "아니요"}
              </div>
              <div className={styles.detailItem}>
                <strong>평균 체온:</strong> {selectedSubData.feverMean}
              </div>
              <div className={styles.detailItem}>
                <strong>기침 여부:</strong>{" "}
                {selectedSubData.cough ? "예" : "아니요"}
              </div>
              <div className={styles.detailItem}>
                <strong>기침 빈도:</strong> {selectedSubData.coughCount}
              </div>
              <div className={styles.detailItem}>
                <strong>설사 증상:</strong>{" "}
                {selectedSubData.diarrhea ? "예" : "아니요"}
              </div>
              <div className={styles.detailItem}>
                <strong>설사 횟수:</strong> {selectedSubData.diarrheaCount}
              </div>
              <div className={styles.detailItem}>
                <strong>환기 상태:</strong> {selectedSubData.ventilation}
              </div>
              <div className={styles.detailItem}>
                <strong>조명 상태:</strong> {selectedSubData.lampCondition}
              </div>
              <div className={styles.detailItem}>
                <strong>사료 공급 상태:</strong> {selectedSubData.feedSupply}
              </div>
              <DialogActions className={styles.dialogActions}>
                <Button
                  onClick={handleEdit}
                  className={`globalBtn ${styles.customPadding}`}
                >
                  수정하기
                </Button>
                <Button onClick={handleCloseModal} className="globalDeleteBtn">
                  닫기
                </Button>
              </DialogActions>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <div className={styles.openPopUp}>
        <Dialog open={editing} onClose={handleCancel}>
          <DialogTitle>수정하기</DialogTitle>
          <DialogContent>
            <TextField
              label="증상"
              name="symptom"
              value={updatedData.symptom || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="영향을 받은 가축 수"
              name="symptomCount"
              value={updatedData.symptomCount || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <label>열이 있습니까?</label>
            <RadioGroup
              name="fever"
              value={updatedData.fever ? "예" : "아니요"}
              onChange={handleChange}
            >
              <FormControlLabel value="예" control={<Radio />} label="예" />
              <FormControlLabel
                value="아니요"
                control={<Radio />}
                label="아니요"
              />
            </RadioGroup>
            <TextField
              label="평균 체온"
              name="feverMean"
              value={updatedData.feverMean || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <label>기침 여부?</label>
            <RadioGroup
              name="cough"
              value={updatedData.cough ? "예" : "아니요"}
              onChange={handleChange}
            >
              <FormControlLabel value="예" control={<Radio />} label="예" />
              <FormControlLabel
                value="아니요"
                control={<Radio />}
                label="아니요"
              />
            </RadioGroup>

            <TextField
              label="기침 빈도"
              name="coughCount"
              value={updatedData.coughCount || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <label>설사 증상</label>
            <RadioGroup
              name="diarrhea"
              value={updatedData.diarrhea ? "예" : "아니요"}
              onChange={handleChange}
            >
              <FormControlLabel value="예" control={<Radio />} label="예" />
              <FormControlLabel
                value="아니요"
                control={<Radio />}
                label="아니요"
              />
            </RadioGroup>

            <TextField
              label="설사 횟수"
              name="diarrheaCount"
              value={updatedData.diarrheaCount || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="환기 상태"
              name="ventilation"
              value={updatedData.ventilation || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="조명 상태"
              name="lampCondition"
              value={updatedData.lampCondition || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="사료 공급 상태"
              name="feedSupply"
              value={updatedData.feedSupply || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} className="globalDeleteBtn">
              취소
            </Button>
            <Button onClick={handleSave} className="globalBtn">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
    // </div>
  );
}

export default MedicalListSave;
