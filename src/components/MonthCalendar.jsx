import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const weekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

dayjs.locale("ru");

export default function MonthCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const generateCalendar = () => {
    const date = startDate.clone();
    const calendar = [];
    while (date.isBefore(endDate, "day")) {
      calendar.push(date.clone());
      //date = date.add(1, "day");
    }
    return calendar;
  };

  const calendar = generateCalendar();

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Дата выбрана:", date.format("DD.MM.YYYY"));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-500">←</button>
        <h2 className="text-lg font-semibold text-gray-800">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={handleNextMonth} className="text-gray-500">→</button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendar.map((date, index) => {
          const isCurrentMonth = date.month() === currentDate.month();
          const isToday = date.isSame(dayjs(), "day");
          const isSelected = selectedDate && date.isSame(selectedDate, "day");

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`rounded-2xl p-2 text-sm transition-all 
                \${isCurrentMonth ? "text-gray-800" : "text-gray-300"} 
                \${isToday ? "bg-green-100 font-bold" : ""} 
                \${isSelected ? "bg-orange-200" : "hover:bg-gray-100"}\`}
            >
              {date.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
