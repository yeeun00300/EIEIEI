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
// import Button from "react-bootstrap/Button";

function AdminStock() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState({});
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const { stock, isLoading } = useSelector((state) => state.stockSlice);
  const stockSexual = {
    F: "암컷",
    M: "수컷",
  };
  const [sortBy, setSortBy] = useState("stockId");
  const [sortOrder, setSortOrder] = useState("asc");
  const email = localStorage.getItem("email");
  const [filteredStock, setFilteredStock] = useState([]);

  const [vaccineOpen, setVaccineOpen] = useState(true);
  const [diseaseOpen, setDiseaseOpen] = useState(true);
  useFetchCollectionData("stock");

  useEffect(() => {
    if (stock) {
      // const filtered = stock.filter((item) => item.email === email);
      // setFilteredStock(filtered);
      setFilteredStock(stock);
      if (stock.length > 0) {
      } else {
        console.log("No matching stock data found for email:", email);
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
  // orderBys: [{ field: "stockCode", direction: "desc" }],
  // orderBys: [{ field: "incomingDate", direction: "desc" }],

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
        <Search setSearch={setSearch} />
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
                  축사번호{" "}
                  {sortBy === "stockId" && (sortOrder === "asc" ? "🔺" : "🔻")}
                </th>
                <th onClick={() => handleSort("stockType")}>
                  종류{" "}
                  {sortBy === "stockType" &&
                    (sortOrder === "asc" ? "🔺" : "🔻")}
                </th>
                <th onClick={() => handleSort("incomingDate")}>
                  등록일자{" "}
                  {sortBy === "incomingDate" &&
                    (sortOrder === "asc" ? "🔺" : "🔻")}
                </th>
                <th onClick={() => handleSort("sex")}>
                  성별 {sortBy === "sex" && (sortOrder === "asc" ? "🔺" : "🔻")}
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
                    const { stockId, stockType, incomingDate, sex } = stockItem;
                    return (
                      <tr key={stockId}>
                        <td>{stockId}</td>
                        <td>{stockType}</td>
                        <td>{incomingDate}</td>
                        <td>{stockSexual[sex]}</td>
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
                  {/* {stock?.map((stockItem) => {
                    const { stockId, stockType, incomingDate, sex } = stockItem;
                    return (
                      <tr key={stockId}>
                        <td>{stockId}</td>
                        <td>{stockType}</td>
                        <td>{incomingDate}</td>
                        <td>{stockSexual[sex]}</td>
                        <td>
                          <Button
                            onClick={() => toggleOpen(stockId)} // ID에 따라 상태 관리
                            aria-controls="example-collapse-text1"
                            aria-expanded={open[stockId] || false}
                          >
                            click
                          </Button>
                        </td>
                      </tr>
                    );
                  })} */}
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
              breedCount,
              breedDate,
              pregnantDate,
            } = stockItem;
            return (
              <div
                style={{ minHeight: "150px" }}
                key={idx}
                className={styles.stockCard}
              >
                <Collapse in={open === stockId} dimension="width">
                  <div id="example-collapse-text1">
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
                                const keyName = Object.keys(item);
                                const text = item[keyName];
                                return (
                                  <div className={styles.tdDiv}>
                                    <Button
                                      onClick={() =>
                                        setDiseaseOpen(!diseaseOpen)
                                      }
                                      aria-controls="example-collapse-text"
                                      aria-expanded={diseaseOpen}
                                    >
                                      {keyName}
                                    </Button>
                                    <Collapse in={diseaseOpen}>
                                      <div id="example-collapse-text">
                                        {text}
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
                                const keyName = Object.keys(item);
                                const text = item[keyName];
                                return (
                                  <div className={styles.tdDiv}>
                                    <Button
                                      onClick={() =>
                                        setVaccineOpen(!vaccineOpen)
                                      }
                                      aria-controls="example-collapse-text"
                                      aria-expanded={vaccineOpen}
                                    >
                                      {keyName}
                                    </Button>
                                    <Collapse in={vaccineOpen}>
                                      <div id="example-collapse-text">
                                        {text}
                                      </div>
                                    </Collapse>
                                  </div>
                                );
                              })}
                            </td>
                          </tr>
                          <tr>
                            <td>건강상태</td>
                            <td>{stockType}</td>
                          </tr>
                          <tr>
                            <td>생산량</td>
                            <td>{stockType}</td>
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
                            <td>{breedDate ? breedDate : "X"}</td>
                          </tr>
                          <tr>
                            <td>최근 출산날짜</td>
                            <td>{stockType}</td>
                          </tr>
                          <tr>
                            <td>사료</td>
                            <td>{stockType}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <button className={styles.editStockBtn}>수정하기</button>
                    </Card>
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>
      )}
      {/* <div style={{ minHeight: "150px" }}>
        <Collapse in={open["A024"] || false} dimension="width">
          <div id="example-collapse-text1">
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
                    <td>A024</td>
                    <td>한우</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Collapse>

   
      </div> */}
    </div>
  );
}

export default AdminStock;
