import React, { useEffect, useState } from "react";
import styles from "../../components/medicalList/MedicalListSave.module.scss";
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
import kroDate from "../../utils/korDate";
import {
  fetchFarmDocumentByEmail,
  getSubCollection,
  updateSubcollectionDocument,
} from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userInfoEditSlice/UserInfoEditSlice";
import userInfoEditSlice from "./../../store/userInfoEditSlice/UserInfoEditSlice";
import Search from "../../pages/Admin/components/Search";

function DiseaseMedicalList() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(""); // 검색 상태
  const [medicalData, setMedicalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subCollectionData, setSubCollectionData] = useState([]);
  const [selectedSubData, setSelectedSubData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);

  const fetchData = async () => {
    let userArr = [];
    try {
      // 각 user에 대해 데이터를 fetch
      const fetchPromises = userInfo.map(async (userInfo) => {
        const documents = await fetchFarmDocumentByEmail(userInfo.email);
        if (documents && documents.length > 0) {
          setMedicalData(documents); // 축사 데이터를 상태에 저장
          const allSubCollectionData = [];

          // 각 문서에 대해 서브 컬렉션 데이터 가져오기
          for (const document of documents) {
            const subData = await getSubCollection(
              "farm",
              document.id,
              "farmCureList"
            );
            // subData에 farmId 추가
            const subDataWithFarmId = subData.map((item) => ({
              ...item,
              farmId: document.farmId,
            }));
            allSubCollectionData.push(...subDataWithFarmId);
          }
          userArr.push(allSubCollectionData);
        }
      });

      await Promise.all(fetchPromises); // 모든 fetch가 완료되기를 기다림
      setSubCollectionData(userArr.flat()); // 서브 컬렉션 데이터를 상태에 설정
      setIsFetchLoading(false);
    } catch (error) {
      console.error("문서 검색 실패:", error.message || error);
    } finally {
      setIsFetchLoading(false);
    }
  };

  // useEffect(() => {
  //   dispatch(fetchUser({ collectionName: "users", queryOptions: {} }));
  //   fetchData();
  // }, [dispatch, isFetchLoading, filteredList?.length]);

  // 검색 기능
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // 검색된 데이터 필터링
  const filteredList = subCollectionData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery)
    )
  );

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
      handleCancel();
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchUser({ collectionName: "users", queryOptions: {} }));
    fetchData();
  }, [dispatch, userInfo.length]);

  if (!medicalData) {
    return <p>로딩 중...</p>;
  }
  return (
    <div className="container">
      <Search onChange={handleSearch} placeholder={"검색어를 입력하세요!"} />
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
              {filteredList?.length > 0 ? (
                filteredList?.map((subData) => (
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
                  <button className={styles.detailButton} onClick={handleEdit}>
                    수정하기
                  </button>
                  <Button
                    onClick={handleCloseModal}
                    color="primary"
                    className={styles.cancelbutton}
                  >
                    닫기
                  </Button>
                </DialogActions>
              </div>
            )}
          </DialogContent>
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

export default DiseaseMedicalList;
