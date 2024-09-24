import React from "react";
import ExcelJS from "exceljs";
import styles from "./ExcelTemplateDownload.module.scss";

function ExcelTemplateDownload(props) {
  const downloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.addRow([
      "가축 종류",
      "가축 코드",
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
      "활동량",
      "온도",
      "격리 상태",
      "발정기 여부",
      "임신 날짜",
      "백신 정보: (양식 예 : 백신A(2023-01-01); (여러 타입일 경우 ;필수) 백신B(2023-02-02)) 이런 방식으로 오른쪽 칸에 작성해주세요!",
      "백신 접종 데이터",
      "질병 및 치료 정보: (양식 예 : ASF(2023-01-01/2023-01-02 치료); (여러 타입일 경우 ;필수) PRRS(2023-01-01/2023-01-02 치료)) 오른쪽 칸에 작성해주세요!",
      "질병 및 치료 데이터",
      "출산 횟수",
      "출산 날짜",
      "출산 예정 날짜",
      "우유 생산량",
      "폐사 여부",
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

    for (let row = 1; row <= 31; row++) {
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

    // 날짜를 입력할 열에 대한 셀 서식을 지정합니다.
    const dateColumns = [7, 11, 17, 23, 24]; // 날짜에 해당하는 열의 인덱스
    dateColumns.forEach((colIdx) => {
      worksheet.getColumn(colIdx).numFmt = "yy-mm-dd"; // yy-mm-dd 형식으로 설정
    });

    // 가축 코드 (2번째 열) 을 텍스트 형식으로 설정
    worksheet.getColumn(2).numFmt = "@"; // 텍스트 형식으로 설정하여 01-01, 01-02와 같은 형식 사용 가능

    // 데이터 유효성 검사 설정 (툴팁 제공)
    worksheet.getCell("H2:H31").dataValidation = {
      type: "list",
      allowBlank: true,
      formula1: '"M,F"',
      showInputMessage: true,
      promptTitle: "성별 입력",
      prompt: "성별을 M 또는 F로 입력해 주세요.",
    };

    worksheet.getCell("O2:O31").dataValidation = {
      type: "list",
      allowBlank: true,
      formula1: '"Y,N"',
      showInputMessage: true,
      promptTitle: "격리 상태 입력",
      prompt: "격리 상태를 Y 또는 N으로 입력해 주세요.",
    };

    worksheet.getCell("P2:P31").dataValidation = {
      type: "list",
      allowBlank: true,
      formula1: '"Y,N"',
      showInputMessage: true,
      promptTitle: "발정기 여부 입력",
      prompt: "발정기 여부를 Y 또는 N으로 입력해 주세요.",
    };

    worksheet.getCell("Z2:Z31").dataValidation = {
      type: "list",
      allowBlank: true,
      formula1: '"Y,N"',
      showInputMessage: true,
      promptTitle: "폐사여부 입력",
      prompt: "폐사여부를 Y 또는 N으로 입력해 주세요.",
    };

    worksheet.getCell("V2:V31").dataValidation = {
      type: "whole",
      operator: "greaterThan",
      formula1: "0",
      showInputMessage: true,
      promptTitle: "출산 횟수 입력",
      prompt: "출산 횟수를 숫자로 입력해 주세요.",
    };

    worksheet.getCell("I2:I31").dataValidation = {
      type: "whole",
      operator: "greaterThan",
      formula1: "0",
      showInputMessage: true,
      promptTitle: "크기 입력",
      prompt: "크기를 숫자만 입력해 주세요.",
    };

    worksheet.getCell("J2:J31").dataValidation = {
      type: "whole",
      operator: "greaterThan",
      formula1: "0",
      showInputMessage: true,
      promptTitle: "무게 입력",
      prompt: "무게를 숫자만 입력해 주세요.",
    };

    worksheet.getCell("L2:L31").dataValidation = {
      type: "whole",
      operator: "between",
      formula1: "0",
      formula2: "100",
      showInputMessage: true,
      promptTitle: "섭취량 입력",
      prompt: "섭취량을 숫자만 입력해 주세요.",
    };

    worksheet.getCell("M2:M31").dataValidation = {
      type: "list",
      allowBlank: true,
      formula1: '"많음,적음"',
      showInputMessage: true,
      promptTitle: "활동량 입력",
      prompt: "활동량을 '많음' 또는 '적음'으로 입력해 주세요.",
    };

    worksheet.getCell("N2:N31").dataValidation = {
      type: "whole",
      operator: "greaterThan",
      formula1: "0",
      showInputMessage: true,
      promptTitle: "온도 입력",
      prompt: "온도를 숫자로 입력해 주세요.",
    };

    worksheet.getCell("Y2:Y31").dataValidation = {
      type: "whole",
      operator: "between",
      formula1: "0",
      formula2: "1000000",
      showInputMessage: true,
      promptTitle: "우유 생산량 입력",
      prompt: "우유 생산량을 일 OO으로 숫자만 입력해 주세요.",
    };

    worksheet.getCell("AA2:AA31").dataValidation = {
      type: "whole",
      operator: "between",
      formula1: "0",
      formula2: "10000",
      showInputMessage: true,
      promptTitle: "산란량 입력",
      prompt: "산란량을 일 OO 개로 숫자만 입력해 주세요.",
    };

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
