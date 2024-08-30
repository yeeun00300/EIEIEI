import React from "react";
import db from "../../firebase";
import * as XLSX from "xlsx";
import { doc, setDoc } from "firebase/firestore";

export default function AddServerData() {
  /* 
FlieReader 객체를 이용하여 업로드된 파일을 읽을 수 있다.

FileReader.readAsArrayBuffer()
  - 지정된 내용을 읽기 시작한다. 완료되면 속성에 파일의 데이터를 나타내는 result가 포함된다 

fileReader.onload
 - load이벤트 핸들러
*/
  const readExcel = async (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (e) => {
      if (!e.target) return;
      const bufferArray = e.target.result;
      const fileInformation = XLSX.read(bufferArray, {
        type: "buffer",
        cellText: false,
        cellDates: true,
      });

      const sheetName = fileInformation.SheetNames[0];
      const rawData = fileInformation.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(rawData);
      try {
        for (let i = 0; i < data.length; i++) {
          const {
            drwNo,
            date,
            drwNo1,
            drwNo2,
            drwNo3,
            drwNo4,
            drwNo5,
            drwNo6,
          } = data[i];
          await setDoc(
            doc(db, "stock", "data"),
            {
              [drwNo]: [drwNo1, drwNo2, drwNo3, drwNo4, drwNo5, drwNo6],
            },
            { merge: true }
          );
        }
      } catch (error) {
        console.error("Error posting data to Firestore:", error);
      }
    };
  };

  const handleExcelFileChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    readExcel(file);
  };

  return (
    <>
      <div className="flex-center">
        <input type="file" onChange={(e) => handleExcelFileChange(e)} />
      </div>
      <style jsx>{`
        .flex-center {
          display: flex;
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
