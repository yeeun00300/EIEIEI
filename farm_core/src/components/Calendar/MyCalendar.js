import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import moment from "moment";
import "./styles.css";
import ScheduleModal from "./ScheduleModal"; // 모달 컴포넌트 임포트
import ScheduleList from "./ScheduleList"; // 스케줄 리스트 컴포넌트 임포트

Modal.setAppElement("#root");

const MyCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(today);
  const [schedules, setSchedules] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    const storedSchedules = JSON.parse(localStorage.getItem("schedules"));
    if (storedSchedules) {
      setSchedules(storedSchedules);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate);
  };

  const handleTodayClick = () => {
    setActiveStartDate(today);
    setDate(today);
    setSelectedDate(today);
  };

  const handleAddSchedule = () => {
    if (selectedDate) {
      setEditingSchedule({ date: selectedDate });
      setModalOpen(true);
    } else {
      alert("날짜를 먼저 선택하세요.");
    }
  };

  const handleEditSchedule = (index) => {
    setEditingSchedule({ ...schedules[index], index });
    setModalOpen(true);
  };

  const handleSaveSchedule = (schedule) => {
    const newSchedules = [...schedules];
    if (editingSchedule?.index !== undefined) {
      newSchedules[editingSchedule.index] = schedule;
    } else {
      newSchedules.push(schedule);
    }
    setSchedules(newSchedules);
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleDeleteSchedule = (index) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  // 해당 날짜에 일정이 있는지 확인하여 점을 표시하는 함수
  const renderDotForDate = (date) => {
    const hasSchedule = schedules.some((schedule) =>
      moment(schedule.date).isSame(date, "day")
    );
    if (hasSchedule) {
      return <div className="dot" />;
    }
    return null;
  };

  // 선택된 날짜에 해당하는 일정 필터링
  const filteredSchedules = schedules.filter((schedule) =>
    selectedDate ? moment(schedule.date).isSame(selectedDate, "day") : false
  );

  return (
    <div className="calendar-wrapper">
      <Calendar
        className="calendar"
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => date.getDate()}
        formatYear={(locale, date) => date.getFullYear()}
        formatMonthYear={(locale, date) =>
          `${date.getFullYear()}. ${date.getMonth() + 1}`
        }
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        tileContent={({ date, view }) => {
          let html = [];
          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(<div className="today-text" key="today"></div>);
          }
          html.push(renderDotForDate(date));
          return <>{html}</>;
        }}
      />
      <div className="today-button" onClick={handleTodayClick}>
        오늘
      </div>
      <div className="schedule-info">
        {selectedDate && (
          <div className="selected-date-info">
            선택된 날짜:{" "}
            <span className="selected-date-info-num">
              {moment(selectedDate).format("YYYY-MM-DD")}
            </span>
          </div>
        )}
        <span>일정 추가 : </span>
        <button className="add-schedule-button" onClick={handleAddSchedule}>
          +
        </button>
      </div>
      <ScheduleList
        schedules={filteredSchedules} // 선택된 날짜의 일정만 전달
        onEdit={handleEditSchedule}
        onDelete={handleDeleteSchedule}
      ></ScheduleList>
      <ScheduleModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSave={handleSaveSchedule}
        schedules={editingSchedule}
      />
    </div>
  );
};

export default MyCalendar;
