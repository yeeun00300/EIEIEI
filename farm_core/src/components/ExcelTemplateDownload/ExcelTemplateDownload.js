import React from "react";
import * as XLSX from "xlsx";

function ExcelTemplateDownload(props) {
  const downloadTemplate = () => {
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
        "질병 및 치료",
        "출산 횟수",
        "출산일",
        "출사 예정일",
        "우유 생산량",
        "성장 속도",
        "산란량",
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "stock_template.xlsx");
  };

  return (
    <div>
      <button onClick={downloadTemplate}>엑셀 다운로드</button>
    </div>
  );
}

export default ExcelTemplateDownload;
