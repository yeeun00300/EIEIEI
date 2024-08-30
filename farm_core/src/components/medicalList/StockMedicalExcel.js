import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

function StockMedicalExcel(props) {
  const dispatch = useDispatch();
  const { fileData, uploadProgress } = useSelector(
    (state) => state.PRexcelSlice
  );

  const handleFileUpload = (e) => {
    const file = e.target.file[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const Sheet1 = workbook.Sheets[0];
      const worksheet = workbook.Sheets[Sheet1];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setFileData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>가축 정보 Excel 업로드</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

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
