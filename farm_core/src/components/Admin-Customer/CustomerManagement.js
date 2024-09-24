import React, { useEffect, useState } from "react";
import styles from "./CustomerManagement.module.scss";
import AdminList from "./AdminList/AdminList";
import Sort from "../../pages/Admin/components/Sort";
import Search from "../../pages/Admin/components/Search";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "../../store/communitySlice/communitySlice";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { Card, Collapse } from "@mui/material";
import NoticeAdd from "./NoticeAdd/NoticeAdd";
import DeclareStateCard from "./DeclareStateCard/DeclareStateCard";
import { getSubCollection } from "../../firebase";
function CustomerManagement() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("공지사항");
  const {
    communityContents,
    livestockContents,
    questionContents,
    noticeContents,
    isLoading,
  } = useSelector((state) => state.communitySlice);
  const [communitySearch, setCommunitySearch] = useState("");
  const [sortBy, setSortBy] = useState("email");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [searchedCommunity, setSearchedCommunity] = useState([]);
  const [open, setOpen] = useState(false);
  // 게시글 상태open
  const [stateOpen, setStateOpen] = useState(false);
  // 댓글 open
  const [commentOpen, setCommentOpen] = useState(false);
  // 댓글 상태open
  const [commentStateOpen, setCommentStateOpen] = useState(false);
  const [commentList, setCommentList] = useState([]);
  // console.log(commentList);
  const statDict = {
    reported: "신고 ",
    black: "차단 ",
    checked: "확인 ",
  };
  const toggleOpen = (id) => {
    setStateOpen((prev) => (prev === id ? "" : id));
  };
  const toggleCommentOpen = (id) => {
    setCommentOpen((prev) => (prev === id ? "" : id));
  };
  const toggleCommentStateOpen = (id) => {
    setCommentStateOpen((prev) => (prev === id ? "" : id));
  };
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  const sortedCommunity = searchedCommunity
    ? [...searchedCommunity].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (sortOrder === "asc") {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      })
    : [searchedCommunity];

  const commentItems = async () => {
    let totalArr = [];
    const result = sortedCommunity.forEach(async (value) => {
      const result = await getSubCollection("community", value.id, "comments");

      if (result.length > 0) {
        const resultArr = result?.map((item) => ({
          ...item,
          communityDocId: value.id,
        }));
        // arr.push([{ communityDocId: value.id }, ...result]);
        totalArr.push(...resultArr);
      }
      setCommentList(totalArr);
      return;
    });
  };

  useEffect(() => {
    if (sort == "커뮤니티") {
      let searched = communityContents;

      if (communitySearch !== "") {
        searched = searched?.filter((item) =>
          item?.email?.includes(communitySearch)
        );
      }
      setSearchedCommunity(searched.length ? searched : communityContents);
      if (communityContents.length > 0) {
      } else {
        console.log("No matching communityContent data :", communityContents);
      }
    } else if (sort == "축산관리") {
      let searched = livestockContents;
      if (communitySearch !== "") {
        searched = searched?.filter((item) =>
          item?.email?.includes(communitySearch)
        );
      }
      setSearchedCommunity(searched.length ? searched : livestockContents);
      if (livestockContents.length > 0) {
      } else {
        console.log("No matching livestockContents data :", livestockContents);
      }
    } else if (sort == "문의사항") {
      let searched = questionContents;
      if (communitySearch !== "") {
        searched = searched?.filter((item) =>
          item?.userEmail?.includes(communitySearch)
        );
      }
      setSearchedCommunity(searched.length ? searched : questionContents);
      if (questionContents.length > 0) {
      } else {
        console.log("No matching questionContents data :", questionContents);
      }
    } else if (sort == "공지사항") {
      let searched = noticeContents;
      if (communitySearch !== "") {
        searched = searched?.filter((item) =>
          item?.userEmail?.includes(communitySearch)
        );
      }
      setSearchedCommunity(searched.length ? searched : noticeContents);
      if (noticeContents.length > 0) {
      } else {
        console.log("No matching noticeContents data :", noticeContents);
      }
    }
    commentItems();
  }, [isLoading]);
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
    const questionQueryOptions = {
      conditions: [
        { field: "communityType", operator: "==", value: "question" },
      ],
    };
    const noticeQueryOptions = {
      conditions: [{ field: "communityType", operator: "==", value: "notice" }],
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
    dispatch(
      fetchCommunityPosts({
        communityType: "question",
        queryOptions: questionQueryOptions,
      })
    );
    dispatch(
      fetchCommunityPosts({
        communityType: "notice",
        queryOptions: noticeQueryOptions,
      })
    );
  }, [sort, search]);

  return (
    <div className={styles.CustomerManagement}>
      <Search
        setSearch={setCommunitySearch}
        placeholder={"이메일을 입력하세요!"}
      />
      {/* <DateRangePickerValue setStartDay={setStartDay} setEndDay={setEndDay} /> */}
      <div className={styles.CustomerManagementNav}>
        <Sort
          title=""
          name="Customer"
          setSort={setSort}
          sortArr={[
            { id: "notice", value: "공지사항", htmlFor: "notice" },
            { id: "freeBoard", value: "커뮤니티", htmlFor: "freeBoard" },
            { id: "livestock", value: "축산관리", htmlFor: "livestock" },
            { id: "question", value: "문의사항", htmlFor: "question" },
          ]}
        />
        {sort == "공지사항" ? (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
              className={styles.newButton}
              type="button"
              aria-controls="CustomerManagementCollapse"
              aria-expanded={open}
            >
              공지 글 쓰기
            </Button>
            <div
              style={{ minHeight: "150px" }}
              className={styles.CustomerManagementCollapse}
            >
              <Collapse in={open} dimension="height">
                <div id="CustomerManagementCollapse">
                  <Card body style={{ width: "400px" }}>
                    <NoticeAdd setOpen={setOpen} />
                  </Card>
                </div>
              </Collapse>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.CustomerManagementTable}>
        <Table striped bordered hover>
          <thead>
            {sort !== "문의사항" ? (
              <tr>
                {/* <th onClick={() => handleSort("email")}>
                  이메일
                  {sortBy === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                </th> */}
                <th onClick={() => handleSort("authorNickName")}>
                  작성자
                  {sortBy === "authorNickName" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("title")}>
                  제목
                  {sortBy === "title" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("content")}>
                  내용
                  {sortBy === "content" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("like")}>
                  👍 {sortBy === "like" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("dislike")}>
                  👎 {sortBy === "dislike" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("createdAt")}>
                  작성시간
                  {sortBy === "createdAt" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("comment")}>
                  댓글
                  {sortBy === "comment" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("declareCount")}>
                  신고
                  {sortBy === "declareCount" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("declareState")}>
                  상태
                  {sortBy === "declareState" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                {/* <th>상세정보</th> */}
              </tr>
            ) : (
              <tr>
                {/* <th onClick={() => handleSort("email")}>
                  이메일
                  {sortBy === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                </th> */}
                <th onClick={() => handleSort("authorNickName")}>
                  작성자
                  {sortBy === "authorNickName" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("message")}>
                  내용
                  {sortBy === "message" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("createdAt")}>
                  작성시간
                  {sortBy === "createdAt" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                {/* <th>상세정보</th> */}
              </tr>
            )}
          </thead>
          <tbody>
            {isLoading ? (
              <div>No Data!!</div>
            ) : (
              <>
                {sort !== "문의사항"
                  ? sortedCommunity?.map((communityItem, idx) => {
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
                        declareReason,
                        id,
                        communityType,
                      } = communityItem;

                      const createDate1 = new Date(createdAt)
                        .toISOString("KR")
                        .split("T")[0]
                        .replaceAll("-", ".");
                      const createDate2 = new Date(createdAt)
                        .toISOString("KR")
                        .split("T")[1]
                        .split(".")[0];
                      const selectComment = commentList?.filter(
                        (item) => item.communityDocId === id
                      );
                      // console.log();

                      return (
                        <>
                          <tr key={idx}>
                            {/* <td>
                            <p className={styles.communityPTag}>{email}</p>
                          </td> */}
                            <td>
                              <p className={styles.communityPTag}>
                                {authorNickName} ({email})
                              </p>
                            </td>
                            <td>
                              <p className={styles.communityPTag}>{title}</p>
                            </td>
                            <td>
                              <p className={styles.communityPTag}>{content}</p>
                            </td>
                            <td>
                              <p className={styles.communityPTag}>{like}</p>
                            </td>
                            <td>
                              <p className={styles.communityPTag}>{dislike}</p>
                            </td>
                            <td>
                              <p className={styles.communityPTag}>
                                {createDate1}
                                <br />
                                {createDate2}
                              </p>
                            </td>
                            <td>
                              <p className={styles.communityPTag}>
                                {selectComment.length > 0 ? (
                                  <button
                                    className={styles.commentCountBtn}
                                    onClick={() => toggleCommentOpen(id)}
                                  >
                                    {selectComment.length}
                                  </button>
                                ) : (
                                  <span>{selectComment.length}</span>
                                )}
                              </p>
                            </td>
                            <td>
                              <p className={styles.communityPTag}>
                                {declareCount}
                              </p>
                            </td>
                            <td>
                              {declareState ? (
                                <div className={styles.communityStateCard}>
                                  <Button
                                    className={styles.communityStateBtn}
                                    onClick={() => toggleOpen(id)}
                                    // onClick={() => setStateOpen(!stateOpen)}
                                    type="button"
                                    aria-controls="communityStateCollapse"
                                    aria-expanded={commentOpen[id] || false}
                                  >
                                    {declareState !== "checked"
                                      ? statDict[declareState]
                                      : "checked"}
                                  </Button>
                                  <div
                                    style={{ minHeight: "150px" }}
                                    className={styles.communityStateCollapse}
                                  >
                                    <Collapse
                                      in={stateOpen === id}
                                      dimension="width"
                                    >
                                      <div id="communityStateCollapse">
                                        <Card body style={{ width: "200px" }}>
                                          <DeclareStateCard
                                            setOpen={setStateOpen}
                                            email={email}
                                            authorNickName={authorNickName}
                                            title={title}
                                            content={content}
                                            declareCount={declareCount}
                                            declareState={declareState}
                                            declareReason={declareReason}
                                            id={id}
                                            communityType={sort}
                                          />
                                        </Card>
                                      </div>
                                    </Collapse>
                                  </div>
                                </div>
                              ) : (
                                <p className={styles.communityPTag}>
                                  {declareState}
                                </p>
                              )}
                            </td>
                          </tr>
                          {/* 댓글버튼 눌렀을때 */}
                          {commentOpen == id ? (
                            <>
                              {selectComment?.map((item) => {
                                const {
                                  subContent,
                                  subCreatedAt,
                                  nickname,
                                  email,
                                  subDeclareCount,
                                  subDeclareReason,
                                  subDeclareState,
                                  docId,
                                } = item;

                                const createDate3 = new Date(subCreatedAt)
                                  ?.toISOString("KR")
                                  .split("T")[0]
                                  .replaceAll("-", ".");
                                const createDate4 = new Date(subCreatedAt)
                                  ?.toISOString("KR")
                                  .split("T")[1]
                                  .split(".")[0];

                                return (
                                  <tr className={styles.commentTr}>
                                    <td colspan="2">
                                      <span className={styles.commentRow}>
                                        ↳
                                      </span>{" "}
                                      {nickname}({email})
                                    </td>
                                    {/* <td> </td> */}
                                    <td colspan="3">{subContent}</td>
                                    {/* <td> </td>
                                    <td> </td> */}
                                    <td colspan="2">
                                      {createDate3}
                                      <br />
                                      {createDate4}
                                    </td>
                                    {/* <td> </td> */}
                                    <td>{subDeclareCount}</td>
                                    <td>
                                      {subDeclareState !== "" ? (
                                        <div
                                          className={styles.communityStateCard}
                                        >
                                          <Button
                                            className={styles.communityStateBtn}
                                            onClick={() =>
                                              toggleCommentStateOpen(docId)
                                            }
                                            type="button"
                                            aria-controls="communityStateCollapse"
                                            aria-expanded={
                                              commentStateOpen[docId] || false
                                            }
                                          >
                                            {subDeclareState !== "checked"
                                              ? statDict[subDeclareState]
                                              : "checked"}
                                          </Button>
                                          <div
                                            style={{ minHeight: "150px" }}
                                            className={
                                              styles.commentStateCollapse
                                            }
                                          >
                                            <Collapse
                                              in={commentStateOpen === docId}
                                              dimension="width"
                                            >
                                              <div id="communityStateCollapse">
                                                <Card
                                                  body
                                                  style={{ width: "200px" }}
                                                >
                                                  <DeclareStateCard
                                                    setOpen={setCommentOpen}
                                                    email={email}
                                                    authorNickName={nickname}
                                                    // title={title}
                                                    content={subContent}
                                                    declareCount={
                                                      subDeclareCount
                                                    }
                                                    declareState={
                                                      subDeclareState
                                                    }
                                                    declareReason={
                                                      subDeclareReason
                                                    }
                                                    id={id}
                                                    commentId={docId}
                                                    comment={true}
                                                    communityType={sort}
                                                  />
                                                </Card>
                                              </div>
                                            </Collapse>
                                          </div>
                                        </div>
                                      ) : (
                                        <p className={styles.communityPTag}>
                                          {subDeclareState}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })
                  : sortedCommunity?.map((questionItem, idx) => {
                      const {
                        email,
                        authorNickName,
                        message,
                        createdAt,
                        communityType,
                        stockType,
                        docId,
                      } = questionItem;
                      const createDate1 = new Date(createdAt)
                        ?.toISOString("KR")
                        .split("T")[0]
                        .replaceAll("-", ".");
                      const createDate2 = new Date(createdAt)
                        ?.toISOString("KR")
                        .split("T")[1]
                        .split(".")[0];
                      return (
                        <tr key={idx}>
                          {/* <td>
                            <p className={styles.communityPTag}>{email}</p>
                          </td> */}
                          <td>
                            <p className={styles.communityPTag}>
                              {authorNickName}({email})
                            </p>
                          </td>
                          <td>
                            <p className={styles.communityPTag}>{message}</p>
                          </td>
                          <td>
                            <p className={styles.communityPTag}>
                              {createDate1}
                              <br />
                              {createDate2}
                            </p>
                          </td>
                          <td>
                            <div className={styles.communityStateCard}>
                              <Button
                                className={styles.communityStateBtn}
                                onClick={() => toggleOpen(id)}
                                // onClick={() => setStateOpen(!stateOpen)}
                                type="button"
                                aria-controls="communityStateCollapse"
                                aria-expanded={commentOpen[id] || false}
                              >
                                {declareState !== "checked"
                                  ? statDict[declareState]
                                  : "checked"}
                              </Button>
                              <div
                                style={{ minHeight: "150px" }}
                                className={styles.communityStateCollapse}
                              >
                                <Collapse
                                  in={stateOpen === id}
                                  dimension="width"
                                >
                                  <div id="communityStateCollapse">
                                    <Card body style={{ width: "200px" }}>
                                      <DeclareStateCard
                                        setOpen={setStateOpen}
                                        email={email}
                                        authorNickName={authorNickName}
                                        // title={title}
                                        content={message}
                                        // declareCount={declareCount}
                                        // declareState={declareState}
                                        // declareReason={declareReason}
                                        id={docId}
                                        communityType={sort}
                                      />
                                    </Card>
                                  </div>
                                </Collapse>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CustomerManagement;
