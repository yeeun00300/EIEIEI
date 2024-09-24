import React, { useEffect, useState } from "react";
import styles from "./AdminStock.module.scss";
import Sort from "../../pages/Admin/components/Sort";
import Search from "../../pages/Admin/components/Search";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { fetchExcelStock } from "../../store/stockSlice/stockSlice";
import { codeDict } from "../../api/codeDict/codeDict";
import { Button } from "@mui/material";
import { useFetchCollectionData } from "../../firebase";
import { useForm } from "react-hook-form";
// import Button from "react-bootstrap/Button";

function AdminStock() {
  const dispatch = useDispatch();
  const [stockSearch, setStockSearch] = useState("");
  const [farmSearch, setFarmSearch] = useState("");
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState({});
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [updateSetting, setUpdateSetting] = useState(false);
  const { stock, isLoading } = useSelector((state) => state.stockSlice);
  const [sortBy, setSortBy] = useState("stockId");
  const [sortOrder, setSortOrder] = useState("asc");
  const email = localStorage.getItem("email");
  const [filteredStock, setFilteredStock] = useState([]);
  const [vaccineOpen, setVaccineOpen] = useState(true);
  const [diseaseOpen, setDiseaseOpen] = useState(true);
  const stockSexual = {
    F: "암컷",
    M: "수컷",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  useFetchCollectionData("stock", fetchExcelStock);

  useEffect(() => {
    if (stock) {
      // if (stockSearch !== "" && farmSearch == "") {
      //   const stockSearched = !stockSearched
      //     ? setFilteredStock([])
      //     : stock.filter((item) => item.stockId.includes(stockSearch));
      //   setFilteredStock(stockSearched);
      // } else if (farmSearch !== "" && stockSearch == "") {
      //   const farmSearched = !farmSearched
      //     ? setFilteredStock([])
      //     : stock.filter((item) => item.farmId.includes(farmSearch));
      //   setFilteredStock(farmSearched);
      // } else if (stockSearch !== "" && farmSearch !== "") {
      //   const stockSearched = !stockSearched
      //     ? setFilteredStock([])
      //     : stock.filter((item) => item.stockId.includes(stockSearch));
      //   const farmSearched = !farmSearched
      //     ? setFilteredStock([])
      //     : stockSearched.filter((item) => item.farmId.includes(farmSearch));
      //   setFilteredStock(farmSearched);
      // } else {
      //   setFilteredStock(stock);
      // }
      let filtered = stock;

      if (stockSearch !== "") {
        filtered = filtered.filter((item) =>
          item.stockId.includes(stockSearch)
        );
      }

      if (farmSearch !== "") {
        filtered = filtered.filter((item) => item.farmId.includes(farmSearch));
      }

      setFilteredStock(filtered.length ? filtered : []);
      // setFilteredStock(stock);
      if (stock.length > 0) {
      } else {
        console.log("No matching stock data :", stock);
      }
    }
  }, [stock, email]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  // 표 1행 sort 기능
  const sortedStock = filteredStock
    ? [...filteredStock].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (sortOrder === "asc") {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      })
    : [];
  const queryOptions1 = {
    conditions: [{ field: "stockCode", operator: "==", value: codeDict[sort] }],
    orderBys: [{ field: "stockCode", direction: "desc" }],
  };
  const queryOptions2 = {
    conditions: [
      { field: "incomingDate", operator: ">=", value: startDay },
      { field: "incomingDate", operator: "<=", value: endDay },
    ],
    orderBys: [{ field: "incomingDate", direction: "desc" }],
  };

  const queryOptions3 = {
    conditions: [
      { field: "stockCode", operator: "==", value: codeDict[sort] },
      { field: "incomingDate", operator: ">=", value: startDay },
      { field: "incomingDate", operator: "<=", value: endDay },
    ],
    orderBys: [
      { field: "stockCode", direction: "desc" },
      { field: "incomingDate", direction: "desc" },
    ],
  };

  useEffect(() => {
    if (codeDict[sort] !== undefined && startDay == "") {
      dispatch(
        fetchExcelStock({
          collectionName: "stock",
          queryOptions: queryOptions1,
        })
      );
    } else if (startDay !== "" && codeDict[sort] === undefined) {
      dispatch(
        fetchExcelStock({
          collectionName: "stock",
          queryOptions: queryOptions2,
        })
      );
    } else if (codeDict[sort] !== undefined && startDay !== "") {
      dispatch(
        fetchExcelStock({
          collectionName: "stock",
          queryOptions: queryOptions3,
        })
      );
    } else {
      dispatch(
        fetchExcelStock({
          collectionName: "stock",
          queryOptions: {},
        })
      );
    }

    // dispatch(
    //   fetchExcelStock({
    //     collectionName: "stock",
    //     queryOptions: startDay !== "" ? queryOptions2 : {},
    //   })
    // );
  }, [sort, startDay, codeDict]);
  const toggleOpen = (id) => {
    setOpen((prev) => (prev === id ? "" : id));
  };
  return (
    <div className={styles.AdminStock}>
      <div className={styles.AdminUtil}>
        <div>가축 정보 리스트</div>
        축사 번호 찾기:
        <Search
          setSearch={setFarmSearch}
          placeholder={"축사번호를 입력하세요!"}
        />
        개체번호 찾기 :{" "}
        <Search
          setSearch={setStockSearch}
          placeholder={"개체번호를 입력하세요!"}
        />
        <DateRangePickerValue setStartDay={setStartDay} setEndDay={setEndDay} />
        <Sort
          title="농장 종류별 :"
          name="stock"
          setSort={setSort}
          sort={sort}
          sortArr={[
            { id: "k-beef", value: "한우", htmlFor: "k-beef" },
            { id: "dairy", value: "낙농", htmlFor: "dairy" },
            { id: "pork", value: "양돈", htmlFor: "pork" },
            { id: "chicken", value: "육계", htmlFor: "chicken" },
            { id: "layer", value: "산란계", htmlFor: "layer" },
          ]}
        />
        <div className={styles.AdminList}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleSort("stockId")}>
                  개체번호
                  {sortBy === "stockId" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("farmId")}>
                  축사번호
                  {sortBy === "farmId" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("stockType")}>
                  종류
                  {sortBy === "stockType" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("incomingDate")}>
                  등록일자
                  {sortBy === "incomingDate" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("sex")}>
                  성별 {sortBy === "sex" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("disease")}>
                  질병{" "}
                  {sortBy === "disease" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("vaccine")}>
                  백신{" "}
                  {sortBy === "vaccine" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th>상세정보</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div>No Data!!</div>
              ) : (
                <>
                  {sortedStock?.map((stockItem) => {
                    const {
                      stockId,
                      farmId,
                      stockType,
                      incomingDate,
                      sex,
                      disease,
                      vaccine,
                    } = stockItem;
                    return (
                      <tr key={stockId}>
                        <td>
                          <p className={styles.stockPTag}>{stockId}</p>
                        </td>
                        <td>
                          <p className={styles.stockPTag}>{farmId}</p>
                        </td>
                        <td>
                          <p className={styles.stockPTag}>{stockType}</p>
                        </td>
                        <td>
                          <p className={styles.stockPTag}>
                            {incomingDate.substr(2)}
                          </p>
                        </td>
                        <td>
                          <p className={styles.stockPTag}>{stockSexual[sex]}</p>
                        </td>
                        <td>
                          <p className={styles.stockPTag}>
                            {disease.length !== 0 ? disease.length : " "}
                          </p>
                        </td>
                        <td>
                          <p className={styles.stockPTag}>
                            {vaccine.length !== 0 ? vaccine.length : " "}
                          </p>
                        </td>
                        <td>
                          <Button
                            onClick={() => toggleOpen(stockId)} // ID에 따라 상태 관리
                            aria-controls="example-collapse-text1"
                            aria-expanded={open[stockId] || false}
                          >
                            상세보기
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Collapse 영역 */}
      {isLoading ? (
        <></>
      ) : (
        <div className={styles.stockCards}>
          {stock?.map((stockItem, idx) => {
            const {
              stockId,
              stockType,
              incomingDate,
              variety,
              birthDate,
              sex,
              weight,
              size,
              disease,
              vaccine,
              activity,
              breedCount,
              breedDueDate,
              breedDate,
              pregnantDate,
              feed,
              docId,
            } = stockItem;
            return (
              <div
                style={{ minHeight: "150px" }}
                key={idx}
                className={styles.stockCard}
              >
                <Collapse in={open === stockId} dimension="width">
                  <div id="example-collapse-text1">
                    {!updateSetting ? (
                      <Card body style={{ width: "400px" }}>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Index</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>개체번호</td>
                              <td>{stockId}</td>
                            </tr>
                            <tr>
                              <td>종류</td>
                              <td>{stockType}</td>
                            </tr>
                            <tr>
                              <td>품종</td>
                              <td>{variety}</td>
                            </tr>
                            <tr>
                              <td>성별</td>
                              <td>{stockSexual[sex]}</td>
                            </tr>
                            <tr>
                              <td>출생</td>
                              <td>{birthDate}</td>
                            </tr>
                            <tr>
                              <td>입고 날짜</td>
                              <td>{incomingDate}</td>
                            </tr>
                            <tr>
                              <td>체중</td>
                              <td>{weight}</td>
                            </tr>
                            <tr>
                              <td>크기</td>
                              <td>{size}</td>
                            </tr>
                            <tr>
                              <td>질병이력</td>
                              <td>
                                {disease.map((item, idx) => {
                                  const { diseaseDate, diseaseType } = item;
                                  return (
                                    <div className={styles.tdDiv}>
                                      <Button
                                        onClick={() =>
                                          setDiseaseOpen(!diseaseOpen)
                                        }
                                        aria-controls="example-collapse-text"
                                        aria-expanded={diseaseOpen}
                                      >
                                        {diseaseType}
                                      </Button>
                                      <Collapse in={diseaseOpen}>
                                        <div id="example-collapse-text">
                                          {diseaseDate}
                                        </div>
                                      </Collapse>
                                    </div>
                                  );
                                })}
                              </td>
                            </tr>
                            <tr>
                              <td>예방접종</td>
                              <td>
                                {vaccine.map((item, idx) => {
                                  const { vaccineDate, vaccineType } = item;
                                  return (
                                    <div className={styles.tdDiv} key={idx}>
                                      <Button
                                        onClick={() =>
                                          setVaccineOpen(!vaccineOpen)
                                        }
                                        aria-controls="example-collapse-text"
                                        aria-expanded={vaccineOpen}
                                      >
                                        {vaccineType}
                                      </Button>
                                      <Collapse in={vaccineOpen}>
                                        <div id="example-collapse-text">
                                          {vaccineDate}
                                        </div>
                                      </Collapse>
                                    </div>
                                  );
                                })}
                              </td>
                            </tr>
                            <tr>
                              <td>건강상태</td>
                              <td>{activity}</td>
                            </tr>
                            <tr>
                              <td>생산량</td>
                              <td> </td>
                              {/* <td>{stockType}</td> */}
                            </tr>
                            <tr>
                              <td>임신횟수</td>
                              <td>{breedCount ? breedCount : "X"}</td>
                            </tr>
                            <tr>
                              <td>최근 임신날짜</td>
                              <td>{pregnantDate ? pregnantDate : "X"}</td>
                            </tr>
                            <tr>
                              <td>최근 출산예정</td>
                              <td>{breedDueDate ? breedDueDate : "X"}</td>
                            </tr>
                            <tr>
                              <td>최근 출산날짜</td>
                              <td>{breedDate ? breedDate : "X"}</td>
                            </tr>
                            <tr>
                              <td>사료</td>
                              <td>{feed}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <button
                          className={styles.editStockBtn}
                          onClick={(e) => {
                            setUpdateSetting(true);
                          }}
                        >
                          수정하기
                        </button>
                      </Card>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Card body style={{ width: "400px" }}>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Index</th>
                                <th>Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>개체번호</td>
                                <td>
                                  <input
                                    type="text"
                                    value={stockId}
                                    {...register("stockId")}
                                  />
                                  {/* {stockId} */}
                                </td>
                              </tr>
                              <tr>
                                <td>종류</td>
                                <td>
                                  {/*
                                  <select
                                    id="animalType"
                                    name="animalType"
                                    value={stockType}
                                    {...register("stockType")}
                                  >
                                    <option value="">선택하세요</option>
                                    <option value="한우">한우</option>
                                    <option value="낙농">낙농</option>
                                    <option value="양돈">양돈</option>
                                    <option value="양계">양계</option>
                                  </select>
                                     */}
                                  {stockType}
                                </td>
                              </tr>
                              <tr>
                                <td>품종</td>
                                <td>
                                  <input
                                    type="text"
                                    value={variety}
                                    {...register("variety")}
                                  />
                                  {/* {variety} */}
                                </td>
                              </tr>
                              <tr>
                                <td>성별</td>
                                <td>
                                  <select
                                    id="sexual"
                                    name="sexual"
                                    value={stockSexual}
                                    {...register("sex")}
                                  >
                                    <option value="수컷">수컷</option>
                                    <option value="암컷">암컷</option>
                                  </select>
                                  {/* {stockSexual[sex]} */}
                                </td>
                              </tr>
                              <tr>
                                <td>출생</td>
                                <td>
                                  <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={birthDate}
                                    {...register("birthDate")}
                                  />
                                  {/* {birthDate} */}
                                </td>
                              </tr>
                              <tr>
                                <td>입고 날짜</td>
                                <td>
                                  <input
                                    type="date"
                                    id="incomingDate"
                                    name="incomingDate"
                                    value={incomingDate}
                                    {...register("incomingDate")}
                                  />
                                  {/* {incomingDate} */}
                                </td>
                              </tr>
                              <tr>
                                <td>체중</td>
                                <td>
                                  <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={weight}
                                    {...register("weight")}
                                  />
                                  {/* {weight} */}kg
                                </td>
                              </tr>
                              <tr>
                                <td>크기</td>
                                <td>
                                  <input
                                    type="number"
                                    id="size"
                                    name="size"
                                    value={size}
                                    {...register("size")}
                                  />
                                  {/* {size} */}cm
                                </td>
                              </tr>
                              <tr>
                                <td>질병이력</td>
                                <td>
                                  {disease.map((item, idx) => {
                                    const { diseaseDate, diseaseType } = item;
                                    return (
                                      <div className={styles.tdDiv}>
                                        <Button
                                          onClick={() =>
                                            setDiseaseOpen(!diseaseOpen)
                                          }
                                          aria-controls="example-collapse-text"
                                          aria-expanded={diseaseOpen}
                                        >
                                          {diseaseType}
                                        </Button>
                                        <Collapse in={diseaseOpen}>
                                          <div id="example-collapse-text">
                                            {diseaseDate}
                                          </div>
                                        </Collapse>
                                      </div>
                                    );
                                  })}
                                </td>
                              </tr>
                              <tr>
                                <td>예방접종</td>
                                <td>
                                  {vaccine.map((item, idx) => {
                                    const { vaccineDate, vaccineType } = item;
                                    return (
                                      <div className={styles.tdDiv}>
                                        <Button
                                          onClick={() =>
                                            setVaccineOpen(!vaccineOpen)
                                          }
                                          aria-controls="example-collapse-text"
                                          aria-expanded={vaccineOpen}
                                        >
                                          {vaccineType}
                                        </Button>
                                        <Collapse in={vaccineOpen}>
                                          <div id="example-collapse-text">
                                            {vaccineDate}
                                          </div>
                                        </Collapse>
                                      </div>
                                    );
                                  })}
                                </td>
                              </tr>
                              <tr>
                                <td>건강상태</td>
                                <td>{activity}</td>
                              </tr>
                              <tr>
                                <td>생산량</td>
                                <td>{stockType}</td>
                              </tr>
                              <tr>
                                <td>임신횟수</td>
                                <td>
                                  <input
                                    type="number"
                                    id="breedCount"
                                    name="breedCount"
                                    value={breedCount}
                                    {...register("breedCount")}
                                  />
                                  {/* {breedCount ? breedCount : "X"} */}
                                </td>
                              </tr>
                              <tr>
                                <td>최근 임신날짜</td>
                                <td>
                                  <input
                                    type="date"
                                    id="pregnantDate"
                                    name="pregnantDate"
                                    value={pregnantDate}
                                    {...register("pregnantDate")}
                                  />
                                  {/* {pregnantDate ? pregnantDate : "X"} */}
                                </td>
                              </tr>
                              <tr>
                                <td>최근 출산예정</td>
                                <td>
                                  <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={breedDueDate}
                                    {...register("breedDueDate")}
                                  />
                                  {/* {breedDate ? breedDate : "X"} */}
                                </td>
                              </tr>
                              <tr>
                                <td>최근 출산날짜</td>
                                <td>
                                  <input
                                    type="date"
                                    id="breedDate"
                                    name="breedDate"
                                    value={breedDate}
                                    {...register("breedDate")}
                                  />
                                  {/* {stockType} */}
                                </td>
                              </tr>
                              <tr>
                                <td>사료</td>
                                <td>{feed}</td>
                              </tr>
                            </tbody>
                          </Table>
                          <div style={styles.stockDetailBtn}>
                            <button
                              className={styles.settingStockBtn}
                              type="submit"
                              onClick={(e) => {
                                setUpdateSetting(false);
                              }}
                            >
                              설정하기
                            </button>
                            <button
                              className={styles.deleteStockBtn}
                              onClick={(e) => setUpdateSetting(false)}
                            >
                              폐사처리
                            </button>
                          </div>
                        </Card>
                      </form>
                    )}
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminStock;
