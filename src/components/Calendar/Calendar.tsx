'use client';

import { useState, useEffect } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getWeekDates = (startDate: Date) => {
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay()); // Set to the start of the week (Sunday)
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date;
  });
  return dates;
};

const HeaderFilter = ({
  selectedBoard,
  handleBoardChange,
  selectedMonth,
  handleMonthChange,
  handlePrevWeek,
  handleNextWeek,
  handleTodayClick,
}) => (
  <div className="bg-sombar text-white p-4">
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-3xl font-bold text-black">Calendar</h1>
      <button className="flex items-center p-2 bg-gray-200 text-black rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm2 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zM5 6a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Board Select
      </button>
    </div>
    <div className="flex items-center">
      <input
        type="month"
        value={selectedMonth.toISOString().slice(0, 7)}
        onChange={handleMonthChange}
        className="p-2 bg-white text-black rounded-md"
      />
      <div className="flex items-center space-x-2 ml-4">
        <button onClick={handlePrevWeek} className="p-2 bg-gray-200 text-black rounded-md">
          &lt;
        </button>
        <button onClick={handleTodayClick} className="p-2 bg-gray-200 text-black rounded-md">
          Today
        </button>
        <button onClick={handleNextWeek} className="p-2 bg-gray-200 text-black rounded-md">
          &gt;
        </button>
      </div>
    </div>
  </div>
);

const TaskDateTable = ({ dates }) => (
  <div className="grid grid-cols-7 gap-0 h-screen">
    {dates.map((date, index) => (
      <div key={date.toDateString()} className="flex flex-col bg-somon border border-som">
        <div className="text-center font-bold">{daysOfWeek[index]}</div>
        <div className="text-center">{date.getDate()}</div>
        <div className="flex-grow mt-2"></div>
      </div>
    ))}
  </div>
);

export default function Calendar() {
  const [selectedBoard, setSelectedBoard] = useState('Board 1');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [dates, setDates] = useState(getWeekDates(new Date()));

  useEffect(() => {
    setDates(getWeekDates(startDate));
    setSelectedMonth(startDate);
  }, [startDate]);

  const handleBoardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoard(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setStartDate(new Date(newDate.setDate(1))); // Set start date to the first of the selected month
  };

  const handlePrevWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setStartDate(today);
  };

  return (
    <div className="h-full bg-somon ml-64">
      <HeaderFilter
        selectedBoard={selectedBoard}
        handleBoardChange={handleBoardChange}
        selectedMonth={selectedMonth}
        handleMonthChange={handleMonthChange}
        handlePrevWeek={handlePrevWeek}
        handleNextWeek={handleNextWeek}
        handleTodayClick={handleTodayClick}
      />
      <TaskDateTable dates={dates} />
    </div>
  );
}
