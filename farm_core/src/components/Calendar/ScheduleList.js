import React, { useState } from "react";
import "./ScheduleList.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AllshceduleModal from "./AllshceduleModal";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "..."; // 문자열을 자르고 ... 추가
  }
  return text;
};

const ScheduleList = ({ schedules, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreClick = () => {
    setIsModalOpen(true);
  };

  // 오늘의 일정 수를 계산합니다.
  const totalContents = schedules.reduce((acc, schedule) => {
    if (schedule.content) {
      return acc + schedule.content.length; // 각 schedule의 content 길이를 더함
    }
    return acc;
  }, 0);

  return (
    <div className="schedule-list">
      <p>작성한 금일 일정: {totalContents}개</p> {/* 일정 개수를 표시 */}
      <ul className="schedule-list-items">
        {schedules &&
          schedules.length > 0 &&
          schedules.map((schedule, scheduleIndex) =>
            schedule.content && schedule.content.length > 0
              ? schedule.content
                  .slice(0, 2)
                  .map((contentItem, contentIndex) => (
                    <li
                      key={`${scheduleIndex}-${contentIndex}`}
                      className="schedule-list-item"
                    >
                      <div className="schedule-list-item-content">
                        <span className="schedule-list-item-time">
                          {contentItem.time}
                        </span>
                        <strong>{truncateText(contentItem.title, 5)}</strong>
                        <p className="schedule-list-item-description">
                          {truncateText(contentItem.description, 5)}
                        </p>
                        {/* <small className="schedule-list-item-date">
                          {contentItem.updatedAt
                            ? contentItem.updatedAt.split("T")[0]
                            : contentItem.createdAt.split("T")[0]}
                        </small> */}
                      </div>
                      <div className="schedule-list-item-actions">
                        <FaEdit
                          size="1.5rem"
                          className="schedule-list-item-edit"
                          onClick={() => onEdit(scheduleIndex, contentIndex)}
                        />
                        <MdDelete
                          size="1.5rem"
                          className="schedule-list-item-delete"
                          onClick={() => onDelete(scheduleIndex, contentIndex)}
                        />
                      </div>
                    </li>
                  ))
              : null
          )}
      </ul>
      {schedules && schedules.length > 0 && schedules[0].content.length > 2 && (
        <button onClick={handleMoreClick} className="squareGlobalDeleteBtn">
          금일 일정 전체 보기
        </button>
      )}
      {isModalOpen && (
        <AllshceduleModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          schedules={schedules} // 모든 스케줄을 모달에 전달
        />
      )}
    </div>
  );
};

export default ScheduleList;
