import React, { useEffect, useState } from "react";
import styles from "./CustomerManagement.module.scss";
import AdminList from "./AdminList/AdminList";
import Sort from "../../pages/Admin/components/Sort";
import Search from "../../pages/Admin/components/Search";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "../../store/communitySlice/communitySlice";

function CustomerManagement() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { communityContents, livestockContents, isLoading } = useSelector(
    (state) => state.communitySlice
  );
  // freeboard
  const freeboardColumns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "email",
      headerName: "이메일",
      width: 180,
      editable: true,
    },
    {
      field: "authorNickName",
      headerName: "작성자",
      width: 100,
      editable: true,
    },
    {
      field: "title",
      headerName: "제목",
      width: 100,
      editable: true,
    },
    {
      field: "content",
      headerName: "내용",
      width: 100,
      editable: true,
    },
    {
      field: "like",
      headerName: "👍",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "dislike",
      headerName: "👎",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "작성시간",
      // type: "number",
      width: 140,
      editable: true,
    },
    {
      field: "declareCount",
      headerName: "누적신고",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "declareState",
      headerName: "상태",
      // type: "number",
      width: 100,
      editable: true,
    },
  ];
  const freeboardRows = communityContents?.map((item, idx) => {
    const {
      email,
      authorNickName,
      title,
      content,
      like,
      dislike,
      createdAt,
      declareCount,
      declareState,
    } = item;
    return {
      id: idx,
      email: email || "X",
      authorNickName: authorNickName || "X",
      title: title || "X",
      content: content || "X",
      like: like || "X",
      dislike: dislike || "X",
      createdAt: createdAt || "X",
      declareCount: declareCount || "X",
      declareState: declareState || "X",
    };
  });
  // livestock
  const livestockColumns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "email",
      headerName: "이메일",
      width: 180,
      editable: true,
    },
    {
      field: "authorNickName",
      headerName: "작성자",
      width: 100,
      editable: true,
    },
    {
      field: "title",
      headerName: "제목",
      width: 100,
      editable: true,
    },
    {
      field: "content",
      headerName: "내용",
      width: 100,
      editable: true,
    },
    {
      field: "like",
      headerName: "👍",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "dislike",
      headerName: "👎",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "작성시간",
      // type: "number",
      width: 140,
      editable: true,
    },
    {
      field: "declareCount",
      headerName: "누적신고",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "declareState",
      headerName: "상태",
      // type: "number",
      width: 100,
      editable: true,
    },
  ];
  const livestockRows = communityContents?.map((item, idx) => {
    const {
      email,
      authorNickName,
      title,
      content,
      like,
      dislike,
      createdAt,
      declareCount,
      declareState,
    } = item;
    return {
      id: idx,
      email: email || "X",
      authorNickName: authorNickName || "X",
      title: title || "X",
      content: content || "X",
      like: like || "0",
      dislike: dislike || "0",
      createdAt: createdAt || "X",
      declareCount: declareCount || "X",
      declareState: declareState || "X",
    };
  });
  // question
  const questionColumns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "userEmail",
      headerName: "이메일",
      width: 180,
      editable: true,
    },
    {
      field: "nickname",
      headerName: "작성자",
      width: 100,
      editable: true,
    },
    {
      field: "message",
      headerName: "내용",
      width: 100,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "작성시간",
      // type: "number",
      width: 140,
      editable: true,
    },
  ];
  const questionRows = communityContents?.map((item, idx) => {
    const {
      email,
      authorNickName,
      title,
      content,
      like,
      dislike,
      createdAt,
      declareCount,
      declareState,
    } = item;
    return {
      id: idx,
      email: email || "X",
      authorNickName: authorNickName || "X",
      title: title || "X",
      content: content || "X",
      like: like || "0",
      dislike: dislike || "0",
      createdAt: createdAt || "X",
      declareCount: declareCount || "X",
      declareState: declareState || "X",
    };
  });
  const sortComponent = () => {
    const componentMap = {
      "": (
        <AdminList
          title={"공지사항"}
          columns={freeboardColumns}
          rows={freeboardRows}
        />
      ),
      공지사항: (
        <AdminList
          title={"공지사항"}
          columns={livestockColumns}
          rows={livestockRows}
        />
      ),
      커뮤니티: (
        <AdminList
          title={"커뮤니티"}
          columns={freeboardColumns}
          rows={freeboardRows}
        />
      ),
      축산관리: (
        <AdminList
          title={"축산관리"}
          columns={livestockColumns}
          rows={livestockRows}
        />
      ),
      // 문의사항: (
      //   <AdminList
      //     title={"문의사항"}
      //     columns={questionColumns}
      //     rows={questionRows}
      //   />
      // ),
    };
    return componentMap[sort] || <h1>Default Content</h1>;
  };
  useEffect(() => {
    const freeboardQueryOptions = {
      conditions: [
        { field: "communityType", operator: "==", value: "freeboard" },
      ],
    };
    const livestockQueryOptions = {
      conditions: [
        { field: "communityType", operator: "==", value: "livestock" },
      ],
    };
    dispatch(
      fetchCommunityPosts({
        communityType: "freeboard",
        queryOptions: freeboardQueryOptions,
      })
    );
    dispatch(
      fetchCommunityPosts({
        communityType: "livestock",
        queryOptions: livestockQueryOptions,
      })
    );
  }, [search, sort]);
  return (
    <div className={styles.CustomerManagement}>
      <Search setSearch={setSearch} />
      <DateRangePickerValue />
      <Sort
        title=""
        name="Customer"
        setSort={setSort}
        sortArr={[
          { id: "notice", value: "공지사항", htmlFor: "notice" },
          { id: "freeBoard", value: "커뮤니티", htmlFor: "freeBoard" },
          { id: "livestock", value: "축산관리", htmlFor: "livestock" },
          // { id: "question", value: "문의사항", htmlFor: "question" },
        ]}
      />
      {sortComponent()}
      {/* <AdminList title={"공지사항"} />
      <AdminList title={"자유게시판"} />
      <AdminList title={"커뮤니티"} /> */}
    </div>
  );
}

export default CustomerManagement;
