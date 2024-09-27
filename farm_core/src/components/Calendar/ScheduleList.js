import React from "react";
import "./ScheduleList.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ScheduleList = ({ schedules, onEdit, onDelete, editingSchedule }) => {
  // console.log(editingSchedule);
  // 여기서 onEdit은 모달창 열기(거기에 스케줄컬렉션의 문서갯수랑, content의 갯수 보내주고 있음 즉 모달창에다가 저거 두개 주는중)
  return (
    <div className="schedule-list">
      <h2 className="schedule-list-title">Schedule</h2>
      <ul className="schedule-list-items">
        {schedules.map((schedule, scheduleIndex) =>
          // 각 schedule의 content를 map으로 돌려서 랜더링
          schedule.content.map((contentItem, contentIndex) => (
            <li
              key={`${scheduleIndex}-${contentIndex}`}
              className="schedule-list-item"
            >
              <div className="schedule-list-item-content">
                <span className="schedule-list-item-time">
                  {contentItem.time}
                </span>
                <strong>{contentItem.title}</strong>
                <p className="schedule-list-item-description">
                  {contentItem.description}
                </p>
                <small className="schedule-list-item-date">
                  {contentItem.createdAt}
                </small>
              </div>

              <div className="schedule-list-item-actions">
                <FaEdit
                  size="1.5rem"
                  className="schedule-list-item-edit"
                  onClick={() => onEdit(scheduleIndex, contentIndex)}
                >
                  Edit
                </FaEdit>
                <MdDelete
                  size="1.5rem"
                  className="schedule-list-item-delete"
                  onClick={() => onDelete(scheduleIndex, contentIndex)}
                >
                  Delete
                </MdDelete>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ScheduleList;
