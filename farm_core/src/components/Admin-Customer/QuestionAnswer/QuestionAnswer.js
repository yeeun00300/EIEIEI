import React from "react";
import styles from "./QuestionAnswer.module.scss";

function QuestionAnswer({ sortedCommunity }) {
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
                <button>답장하기</button>
                <QuestionAnswer />
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default QuestionAnswer;
