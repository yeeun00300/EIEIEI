import React, { useEffect, useState } from "react";
import styles from "./QuestionAnswer.module.scss";
import { useSelector } from "react-redux";
import { addComment, deleteComment, getComments } from "../../../firebase";
import { Button, Card, Collapse } from "@mui/material";
import DeclareStateCard from "../DeclareStateCard/DeclareStateCard";

function QuestionAnswer({ sortedCommunity }) {
  const [answer, setAnswer] = useState([]);
  const [answerText, setAnswerText] = useState("");
  // 댓글 open
  const [commentOpen, setCommentOpen] = useState(false);
  // 댓글 상태open
  const [commentStateOpen, setCommentStateOpen] = useState(false);
  const statDict = {
    reported: "신고 ",
    black: "차단 ",
    checked: "확인 ",
  };
  const toggleCommentOpen = (id) => {
    setCommentOpen((prev) => (prev === id ? "" : id));
  };
  const toggleCommentStateOpen = (id) => {
    setCommentStateOpen((prev) => (prev === id ? "" : id));
  };

  const fetchComments = async () => {
    let resultArr = [];
    sortedCommunity.map(async (item) => {
      const fetchedComments = await getComments(item.id);
      const resultComments = fetchedComments?.map((comment) => ({
        ...comment,
        questionDocId: item.id,
      }));
      if (resultComments.length > 0) {
        resultArr.push(resultComments);
      }
      setAnswer(resultArr.flat());
    });
  };
  const nickname = useSelector(
    (state) => state.checkLoginSlice.checkLogin.nickname
  );
  const profileImage = useSelector(
    (state) => state.checkLoginSlice.checkLogin.profileImages
  );
  // const commentItems = async () => {
  //   let totalArr = [];
  //   const result = sortedCommunity.forEach(async (value) => {
  //     const result = await getSubCollection(
  //       "community",
  //       value.id,
  //       "comments"
  //     );

  //     if (result.length > 0) {
  //       const resultArr = result?.map((item) => ({
  //         ...item,
  //         communityDocId: value.id,
  //       }));
  //       // arr.push([{ communityDocId: value.id }, ...result]);
  //       totalArr.push(...resultArr);
  //     }
  //     setCommentList(totalArr);
  //     return;
  //   });
  // };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <>
      {sortedCommunity?.map((questionItem, idx) => {
        const {
          email,
          authorNickName,
          message,
          createdAt,
          communityType,
          stockType,
          id,
        } = questionItem;

        const questionDocId = questionItem.id;
        const createDate1 = new Date(createdAt)
          ?.toISOString("KR")
          .split("T")[0]
          .replaceAll("-", ".");
        const createDate2 = new Date(createdAt)
          ?.toISOString("KR")
          .split("T")[1]
          .split(".")[0];

        // 선택된 답변 배열
        const selectAnswer = answer.filter(
          (item) => item.questionDocId === questionDocId
        );

        const handleAddComment = async () => {
          if (!answerText.trim()) return;

          const comment = {
            nickname: nickname,
            subContent: answerText,
            email: email,
            profileImage: profileImage,
            subDeclareCount: 0,
            subDeclareReason: "",
            subDeclareState: "",
          };

          await addComment(questionDocId, comment);

          // 댓글 추가 후 최신 댓글 목록을 가져옴
          fetchComments();
          setAnswerText(""); // 입력 필드 초기화
          alert(`${authorNickName}에게 답변을 보냈습니다.`);
        };

        return (
          <>
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
                <p className={styles.communityPTag}>
                  {selectAnswer.length > 0 ? (
                    <button
                      className={styles.commentCountBtn}
                      onClick={() => toggleCommentOpen(questionDocId)}
                    >
                      {selectAnswer.length}
                    </button>
                  ) : (
                    <span>{selectAnswer.length}</span>
                  )}
                </p>
              </td>
              <td>
                <p className={styles.communityPTag}>
                  {createDate1}
                  <br />
                  {createDate2}
                </p>
              </td>
              <td>
                <div className={styles.answerSendBox}>
                  <form>
                    <textarea
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="답변 내용을 입력하세요..."
                    ></textarea>
                  </form>

                  <button onClick={handleAddComment}>답변하기</button>
                </div>
              </td>
            </tr>
            {commentOpen == questionDocId ? (
              <>
                {selectAnswer?.map((item) => {
                  const {
                    subContent,
                    subCreatedAt,
                    nickname,
                    email,
                    subDeclareCount,
                    subDeclareReason,
                    subDeclareState,
                  } = item;

                  const commentDocId = item.id;

                  const createDate1 = new Date(subCreatedAt)
                    ?.toISOString("KR")
                    .split("T")[0]
                    .replaceAll("-", ".");
                  const createDate2 = new Date(subCreatedAt)
                    ?.toISOString("KR")
                    .split("T")[1]
                    .split(".")[0];

                  return (
                    <tr>
                      <td>
                        {nickname}({email})
                      </td>
                      <td colspan="2">{subContent}</td>
                      {/* <td></td> */}
                      <td>
                        {createDate1}
                        <br />
                        {createDate2}
                      </td>
                      <td>{subDeclareCount}</td>
                      <td>
                        {/* <div className={styles.communityStateCard}>
                          <Button
                            className={styles.communityStateBtn}
                            onClick={() => toggleCommentStateOpen(commentDocId)}
                            type="button"
                            aria-controls="communityStateCollapse"
                            aria-expanded={
                              commentStateOpen[commentDocId] || false
                            }
                          >
                            {subDeclareState !== "checked"
                              ? statDict[subDeclareState]
                              : "checked"}
                          </Button>
                          <div
                            style={{ minHeight: "150px" }}
                            className={styles.commentStateCollapse}
                          >
                            <Collapse
                              in={commentStateOpen === commentDocId}
                              dimension="width"
                            >
                              <div id="communityStateCollapse">
                                <Card body style={{ width: "200px" }}>
                                  <DeclareStateCard
                                    setOpen={setCommentOpen}
                                    email={email}
                                    authorNickName={nickname}
                                    // title={title}
                                    content={subContent}
                                    declareCount={subDeclareCount}
                                    declareState={subDeclareState}
                                    declareReason={subDeclareReason}
                                    id={questionDocId}
                                    commentId={commentDocId}
                                    comment={true}
                                  />
                                </Card>
                              </div>
                            </Collapse>
                          </div>
                        </div> */}
                        <button
                          onClick={() => {
                            deleteComment(questionDocId, commentDocId);
                            alert("공지게시판 삭제가 완료되었습니다.");
                          }}
                          className={styles.deleteBtn}
                        >
                          삭제하기
                        </button>
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
      })}
    </>
  );
}

export default QuestionAnswer;
