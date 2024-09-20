import React, { useEffect, useState } from "react";
import { deleteDatas, getDatas } from "../../../firebase";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

function QuestionList(props) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getDatas("community", [
        { field: "communityType", operator: "==", value: "question" },
      ]);
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "stockType", headerName: "가축 종류", width: 150 },
    { field: "message", headerName: "문의 내용", width: 300 },
    { field: "createdAt", headerName: "작성일", width: 200 },
    // 수정 및 삭제 버튼을 위한 컬럼 추가
    {
      field: "actions",
      headerName: "액션",
      width: 200,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row)}>수정</button>
          <button onClick={() => handleDelete(params.row.docId)}>삭제</button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    // 수정 기능 구현
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDatas("community", docId);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.docId !== docId)
      );
      alert("문의가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("문의 삭제 중 오류 발생: ", error);
      alert("문의 삭제에 실패했습니다.");
    }
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={questions} columns={columns} pageSize={5} />
    </div>
  );
}

export default QuestionList;
