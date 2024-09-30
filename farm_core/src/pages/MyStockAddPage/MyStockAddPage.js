import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExcelTemplateDownload from "../../components/ExcelTemplateDownload/ExcelTemplateDownload";
import ExcelUpload from "./../../components/ExcelUpload/ExcelUpload";
import { fetchExcelStock } from "../../store/stockSlice/stockSlice";
import StockAddfromExcel from "../../components/StockAdd/StockAddfromExcel";
import styles from "./MyStockAddPage.module.scss";

function MyStockAddPage() {
  const dispatch = useDispatch();
  const [downloadUrl, setDownloadUrl] = useState(null);
  const { stock, isLoading, error } = useSelector((state) => state.stockSlice);

  useEffect(() => {
    dispatch(fetchExcelStock({ collectionName: "stock", queryOptions: {} }));
  }, [dispatch]);

  return (
    <div className="page">
      <div className={styles.stockLisPage}>
        <h3>가축 추가(엑셀 활용)</h3>
        <ExcelTemplateDownload />
        <ExcelUpload />
        {/* <h1>Data from Firestore</h1> */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {downloadUrl && (
              <a href={downloadUrl} download="stock_template.xlsx">
                엑셀 다운로드
              </a>
            )}
            <div className={styles.stockListBox}>
              {/* 엑셀 데이터만 테이블 바디에 렌더링 */}
              {/* <StockAddfromExcel items={stock} /> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyStockAddPage;
