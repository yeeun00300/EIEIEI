import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ScheduleModal.css"; // 사용자 정의 CSS 파일

Modal.setAppElement("#root");

const ScheduleModal = ({
  isOpen,
  onRequestClose,
  onSave, // 새로운 일정 저장
  schedules, //
  onUpdate,
  contentIndex,
  selectedDate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");

  const handleSave = () => {
    if (!title || !description || !hour || !minute) {
      alert("모든 필드를 채워주세요."); // 필수 필드가 입력되지 않았을 때 경고
      return;
    }

    const formattedTime = `${hour}:${minute} ${ampm}`;
    const currentDate = new Date().toISOString(); // 현재 시간 ISO 형식으로 변환
    const email = localStorage.getItem("email");

    const scheduleObj = {
      email,
      content: [
        {
          title, // 사용자가 입력한 제목
          description, // 사용자가 입력한 설명
          time: formattedTime,
          date: selectedDate || currentDate,
          updatedAt: null, // 수정되지 않은 경우 null
          createdAt: currentDate,
        },
      ],
    };
    // debugger;
    // 조건에 따라 onSave 또는 onUpdate 호출
    if (contentIndex !== undefined) {
      // 수정 모드
      onUpdate({ ...scheduleObj, contentIndex }); // 수정된 스케줄 객체 전달
    } else {
      // 추가 모드
      onSave(scheduleObj); // 새 스케줄 객체 전달
    }

    onRequestClose(); // 모달 닫기
  };

  useEffect(() => {
    if (schedules && schedules.content) {
      setTitle(schedules.content.title || "");
      setDescription(schedules.content.description || "");
      if (schedules.content.time) {
        const [time, period] = schedules.content.time.split(" ");
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
      <h2>{schedules ? "일정 수정하기" : "일정 추가하기"}</h2>
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
