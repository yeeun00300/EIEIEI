import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import moment from "moment";
import "./MyCalender.css";
import ScheduleModal from "./ScheduleModal"; // 모달 컴포넌트 임포트
import ScheduleList from "./ScheduleList"; // 스케줄 리스트 컴포넌트 임포트
import {
  addSchedule,
  deleteSchedule,
  fetchSchedules,
  updateSchedule,
} from "../../store/scheduleSlice/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";

Modal.setAppElement("#root");

const MyCalendar = () => {
  const today = new Date();
  // 현재 날짜
  const [date, setDate] = useState(today);
  // 캘린더에 활성화된 시작 날짜
  const [activeStartDate, setActiveStartDate] = useState(today);
  // 모달의 열닫기하는거
  const [modalOpen, setModalOpen] = useState(false);
  // 현재 수정중인 일정
  const [editingSchedule, setEditingSchedule] = useState(null);
  // 사용자가 선택한날짜
  const [selectedDate, setSelectedDate] = useState(today);
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);
  const email = localStorage.getItem("email");
  const [refresh, setRefresh] = useState(false);
  const [isScheduleListOpen, setIsScheduleListOpen] = useState(true);
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

  // 스케줄 상태 변경 확인
  useEffect(() => {
    if (schedules?.length > 0) {
    } else {
      console.log("No schedules found or still loading.");
    }
  }, [schedules]);

  // 날짜 변경 처리
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate);
  };
  // 오늘 날짜로 이동
  const handleTodayClick = () => {
    setActiveStartDate(today);
    setDate(today);
    setSelectedDate(today);
  };

  // 일정 수정 처리 : 특정 일정을 수정하기 위해 해당 일정의 데이터를 설정하고 모달을 열어 수정화면을 표시
  const handleEditSchedule = (scheduleIndex, contentIndex) => {
    // 이거는 내가 스케줄이란 컬렉션에 등록한 문서의 갯수(인덱스)
    // 이거는 진짜 content 인덱스

    // 이건 문서임 즉 스케줄컬렉션에 있는 내가 쓴 문서
    const scheduleToEdit = schedules[scheduleIndex];
    // 이건 문서중에 content만 있는거임
    const contentToEdit = scheduleToEdit.content[contentIndex];
    setEditingSchedule({
      ...scheduleToEdit,
      content: contentToEdit,
      contentIndex,
    }); // 수정할 내용 설정 인덱스도 보냄
    // 이거 찍으니까 결국이 edttingSchedule 에는 내가 누른 그 문서가 나오네
    setModalOpen(true); // 모달 열기
  };

  // 사용자가 일정 추가할때 하는거
  const handleAddSchedule = () => {
    if (selectedDate) {
      setEditingSchedule({ date: selectedDate });
      setModalOpen(true);
    } else {
      alert("날짜를 먼저 선택하세요.");
    }
  };
  const toggleCalendar = () => {
    setIsCalendarOpen((prevState) => !prevState);
  };
  // 새로운 일정이 추가되거나 기존 일정이 업데이트 됌. 즉 배열이 생김
  const handleSaveSchedule = async (schedule) => {
    // schedule.content 배열의 유효성 검사
    if (!schedule || !schedule.content || schedule.content.length === 0) {
      console.error("Invalid schedule object or missing content");
      return;
    }

    const collectionName = "schedules";
    const email = schedule.email;

    const newScheduleContent = {
      title: schedule.content[0].title || "",
      description: schedule.content[0].description || "",
      time: schedule.content[0].time || "",
      date: selectedDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Firestore에서 이메일로 문서를 조회
    const existingSchedules = schedules.find((sch) => sch.email === email);

    if (existingSchedules) {
      const updatedContent = [...existingSchedules.content, newScheduleContent];
      const updatedScheduleData = {
        ...existingSchedules,
        content: updatedContent,
      };
      const docId = existingSchedules.docId;

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
      await dispatch(
        addSchedule({
          collectionName,
          scheduleObj: newScheduleData,
        })
      );
    }

    // 새 스케줄을 추가한 후 schedules를 다시 가져옴
    const queryOptions = {
      conditions: [{ field: "email", operator: "==", value: email }],
    };
    await dispatch(
      fetchSchedules({ collectionName: "schedules", queryOptions })
    );

    setModalOpen(false);
  };

  // 일정 업데이트 처리 : 기존 일정 찾고 수정할 내용을 firestore에 업데이트
  const handleUpdateSchedule = async (schedule) => {
    // 잘나왔음
    if (!schedule || !schedule.content || !schedule.content[0]) {
      console.error("Invalid schedule object or missing content");
      return;
    }

    const collectionName = "schedules";
    const email = schedule.email;

    const contentIndex = schedule.contentIndex; // 이 값을 설정해야 함
    const updatedContent = {
      title: schedule.content[0].title || "",
      description: schedule.content[0].description || "",
      date: selectedDate,
      time: schedule.content[0].time || "",
      updatedAt: new Date().toISOString(), // 수정 시간
    };

    const existingSchedules = schedules.find((sch) => sch.email === email);

    if (existingSchedules) {
      // contentIndex를 사용하여 해당 일정 업데이트
      const updatedContentArray = [...existingSchedules.content];
      updatedContentArray[contentIndex] = updatedContent; // 특정 인덱스의 내용을 수정

      const updatedScheduleData = {
        ...existingSchedules,
        content: updatedContentArray,
      };
      const docId = existingSchedules.docId;
      // Firestore에 업데이트된 데이터를 전송
      await dispatch(
        updateSchedule({
          collectionName,
          docId,
          updatedData: updatedScheduleData,
        })
      );
      setModalOpen(false);
    } else {
      console.log("일치하는 일정이 없습니다.");
    }
  };

  const handleDeleteSchedule = async (scheduleIndex) => {
    const scheduleToDelete = schedules[scheduleIndex];

    if (!scheduleToDelete) {
      console.error("No schedule found at the provided index");
      return;
    }

    const collectionName = "schedules";
    const email = scheduleToDelete.email;

    const existingSchedules = schedules.find((sch) => sch.email === email);

    if (existingSchedules) {
      const contentIndex = scheduleIndex; // 화면에서 보여지는 인덱스
      const updatedContent = existingSchedules.content.filter(
        (_, index) => index !== contentIndex
      );

      const docId = existingSchedules.docId;

      if (updatedContent.length === 0) {
        await dispatch(deleteSchedule({ collectionName, docId }));
      } else {
        await dispatch(
          updateSchedule({
            collectionName,
            docId,
            updatedData: { ...existingSchedules, content: updatedContent },
          })
        );
      }

      // 로컬 상태 업데이트 (schedules를 다시 fetch)
      const queryOptions = {
        conditions: [{ field: "email", operator: "==", value: email }],
      };
      await dispatch(
        fetchSchedules({ collectionName: "schedules", queryOptions })
      );

      setModalOpen(false);
      setRefresh((prev) => !prev); // 상태 업데이트 후 재렌더링 강제
    }
  };

  // 날짜에 대한 점 표시
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
  // 필터링된 스케줄 : 선택된 날짜에 해당하는 일정만 필터링하여 보여줌
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
      <button className="squareGlobalDeleteBtn" onClick={toggleCalendar}>
        {isCalendarOpen ? "캘린더 접기" : "캘린더 펼치기"}
      </button>
      {isCalendarOpen && (
        <>
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
          />
          <div className="today-button" onClick={handleTodayClick}>
            오늘 날짜
          </div>
          <div className="schedule-info">
            {selectedDate && (
              <div className="selected-date-info">
                날짜:{" "}
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
        </>
      )}
      <button
        className="squareGlobalDeleteBtn"
        onClick={() => setIsScheduleListOpen((prev) => !prev)}
      >
        {isScheduleListOpen ? "일정 숨기기" : "일정 보기"}
      </button>
      {isScheduleListOpen && (
        <ScheduleList
          schedules={filteredSchedules}
          onEdit={handleEditSchedule}
          editingSchedule={editingSchedule}
          onDelete={handleDeleteSchedule}
        />
      )}
      <ScheduleModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSave={handleSaveSchedule}
        schedules={editingSchedule}
        onUpdate={handleUpdateSchedule}
        contentIndex={editingSchedule?.contentIndex}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default MyCalendar;
