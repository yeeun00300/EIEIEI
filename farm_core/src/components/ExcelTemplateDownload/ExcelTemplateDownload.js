import React from "react";
import * as XLSX from "xlsx-style";

function ExcelTemplateDownload(props) {
  const downloadTemplate = () => {
    // 데이터 설정
    const wsData = [
      [
        "가축 종류",
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
        "백신 접종",
        "질병 및 치료 (예시 입니다. 옆칸에 작성해주세요)",
        "실제 질병 및 치료 데이터",
        "백신 접종 (예시 입니다. 옆칸에 작성해주세요)",
        "실제 백신 접종 데이터",
        "출산 횟수",
        "출산일",
        "출사 예정일",
        "우유 생산량",
        "성장 속도",
        "산란량",
      ],
    ];

    // 워크시트 생성
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // 셀 스타일 설정
    const cellStyle = {
      font: { sz: 12, bold: true },
      fill: {
        fgColor: { rgb: "FFFF00" }, // 노란색 배경
      },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };

    // 스타일 적용
    ws["A1"].s = cellStyle;
    ws["S1"].s = cellStyle;
    ws["R1"].s = cellStyle;

    // 셀 크기 조정 (열 너비 설정)
    ws["!cols"] = [
      { wpx: 150 }, // A 열 너비
      { wpx: 150 }, // B 열 너비
      // ...
      { wpx: 150 }, // Z 열 너비
    ];

    // 워크북 생성 및 워크시트 추가
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // 파일 작성 및 다운로드
    XLSX.writeFile(wb, "stock_template.xlsx");
  };

  return (
    <div>
      <button onClick={downloadTemplate}>엑셀 다운로드</button>
    </div>
  );
}

export default ExcelTemplateDownload;
