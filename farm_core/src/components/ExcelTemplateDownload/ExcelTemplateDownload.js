import React from "react";
import ExcelJS from "exceljs";
import styles from "./ExcelTemplateDownload.module.scss";
function ExcelTemplateDownload(props) {
  const downloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.addRow([
      "가축 종류",
      "품종",
      "축사 번호",
      "가축 개체번호",
      "가축 주소",
      "입고 날짜",
      "성별",
      "크기",
      "무게",
      "출생 날짜",
      "섭취량",
      "수분 섭취량",
      "활동량",
      "온도",
      "격리 상태",
      "발정기 여부",
      "임신 일자",
      "백신 정보: (양식 예 : 백신A(2023-01-01); (여러 타입일 경우 ;필수) 백신B(2023-02-02)) 이런 방식으로 오른쪽 칸에 작성해주세요!",
      "백신 접종 데이터",
      "질병 및 치료 정보: (양식 예 : ASF(2023-01-01/2023-01-02 치료); (여러 타입일 경우 ;필수) PRRS(2023-01-01/2023-01-02 치료)) 오른쪽 칸에 작성해주세요!",
      "질병 및 치료 데이터",
      "출산 횟수",
      "출산일",
      "출산 예정일",
      "우유 생산량",
      "폐사여부",
      "산란량",
    ]);

    for (let col = 1; col <= 27; col++) {
      const cell = worksheet.getCell(1, col);
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D3D3D3" },
      };
      cell.font = { bold: true };
    }

    for (let row = 1; row <= 2; row++) {
      for (let col = 1; col <= 27; col++) {
        worksheet.getCell(row, col).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
    }

    const noInputCells = ["R2", "T2"];
    noInputCells.forEach((cellAddress) => {
      const cell = worksheet.getCell(cellAddress);
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      };
      cell.value = "작성 금지";
      cell.font = { color: { argb: "FF0000" }, bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    worksheet.getColumn(18).width = 130;
    worksheet.getColumn(19).width = 100;
    worksheet.getColumn(20).width = 150;
    worksheet.getColumn(21).width = 100;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "가축 추가하기.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className={styles.downloadContainer}>
      <button onClick={downloadTemplate} className={styles.downloadButton}>
        엑셀 다운로드
      </button>
    </div>
  );
}

export default ExcelTemplateDownload;
