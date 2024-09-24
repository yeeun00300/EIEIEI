import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedStock,
  updateStock,
} from "../../store/stockSlice/stockSlice";
import Modal from "./Modal";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import styles from "./StockModal.module.scss";
function StockModal({ onClose, stock }) {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.stockSlice?.selectedStock);
  const [formData, setFormData] = useState(selectedStock || {});
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    console.log(stock);
    if (selectedStock) {
      setFormData(stock); // 선택된 가축 정보 설정
    }
  }, [stock]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEditModeToggle = () => {
    setIsEditMode((prevMode) => !prevMode); // 수정 모드 토글
  };
  const handleDiseaseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDiseases = formData.disease.map((disease, i) =>
      i === index ? { ...disease, [name]: value } : disease
    );
    setFormData({ ...formData, disease: updatedDiseases });
  };

  const handleVaccineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVaccines = formData.vaccine.map((vaccine, i) =>
      i === index ? { ...vaccine, [name]: value } : vaccine
    );
    setFormData({ ...formData, vaccine: updatedVaccines });
  };

  const handleAddDisease = () => {
    setFormData({
      ...formData,
      disease: [...formData.disease, { diseaseDate: "", diseaseType: "" }],
    });
  };

  // 백신 추가 기능
  const handleAddVaccine = () => {
    setFormData({
      ...formData,
      vaccine: [...formData.vaccine, { vaccineDate: "", vaccineType: "" }],
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateStock({
        collectionName: "stock",
        docId: formData.docId,
        updateInfoObj: formData,
      })
    );
    onClose();
  };
  const handleDeleteDisease = () => {
    const updatedDiseases = formData.disease.filter(
      (_, index) => !selectedDiseases[index]
    );
    setFormData({ ...formData, disease: updatedDiseases });
    setSelectedDiseases(new Array(updatedDiseases.length).fill(false));
  };

  const handleDeleteVaccine = () => {
    const updatedVaccines = formData.vaccine.filter(
      (_, index) => !selectedVaccines[index]
    );
    setFormData({ ...formData, vaccine: updatedVaccines });
    setSelectedVaccines(new Array(updatedVaccines.length).fill(false));
  };

  const handlePostcodeComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setFormData({ ...formData, farmAddress: fullAddress });
    setIsPostcodeOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Dialog
        open={!!selectedStock}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        className={styles.StockModaldialog}
      >
        <DialogTitle className={styles.StockModaldialogTitle}>
          {isEditMode ? "가축 정보 수정" : "가축 상세 보기"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="가축 개체번호"
                value={formData.stockId || ""}
                name="stockId"
                onChange={handleChange}
                disabled
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="가축 종류"
                value={formData.stockType || ""}
                name="stockType"
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="성별"
                value={formData.sex || ""}
                name="sex"
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="체중 (kg)"
                value={formData.weight || ""}
                name="weight"
                onChange={handleChange}
                type="number"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="온도 (°C)"
                value={formData.temp || ""}
                name="temp"
                onChange={handleChange}
                type="number"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="입고일"
                value={formData.incomingDate || ""}
                name="incomingDate"
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="먹이량(kg)"
                value={formData.feed || ""}
                name="feed"
                onChange={handleChange}
                type="number"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="임신 날짜"
                value={formData.pregnantDate || ""}
                type="date"
                name="pregnantDate"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="주소"
                value={formData.farmAddress || ""}
                name="farmAddress"
                onClick={() => setIsPostcodeOpen(true)}
                placeholder="주소를 입력하려면 클릭하세요"
                InputProps={{
                  readOnly: isEditMode ? true : false, // isEditMode에 따라 readOnly를 결정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="축사 번호"
                value={formData.farmId || ""}
                name="farmId"
                onChange={handleChange}
                type="number"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={styles.StockModaltextField}
                fullWidth
                label="활동"
                value={formData.activity || ""}
                name="activity"
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="이메일"
                value={formData.email || ""}
                name="email"
                onChange={handleChange}
                type="email"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="크기"
                value={formData.size || ""}
                name="size"
                onChange={handleChange}
                type="number"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
                className={styles.StockModaltextField}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="가축 코드"
                value={formData.stockCode || ""}
                name="stockCode"
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="품종 (Variety)"
                value={formData.variety || ""}
                name="variety"
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="폐사 여부"
                value={formData.deceased || ""}
                name="deceased"
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
                className={styles.StockModaltextField}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="격리 여부"
                value={formData.isolation || ""}
                name="isolation"
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="발정기 여부"
                value={formData.mating || ""}
                name="mating"
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
                className={styles.StockModaltextField}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="출생 날짜"
                value={formData.birthDate || ""}
                name="birthDate"
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>

            {/* 번식 횟수 (breedCount) */}
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="출산 횟수"
                value={formData.breedCount || ""}
                name="breedCount"
                onChange={handleChange}
                type="number"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>

            {/* 출산 날짜 (breedDate) */}
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="출산 날짜"
                value={formData.breedDate || ""}
                name="breedDate"
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>

            {/* 출산 예정 날짜 (breedDueDate) */}
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="출산 예정 날짜"
                value={formData.breedDueDate || ""}
                name="breedDueDate"
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>

            {/* 우유 생산량 (milk) */}
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="우유 생산량"
                value={formData.milk || ""}
                name="milk"
                onChange={handleChange}
                type="number"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>

            {/* 산란량 (eggProduction) */}
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="산란량"
                value={formData.eggProduction || ""}
                name="eggProduction"
                onChange={handleChange}
                type="number"
                InputProps={{
                  readOnly: !isEditMode, // 수정 모드에 따라 readOnly 설정
                }}
              />
            </Grid>

            {isEditMode && (
              <>
                <Grid item xs={12} className={styles.StockModaladdButton}>
                  <Button variant="outlined" onClick={handleAddDisease}>
                    선택 창 외의 질병 정보 추가
                  </Button>
                </Grid>
                <Grid item xs={12} className={styles.StockModaladdButton}>
                  <Button variant="outlined" onClick={handleDeleteDisease}>
                    선택된 질병 삭제
                  </Button>
                </Grid>
              </>
            )}
            {formData.disease &&
              formData.disease.map((disease, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="질병 날짜"
                      value={disease.diseaseDate || ""}
                      name="diseaseDate"
                      onChange={(e) => handleDiseaseChange(index, e)}
                      className={styles.StockModaltextField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="질병 종류"
                      value={disease.diseaseType || ""}
                      name="diseaseType"
                      onChange={(e) => handleDiseaseChange(index, e)}
                      className={styles.StockModaltextField}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <input
                      type="checkbox"
                      checked={selectedDiseases[index] || false}
                      onChange={(e) => {
                        const updatedSelected = [...selectedDiseases];
                        updatedSelected[index] = e.target.checked;
                        setSelectedDiseases(updatedSelected);
                      }}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            {isEditMode && (
              <Grid item xs={12} className={styles.StockModaladdButton}>
                <Button variant="outlined" onClick={handleAddVaccine}>
                  선택 창 외의 백신 정보 추가
                </Button>
                <Button variant="outlined" onClick={handleDeleteVaccine}>
                  선택된 백신 삭제
                </Button>
              </Grid>
            )}
            {formData.vaccine &&
              formData.vaccine.map((vaccine, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="백신 날짜"
                      value={vaccine.vaccineDate || ""}
                      name="vaccineDate"
                      onChange={(e) => handleVaccineChange(index, e)}
                      className={styles.StockModaltextField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="백신 종류"
                      value={vaccine.vaccineType || ""}
                      name="vaccineType"
                      onChange={(e) => handleVaccineChange(index, e)}
                      className={styles.StockModaltextField}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <input
                      type="checkbox"
                      checked={selectedVaccines[index] || false}
                      onChange={(e) => {
                        const updatedSelected = [...selectedVaccines];
                        updatedSelected[index] = e.target.checked;
                        setSelectedVaccines(updatedSelected);
                      }}
                    />
                  </Grid>
                </React.Fragment>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions className={styles.StockModalbuttonGroup}>
          <Button onClick={onClose}>닫기</Button>
          {isEditMode ? (
            <>
              <Button onClick={handleSubmit} color="primary">
                저장
              </Button>
              <Button onClick={handleEditModeToggle} color="secondary">
                수정 취소
              </Button>
            </>
          ) : (
            <Button onClick={handleEditModeToggle} color="primary">
              수정하기
            </Button>
          )}
        </DialogActions>
        {isPostcodeOpen && (
          <DaumPostcode onComplete={handlePostcodeComplete} autoClose={false} />
        )}
      </Dialog>
    </div>
  );
}

export default StockModal;
