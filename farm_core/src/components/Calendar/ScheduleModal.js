import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ScheduleModal.css"; // 사용자 정의 CSS 파일

Modal.setAppElement("#root");

const ScheduleModal = ({ isOpen, onRequestClose, onSave, schedules }) => {
  const [title, setTitle] = useState(schedules?.title || "");
  const [description, setDescription] = useState(schedules?.description || "");
  const [hour, setHour] = useState(
    schedules?.time ? parseInt(schedules.time.split(":")[0]) : ""
  ); // 시간
  const [minute, setMinute] = useState(
    schedules?.time ? schedules.time.split(":")[1].split(" ")[0] : ""
  ); // 분
  const [ampm, setAmpm] = useState(
    schedules?.time ? schedules.time.split(" ")[1] : "AM"
  ); // 오전/오후

  const handleSave = () => {
    const formattedTime = `${hour}:${minute} ${ampm}`;
    onSave({
      title,
      description,
      time: formattedTime,
      date: schedules?.date || new Date(),
    });
    onRequestClose();
  };

  useEffect(() => {
    if (schedules) {
      setTitle(schedules.title || "");
      setDescription(schedules.description || "");
      if (schedules.time) {
        const [time, period] = schedules.time.split(" ");
        const [h, m] = time.split(":");
        setHour(parseInt(h));
        setMinute(m);
        setAmpm(period);
      }
    }
  }, [schedules]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Schedule Modal"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2>{schedules ? "Edit Schedule" : "Add Schedule"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="time-picker">
        <select value={hour} onChange={(e) => setHour(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span>:</span>
        <select value={minute} onChange={(e) => setMinute(e.target.value)}>
          {Array.from({ length: 60 }, (_, i) => i).map((m) => (
            <option key={m} value={m.toString().padStart(2, "0")}>
              {m.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select value={ampm} onChange={(e) => setAmpm(e.target.value)}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button onClick={handleSave} className="schedule-btn">
        Save
      </button>
    </Modal>
  );
};

export default ScheduleModal;
