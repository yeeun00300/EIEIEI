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
      // console.log("Fetched schedules:", schedules);
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
  const handleEditSchedule = (scheduleIndex, contentIndex) => {
    const scheduleToEdit = schedules[scheduleIndex];
    const contentToEdit = scheduleToEdit.content[contentIndex];
    setEditingSchedule({ ...scheduleToEdit, content: contentToEdit }); // 수정할 내용 설정
    setModalOpen(true); // 모달 열기
  };

  const handleAddSchedule = () => {
    if (selectedDate) {
      setEditingSchedule({ date: selectedDate });
      setModalOpen(true);
    } else {
      alert("날짜를 먼저 선택하세요.");
    }
  };
  const handleSaveSchedule = async (schedule) => {
    // console.log("Received schedule object:", schedule); // 전달된 객체 확인

    if (!schedule || !schedule.content || !schedule.content[0]) {
      console.error("Invalid schedule object or missing content");
      return;
    }

    const collectionName = "schedules";
    const email = schedule.email;

    // content 배열에 추가할 새 일정 데이터
    const newScheduleContent = {
      title: schedule.content[0].title || "",
      description: schedule.content[0].description || "",
      time: schedule.content[0].time || "",
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    // console.log("newScheduleContent", newScheduleContent);
    // Firestore에서 이메일로 문서를 조회
    const existingSchedules = schedules.find((sch) => sch.email === email);
    // console.log("existingSchedules", existingSchedules);
    if (existingSchedules) {
      const updatedContent = [...existingSchedules.content, newScheduleContent];
      const updatedScheduleData = {
        ...existingSchedules,
        content: updatedContent,
      };
      const docId = existingSchedules.docId;
      // console.log("Updating existing schedule with ID:", docId);
      await dispatch(
        updateSchedule({
          collectionName,
          docId,
          updatedData: updatedScheduleData,
        })
      );
    } else {
      const newScheduleData = {
        email,
        content: [newScheduleContent],
      };
      // console.log("Adding new schedule:", newScheduleData);
      await dispatch(
        addSchedule({
          collectionName,
          scheduleObj: newScheduleData, // scheduleObj가 전달되는지 확인
        })
      );
    }
    debugger;
    setModalOpen(false);
  };
  // console.log("콘솔로찍은 스케줄스", schedules);

  // debugger;

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
  console.log("filteredSchedules", filteredSchedules);
  // console.log("editingSchedule", editingSchedule);
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
        schedules={filteredSchedules}
        // 선택된 날짜의 일정만 전달
        onEdit={handleEditSchedule}
      ></ScheduleList>
      <ScheduleModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSave={handleSaveSchedule} // 조건에 따라 올바른 함수 설정
        schedules={editingSchedule}
      />
    </div>
  );
};

export default MyCalendar;
