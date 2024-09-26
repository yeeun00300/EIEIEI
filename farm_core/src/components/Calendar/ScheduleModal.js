import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ScheduleModal.css"; // 사용자 정의 CSS 파일

Modal.setAppElement("#root");

const ScheduleModal = ({ isOpen, onRequestClose, onSave, schedules }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");

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
    } else {
      // 새로 추가할 때는 기본값을 설정
      setTitle("");
      setDescription("");
      setHour("");
      setMinute("");
      setAmpm("AM");
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
      <h2>{schedules ? "일정 추가하기" : "Add Schedule"}</h2>
      <input
        type="text"
        placeholder="일정 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="inputModal"
      />
      <textarea
        placeholder="일정 내용"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textareaModal"
      />
      <div className="time-picker">
        <select value={hour} onChange={(e) => setHour(e.target.value)}>
          <option value="" disabled>
            시간
          </option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span>:</span>
        <select value={minute} onChange={(e) => setMinute(e.target.value)}>
          <option value="" disabled>
            분
          </option>
          {Array.from({ length: 60 }, (_, i) => i).map((m) => (
            <option key={m} value={m.toString().padStart(2, "0")}>
              {m.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select value={ampm} onChange={(e) => setAmpm(e.target.value)}>
          <option value="AM">오전</option>
          <option value="PM">오후</option>
        </select>
      </div>
      <button onClick={handleSave} className="schedule-btn">
        저장하기
      </button>
    </Modal>
  );
};

export default ScheduleModal;
