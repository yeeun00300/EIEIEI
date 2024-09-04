import React from "react";
import "./ScheduleList.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ScheduleList = ({ schedules, onEdit, onDelete }) => {
  return (
    <div className="schedule-list">
      <h2 className="schedule-list-title">Schedule</h2>
      <ul className="schedule-list-items">
        {schedules.map((schedule, index) => (
          <li key={index} className="schedule-list-item">
            <div className="schedule-list-item-content">
              <span className="schedule-list-item-time">{schedule.time}</span>
              <strong>{schedule.title}</strong>
              <p className="schedule-list-item-description">
                {schedule.description}
              </p>
            </div>
            <div className="schedule-list-item-actions">
              <FaEdit
                size="1.5rem"
                className="schedule-list-item-edit"
                onClick={() => onEdit(index)}
              >
                Edit
              </FaEdit>
              <MdDelete
                size="1.5rem"
                className="schedule-list-item-delete"
                onClick={() => onDelete(index)}
              >
                Delete
              </MdDelete>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleList;
