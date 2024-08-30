import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

function StockMedicalExcel(props) {
  const dispatch = useDispatch();
  const { fileData, uploadProgress } = useSelector(
    (state) => state.PRexcelSlice
  );

  return (
    <div>
      <h2>가축 정보 Excel 업로드</h2>``
      <input type="file" accept=".xlsx, .xls" />
      {fileData.length > 0 && (
        <div>
          <h3>업로드된 데이터</h3>
          <table border="1">
            <thead>
              <tr>
                {Object.keys(fileData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StockMedicalExcel;
