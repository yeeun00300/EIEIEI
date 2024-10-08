import React from "react";
import { useDispatch, useSelector } from "react-redux";

function StockMedicalExcel() {
  const dispatch = useDispatch();
  const { fileData, uploadProgress, isLoading, error, downloadURL } =
    useSelector((state) => state.PRexcelSlice);

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: "array", bookVBA: true });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];

  //     const jsonData = XLSX.utils.sheet_to_json(worksheet);

  //     dispatch(setFileData(jsonData));
  //     dispatch(uploadExcelFile(file)); // uploadExcelFile thunk를 호출하여 파일 업로드
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  return (
    <div>
      {/* <h2>가축 정보 Excel 업로드</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {isLoading && <p>Uploading...</p>}
      {error && <p>Error : {error}</p>}
      {downloadURL && (
        <p>
          File available at :{" "}
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            {downloadURL}
          </a>
        </p>
      )}
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
      )} */}
    </div>
  );
}

export default StockMedicalExcel;
