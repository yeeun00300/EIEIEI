import React, { useEffect, useState } from "react";
import styles from "./AdminStock.module.scss";
import Sort from "../../pages/Admin/components/Sort";
import Search from "../../pages/Admin/components/Search";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { fetchExcelStock } from "../../store/stockSlice/stockSlice";
import { codeDict } from "../../api/codeDict/codeDict";

function AdminStock() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState({});
  const { stock, isLoading } = useSelector((state) => state.stockSlice);
  const stockSexual = {
    F: "암컷",
    M: "수컷",
  };

  // const queryOptions = {
  //   conditions: [
  //     { field: "stockCode", operation: "==", value: codeDict[sort] },
  //   ],
  //   orderBys: [],
  // };
  useEffect(() => {
    dispatch(
      fetchExcelStock({
        collectionName: "stock",
        queryOptions: {},
        // queryOptions: ("stockCode", "==", codeDict[sort]),
        // queryOptions: queryOptions,
      })
    );
  }, [search, sort]);
  const toggleOpen = (id) => {
    setOpen((prev) => (prev === id ? null : id));
  };
  return (
    <div className={styles.AdminStock}>
      <div className={styles.AdminUtil}>
        <div>가축 정보 리스트</div>
        <Search setSearch={setSearch} />
        <DateRangePickerValue />
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
                <th>축사번호</th>
                <th>종류</th>
                <th>등록일자</th>
                <th>성별</th>
                <th>상세정보</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <></>
              ) : (
                <>
                  {stock?.map((stockItem) => {
                    const { stockId, stockType, incomingDate, sexual } =
                      stockItem;
                    return (
                      <tr key={stockId}>
                        <td>{stockId}</td>
                        <td>{stockType}</td>
                        <td>{incomingDate}</td>
                        <td>{stockSexual[sexual]}</td>
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
        <div className={styles.stockCard}>
          {stock?.map((stockItem, idx) => {
            const { stockId, stockType, incomingDate } = stockItem;
            return (
              <div style={{ minHeight: "150px" }} key={idx}>
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
                        </tbody>
                      </Table>
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
