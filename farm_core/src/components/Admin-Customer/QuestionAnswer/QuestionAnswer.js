import React, { useState } from "react";
import styles from "./QuestionAnswer.module.scss";
import { useSelector } from "react-redux";
import { addComment, getComments } from "../../../firebase";

function QuestionAnswer({ sortedCommunity }) {
  const [answer, setAnswer] = useState([]);
  console.log(answer);

  const [answerText, setAnswerText] = useState("");
  // const [searchedCommunity, setSearchedCommunity] = useState([]);
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
          docId,
        } = questionItem;
        console.log(questionItem);

        const createDate1 = new Date(createdAt)
          ?.toISOString("KR")
          .split("T")[0]
          .replaceAll("-", ".");
        const createDate2 = new Date(createdAt)
          ?.toISOString("KR")
          .split("T")[1]
          .split(".")[0];
        const fetchComments = async () => {
          const fetchedComments = await getComments(docId);
          setAnswer(fetchedComments);
        };
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

          await addComment(id, comment);

          // 댓글 추가 후 최신 댓글 목록을 가져옴
          fetchComments();
          setAnswerText(""); // 입력 필드 초기화
          alert(`${authorNickName}에게 답변을 보냈습니다.`);
        };

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
        );
      })}
    </>
  );
}

export default QuestionAnswer;
