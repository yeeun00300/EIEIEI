import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import moment from "moment";
import "./styles.css";
import ScheduleModal from "./ScheduleModal"; // 모달 컴포넌트 임포트
import ScheduleList from "./ScheduleList"; // 스케줄 리스트 컴포넌트 임포트
import {
  addSchedule,
  deleteSchedule,
  fetchSchedules,
  updateSchedule,
} from "../../store/scheduleSlice/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import scheduleSlice from "./../../store/scheduleSlice/scheduleSlice";

Modal.setAppElement("#root");

const MyCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(today);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const email = localStorage.getItem("email");

  const dispatch = useDispatch();
  const { schedules, loading, error } = useSelector(
    (state) => state.scheduleSlice
  );
  // 스케줄 가져오기
  useEffect(() => {
    const queryOptions = {
      conditions: [{ field: "email", operator: "==", value: email }],
    };
    dispatch(fetchSchedules({ collectionName: "schedules", queryOptions }));
  }, [dispatch]);

  useEffect(() => {
    if (schedules?.length > 0) {
      console.log("Fetched schedules:", schedules);
    } else {
      console.log("No schedules found or still loading.");
    }
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

  const handleSaveSchedule = async (schedule) => {
    console.log("handleSaveSchedule called", schedule); // 추가된 로그
    const collectionName = "schedules";
    const existingSchedule = schedules.find(
      (sch) => sch.email === schedule.email
    ) || { content: [] };

    const scheduleData = {
      ...existingSchedule,
      content: [
        ...existingSchedule.content,
        {
          title: schedule.content[0].title || "",
          description: schedule.content[0].description || "",
          time: schedule.content[0].time || "",
          createdAt: new Date().toISOString(),
          updatedAt: null,
        },
      ],
    };

    if (editingSchedule?.index !== undefined) {
      const existingSchedule = schedules[editingSchedule.index];
      if (existingSchedule) {
        const docId = existingSchedule.id;
        console.log("Dispatching updateSchedule", {
          collectionName,
          docId,
          updatedData: scheduleData,
        });

        const result = await dispatch(
          updateSchedule({ collectionName, docId, updatedData: scheduleData })
        );

        console.log("Dispatch result:", result); // 여기에 로그 추가
        if (updateSchedule.fulfilled.match(result)) {
          console.log("Update succeeded:", result.payload); // 업데이트 성공 시
        } else {
          console.error("Update failed:", result.error); // 업데이트 실패 시
        }
      }
    }
    setModalOpen(false);
    setSelectedDate(schedule.date);
    setDate(schedule.date);
  };
  const handleDeleteSchedule = (index) => {
    const docId = schedules[index].id;
    const collectionName = "schedules";
    dispatch(deleteSchedule({ collectionName, docId }));
  };

  const renderDotForDate = (date) => {
    if (schedules && Array.isArray(schedules)) {
      const hasSchedule = schedules.some((schedule) =>
        moment(schedule.date).isSame(date, "day")
      );
      if (hasSchedule) {
        return <div className="dot" />;
      }
    }
    return null;
  };

  const filteredSchedules =
    schedules && schedules.length > 0
      ? schedules.filter((schedule) =>
          selectedDate
            ? moment(schedule.date).isSame(selectedDate, "day")
            : false
        )
      : [];

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
