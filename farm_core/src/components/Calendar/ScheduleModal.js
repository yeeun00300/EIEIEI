import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ScheduleModal.css"; // 사용자 정의 CSS 파일

Modal.setAppElement("#root");

const ScheduleModal = ({ isOpen, onRequestClose, onSave, schedule }) => {
  const [title, setTitle] = useState(schedule?.title || "");
  const [description, setDescription] = useState(schedule?.description || "");
  const [hour, setHour] = useState(
    schedule?.time ? parseInt(schedule.time.split(":")[0]) : ""
  ); // 시간
  const [minute, setMinute] = useState(
    schedule?.time ? schedule.time.split(":")[1].split(" ")[0] : ""
  ); // 분
  const [ampm, setAmpm] = useState(
    schedule?.time ? schedule.time.split(" ")[1] : "AM"
  ); // 오전/오후

  const handleSave = () => {
    const formattedTime = `${hour}:${minute} ${ampm}`;
    onSave({
      title,
      description,
      time: formattedTime,
      date: schedule?.date || new Date(),
    });
    onRequestClose();
  };

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title || "");
      setDescription(schedule.description || "");
      if (schedule.time) {
        const [time, period] = schedule.time.split(" ");
        const [h, m] = time.split(":");
        setHour(parseInt(h));
        setMinute(m);
        setAmpm(period);
      }
    }
  }, [schedule]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Schedule Modal"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2>{schedule ? "Edit Schedule" : "Add Schedule"}</h2>
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
      <button onClick={handleSave}>Save</button>
    </Modal>
  );
};

export default ScheduleModal;
