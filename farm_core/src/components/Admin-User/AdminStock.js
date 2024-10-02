import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import StockModal from "./StockModal";
import {
  deleteStock,
  fetchExcelStock,
  setSelectedStock,
  updateStock,
} from "./../../store/stockSlice/stockSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import styles from "./AdminStock.module.scss";
import { markVaccineComplete } from "../../store/myPageSlice/markVaccineCompleteSlice";
import { markDiseaseComplete } from "../../store/myPageSlice/markDiseaseCompleteSlice";
import StockModal from "../../pages/MyStockDetails/StockModal";

function AdminStock(props) {
  const dispatch = useDispatch();
  const { stock, isLoading } = useSelector((state) => state.stockSlice);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색 상태
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // 정렬 상태
  const [selectedType, setSelectedType] = useState(""); // 가축 종류 필터링 상태
  const [selectedDisease, setSelectedDisease] = useState(""); // 선택된 질병 상태
  const [selectedStocks, setSelectedStocks] = useState([]); // 선택된 가축 상태
  const [treatmentStatus, setTreatmentStatus] = useState(""); // 치료 여부 상태 추가
  const [showDiseaseRegistration, setShowDiseaseRegistration] = useState(false); // 질병 등록 여부 상태
  const [showVaccineRegistration, setShowVaccineRegistration] = useState(false); // 백신 등록 여부 상태

  // const selectedStock = useSelector((state) => state.stockSlice);
  // const selectedStock = useSelector((state) => state.stockSlice?.selectedStock);
  // useFetchCollectionData("stock", fetchExcelStock);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 가축 종류를 '한우'로 설정
    setSelectedType("한우");
    dispatch(fetchExcelStock({ collectionName: "stock", queryOptions: {} }));
  }, []);

  const handleEdit = (stockItem) => {
    console.log(`edit : ${stockItem}`);

    dispatch(setSelectedStock(stockItem));
    setModalOpen(true);
  };

  const handleDelete = (docId) => {
    dispatch(deleteStock({ collectionName: "stock", docId }));
  };

  // 검색 기능
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // 정렬 기능
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <FaAngleDoubleUp />
      ) : (
        <FaAngleDoubleDown />
      );
    }
    return null;
  };

  const handleCancel = () => {
    setSelectedDisease("");
    setTreatmentStatus("");
    setSelectedStocks([]);
    setShowDiseaseRegistration(false);
    setShowVaccineRegistration(false);
  };
  // 라디오 버튼으로 선택된 종류에 따른 필터링
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDiseaseChange = (e) => {
    setSelectedDisease(e.target.value);
  };

  const handleStockSelect = (docId) => {
    setSelectedStocks((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  const handleMarkDiseaseComplete = () => {
    if (selectedStocks.length === 0) {
      alert("가축을 선택한 후 질병 등록을 진행하세요.");
      return;
    }
    const today = new Date();
    const formattedDate = `${today.getFullYear().toString().slice(-2)}-${(
      "0" +
      (today.getMonth() + 1)
    ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;

    const newDiseaseEntry = {
      diseaseDate: `${formattedDate}/ ${treatmentStatus}`,
      diseaseType: selectedDisease,
    };

    const promises = selectedStocks.map((stockId) =>
      dispatch(
        markDiseaseComplete({
          stockId,
          newDiseaseEntry,
        })
      )
    );

    Promise.all(promises)
      .then(() => {
        alert("질병 등록 완료");
        setSelectedDisease("");
        setTreatmentStatus("");
        setSelectedStocks([]);
        setShowDiseaseRegistration(false); // 질병 등록 필드 숨기기
        window.location.reload();
      })
      .catch((error) => {
        console.error("질병 등록 오류:", error);
        alert("질병 등록 실패");
      });
  };

  // 백신 등록 완료 핸들러
  const handleMarkVaccineComplete = () => {
    if (selectedStocks.length === 0) {
      alert("가축을 선택한 후 백신 등록을 진행하세요.");
      return;
    }
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(
      "0" +
      (today.getMonth() + 1)
    ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;

    const newVaccineEntry = {
      vaccineType: selectedDisease,
      vaccineDate: formattedDate,
    };

    const promises = selectedStocks.map((stockId) =>
      dispatch(
        markVaccineComplete({
          stockId,
          newVaccineEntry,
        })
      )
    );

    Promise.all(promises)
      .then(() => {
        alert("백신 등록 완료");
        setSelectedDisease("");
        setSelectedStocks([]);
        setShowVaccineRegistration(false); // 백신 등록 필드 숨기기
        window.location.reload();
      })
      .catch((error) => {
        console.error("백신 등록 오류:", error);
        alert("백신 등록 실패");
      });
  };

  // 버튼 클릭 핸들러
  // 질병 등록 버튼 클릭 핸들러
  const handleShowDiseaseRegistration = () => {
    if (selectedStocks.length === 0) {
      alert("질병 등록을 하려면 가축을 선택해야 합니다.");
      return;
    }
    setShowDiseaseRegistration(true);
    setShowVaccineRegistration(false); // 백신 등록 필드를 숨깁니다
  };

  // 백신 등록 버튼 클릭 핸들러
  const handleShowVaccineRegistration = () => {
    if (selectedStocks.length === 0) {
      alert("백신 등록을 하려면 가축을 선택해야 합니다.");
      return;
    }
    setShowVaccineRegistration(true);
    setShowDiseaseRegistration(false); // 질병 등록 필드를 숨깁니다
  };

  // 검색된 데이터 필터링
  const filteredStock = stock
    ?.filter((item) => (selectedType ? item.stockType === selectedType : true))
    ?.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery)
      )
    );

  const handleUpdateDeceased = async () => {
    try {
      // 선택된 가축의 docId를 반복하여 업데이트
      await Promise.all(
        selectedStocks.map((docId) =>
          dispatch(
            updateStock({
              collectionName: "stock",
              docId,
              updateInfoObj: { deceased: "Y" },
            })
          )
        )
      );

      // 업데이트 후 선택된 가축 목록을 초기화
      setSelectedStocks([]);
    } catch (error) {
      console.error("폐사 상태 업데이트 실패:", error);
    }
  };

  // 정렬된 데이터 적용
  const sortedStock = [...filteredStock].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const direction = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return -1 * direction;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return 1 * direction;
    }
    return 0;
  });

  const diseaseOptions = {
    한우: [
      { value: "브루셀라병", label: "브루셀라병" },
      { value: "홍역", label: "홍역" },
      { value: "구제역", label: "구제역" },
    ],
    낙농: [
      { value: "브루셀라병", label: "브루셀라병" },
      { value: "홍역", label: "홍역" },
      { value: "구제역", label: "구제역" },
    ],
    양돈: [
      { value: "돼지열병", label: "돼지열병" },
      { value: "인플루엔자", label: "인플루엔자" },
      { value: "사료 효소 결핍증", label: "사료 효소 결핍증" },
    ],
    육계: [
      { value: "마이코플라스마성 폐렴", label: "마이코플라스마성 폐렴" },
      { value: "조류 독감", label: "조류 독감" },
      { value: "조류 인플루엔자", label: "조류 인플루엔자" },
    ],
    산란계: [
      { value: "마이코플라스마성 폐렴", label: "마이코플라스마성 폐렴" },
      { value: "조류 독감", label: "조류 독감" },
      { value: "조류 인플루엔자", label: "조류 인플루엔자" },
    ],
  };

  const isDiseaseButtonDisabled =
    selectedStocks.length === 0 || !selectedDisease || !treatmentStatus;
  const isVaccineButtonDisabled =
    selectedStocks.length === 0 || !selectedDisease;

  return (
    <div className="page">
      <div className="container">
        <div className={styles.wrapper}>
          <h3>나의 가축 리스트</h3>
          {/* 가축 종류 선택 라디오 버튼 */}
          <RadioGroup
            row
            value={selectedType}
            onChange={handleTypeChange}
            className={styles.myStockDetailsRadioGroup}
          >
            <FormControlLabel value="한우" control={<Radio />} label="한우" />
            <FormControlLabel value="양돈" control={<Radio />} label="양돈" />
            <FormControlLabel value="낙농" control={<Radio />} label="낙농" />
            <FormControlLabel
              value="산란계"
              control={<Radio />}
              label="산란계"
            />
            <FormControlLabel value="육계" control={<Radio />} label="육계" />
          </RadioGroup>
          {/* 검색 입력 필드 */}
          <TextField
            label="검색"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="가축 ID, 종류, 성별 등으로 검색"
            className={styles.myStockDetailsTextField}
          />
          <div className={styles.myStockDetailsBtn}>
            {/* 질병 등록 버튼 */}
            {!showDiseaseRegistration && !showVaccineRegistration && (
              <Button
                variant="contained"
                onClick={handleShowDiseaseRegistration}
                className={styles.myStockDetailsButton}
              >
                질병 등록
              </Button>
            )}
            {/* 백신 등록 버튼 */}
            {!showDiseaseRegistration && !showVaccineRegistration && (
              <Button
                variant="contained"
                onClick={handleShowVaccineRegistration}
                className={styles.myStockDetailsButton}
              >
                백신 등록
              </Button>
            )}
          </div>
          {showDiseaseRegistration && (
            <>
              {/* 질병 등록 필드 */}
              <Select
                value={selectedDisease}
                onChange={handleDiseaseChange}
                displayEmpty
                className={styles.diseaseSelect}
                disabled={!selectedType}
              >
                <MenuItem value="" disabled>
                  질병 선택
                </MenuItem>
                {diseaseOptions[selectedType]?.map((disease) => (
                  <MenuItem key={disease.value} value={disease.value}>
                    {disease.label}
                  </MenuItem>
                ))}
              </Select>

              <Select
                value={treatmentStatus}
                onChange={(e) => setTreatmentStatus(e.target.value)}
                displayEmpty
                className={styles.treatmentSelect}
              >
                <MenuItem value="" disabled>
                  치료/미치료
                </MenuItem>
                <MenuItem value="치료">치료</MenuItem>
                <MenuItem value="미치료">미치료</MenuItem>
              </Select>

              <Button
                onClick={handleMarkDiseaseComplete}
                disabled={isDiseaseButtonDisabled}
              >
                질병 등록 완료
              </Button>
              <Button onClick={handleCancel} className={styles.cancelButton}>
                취소
              </Button>
            </>
          )}
          {/* 백신 등록 필드 */}
          {showVaccineRegistration && (
            <>
              <Select
                value={selectedDisease}
                onChange={handleDiseaseChange}
                displayEmpty
                className={styles.diseaseSelect}
                disabled={!selectedType}
              >
                <MenuItem value="" disabled>
                  백신 선택
                </MenuItem>
                {diseaseOptions[selectedType]?.map((disease) => (
                  <MenuItem key={disease.value} value={disease.value}>
                    {disease.label}
                  </MenuItem>
                ))}
              </Select>

              <Button
                onClick={handleMarkVaccineComplete}
                disabled={isVaccineButtonDisabled}
              >
                백신 등록 완료
              </Button>
              <Button onClick={handleCancel} className={styles.cancelButton}>
                취소
              </Button>
            </>
          )}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <TableContainer
              component={Paper}
              className={styles.MyStockDetailsContainer}
            >
              <Table className={styles.myStockDetailsTable}>
                <TableHead className={styles.myStockDetailsHead}>
                  <TableRow>
                    <TableCell>선택</TableCell>
                    <TableCell onClick={() => handleSort("stockId")}>
                      가축 ID {getSortIcon("stockId")}
                    </TableCell>
                    <TableCell onClick={() => handleSort("stockType")}>
                      종류 {getSortIcon("stockType")}
                    </TableCell>
                    <TableCell onClick={() => handleSort("sex")}>
                      성별 {getSortIcon("sex")}
                    </TableCell>
                    <TableCell onClick={() => handleSort("weight")}>
                      체중 (kg) {getSortIcon("weight")}
                    </TableCell>
                    <TableCell onClick={() => handleSort("temp")}>
                      축사번호 {getSortIcon("temp")}
                    </TableCell>
                    <TableCell onClick={() => handleSort("incomingDate")}>
                      입고일 {getSortIcon("incomingDate")}
                    </TableCell>
                    <TableCell onClick={() => handleSort("feed")}>
                      먹이량 (kg){getSortIcon("feed")}
                    </TableCell>
                    <TableCell onClick={() => handleSort("deceased")}>
                      폐사여부{getSortIcon("deceased")}
                    </TableCell>
                    <TableCell>작업</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedStock?.map((item) => (
                    <TableRow
                      key={item.docId}
                      className={styles.myStockDetailsRow}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedStocks.includes(item.docId)}
                          onChange={() => handleStockSelect(item.docId)}
                        />
                      </TableCell>
                      <TableCell>{item.stockId}</TableCell>
                      <TableCell>{item.stockType}</TableCell>
                      <TableCell>{item.sex}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.farmId}</TableCell>
                      <TableCell>{item.incomingDate}</TableCell>
                      <TableCell>{item.feed}</TableCell>
                      <TableCell>{item.deceased}</TableCell>
                      <TableCell className={styles.btnBox}>
                        <Button
                          onClick={() => handleEdit(item)}
                          className={styles.myStockDetailsEditButton}
                        >
                          상세 보기
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.docId)}
                          className={styles.myStockDetailsDeleteButton}
                        >
                          삭제
                        </Button>
                        <Button
                          onClick={handleUpdateDeceased}
                          className={styles.deceasedButton}
                        >
                          폐사하기
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {isModalOpen && (
            <StockModal
              open={isModalOpen}
              onClose={() => setModalOpen(false)}
              stock={stock}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminStock;
