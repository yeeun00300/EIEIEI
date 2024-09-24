import React, { useState, useEffect } from "react";
import styles from "./MedicalListSave.module.scss";
import kroDate from "../../utils/korDate";
import {
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

function MedicalListSave() {
  const [medicalData, setMedicalData] = useState([]);
  const [subCollectionData, setSubCollectionData] = useState([]);
  const [selectedSubData, setSelectedSubData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("email");

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
    setUpdatedData(data); // 클릭한 데이터를 초기화
    setEditing(false); // 상세보기 시 편집 상태 초기화
  };

  const handleEdit = () => {
    setEditing(true);
    setUpdatedData(selectedSubData); // 수정할 데이터를 저장
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
    setUpdatedData({}); // 수정 취소 시 업데이트 데이터 초기화
  };

  const handleSave = async () => {
    try {
      const currentTime = kroDate();
      const updatedSubData = {
        ...updatedData,
        lastModified: currentTime,
      };

      console.log("Saving updated data:", updatedSubData);

      // medicalData[0]와 selectedSubData.docId가 유효한지 확인
      if (!medicalData.length || !selectedSubData?.docId) {
        throw new Error("업데이트할 문서 또는 서브컬렉션 문서 ID가 없습니다.");
      }

      await updateSubcollectionDocument(
        medicalData[0].id, // 첫 번째 문서의 ID 사용
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
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  if (!medicalData) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="container">
      <div className={styles.save}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>축사 번호</TableCell>
                <TableCell>증상</TableCell>
                <TableCell>마지막 수정일</TableCell>
                <TableCell>상세보기</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCollectionData.length > 0 ? (
                subCollectionData.map((subData) => (
                  <TableRow
                    key={subData.docId}
                    onClick={() => handleSubDataClick(subData)}
                  >
                    <TableCell>{subData.farmId}</TableCell>
                    <TableCell>{subData.symptom}</TableCell>
                    <TableCell>{subData.lastModified || kroDate()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleSubDataClick(subData)}
                      >
                        보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    서브 컬렉션 데이터가 없습니다.
                  </TableCell>
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
              <div>
                <p>
                  <strong>증상:</strong> {selectedSubData.symptom}
                </p>
                <p>
                  <strong>영향을 받은 가축 수:</strong>{" "}
                  {selectedSubData.symptomCount}
                </p>
                <p>
                  <strong>열이 있습니까?</strong>{" "}
                  {selectedSubData.fever ? "예" : "아니요"}
                </p>
                <p>
                  <strong>평균 체온:</strong> {selectedSubData.feverMean}
                </p>
                <p>
                  <strong>기침 여부:</strong>{" "}
                  {selectedSubData.cough ? "예" : "아니요"}
                </p>
                <p>
                  <strong>기침 빈도:</strong> {selectedSubData.coughCount}
                </p>
                <p>
                  <strong>설사 증상:</strong>{" "}
                  {selectedSubData.diarrhea ? "예" : "아니요"}
                </p>
                <p>
                  <strong>설사 횟수:</strong> {selectedSubData.diarrheaCount}
                </p>
                <p>
                  <strong>환기 상태:</strong> {selectedSubData.ventilation}
                </p>
                <p>
                  <strong>조명 상태:</strong> {selectedSubData.lampCondition}
                </p>
                <p>
                  <strong>사료 공급 상태:</strong> {selectedSubData.feedSupply}
                </p>
                <Button variant="contained" onClick={handleEdit}>
                  수정하기
                </Button>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedSubData(null)} color="primary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>

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
            <Button onClick={handleCancel} color="primary">
              취소
            </Button>
            <Button onClick={handleSave} color="primary">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default MedicalListSave;
