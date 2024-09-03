// src/components/Calendar.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 스타일을 적용하기 위해 import

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (value) => {
    setSelectedDate(value);
    setInputValue(events[value.toDateString()] || "");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveEvent = () => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [selectedDate.toDateString()]: inputValue,
    }));
    setInputValue("");
    setSelectedDate(null);
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <Calendar onChange={setDate} value={date} onClickDay={handleDateClick} />
      {selectedDate && (
        <div>
          <h2>Selected Date: {selectedDate.toDateString()}</h2>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add your event here"
          />
          <button onClick={handleSaveEvent}>Save Event</button>
        </div>
      )}
      <h2>Events</h2>
      <ul>
        {Object.entries(events).map(([date, event], index) => (
          <li key={index}>
            {date}: {event}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;
