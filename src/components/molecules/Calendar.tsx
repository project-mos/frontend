"use client";
import React, { useState } from "react";

interface CalendarProps {
  [key: string]: {
    id: number;
    title: string;
    color: string;
  }[];
}
function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  // 예시 일정 데이터 (키: "YYYY-MM-DD" Parameters)
  const events: CalendarProps = {
    "2025-03-15": [
      { id: 1, title: "팀 미팅", color: "bg-green-500" },
      { id: 2, title: "의사 예약", color: "bg-red-500" },
      { id: 3, title: "프로젝트 마감", color: "bg-purple-500" },
    ],
    "2025-03-10": [{ id: 4, title: "모식이 점심 약속", color: "bg-blue-500" }],
  };

  // 날짜를 'YYYY-MM-DD' 형식으로 포맷
  const formatDate = (year: number, month: number, day: number) => {
    const m = (month + 1).toString().padStart(2, "0");
    const d = day.toString().padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  // 해당 월의 마지막 날 구하기
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 해당 월의 1일이 시작하는 요일 구하기
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // 캘린더 셀 렌더링 (오늘 날짜는 색이 있는 동그라미로 감싸고, 이벤트는 날짜 숫자 바로 아래에 표시)
  const renderCalendarCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const cells = [];

    // 이전 달 빈 칸 렌더링
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className="h-20 border border-gray-200 p-2" />
      );
    }

    // 날짜 셀 렌더링
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDate(year, month, day);
      const dayDate = new Date(year, month, day);
      const isToday = dayDate.toDateString() === today.toDateString();
      const dayEvents = events[dateKey] || [];

      cells.push(
        <div
          key={day}
          className="flex h-20 flex-col border border-gray-200 p-2"
        >
          {/* 날짜 영역: 오늘이면 동그라미로 감싸기 */}
          <div className="flex items-center">
            {isToday ? (
              <div className="flex size-5 items-center justify-center rounded-full bg-mos-main-500">
                <span className="text-[12px] font-medium text-white">
                  {day}
                </span>
              </div>
            ) : (
              <span className="text-[12px] font-medium">{day}</span>
            )}
          </div>
          {/* 이벤트 영역: 날짜 숫자 바로 아래에 표시 */}
          {dayEvents.length > 0 && (
            <div className="mt-1 flex cursor-pointer flex-col space-y-1">
              <div
                className={`h-5 w-full ${dayEvents[0].color} flex items-center rounded p-1`}
                title={dayEvents[0].title}
              >
                <span className="truncate text-[11px] text-white">
                  {dayEvents[0].title}
                </span>
              </div>
              {dayEvents.length > 1 && (
                <div className="text-right text-[11px] text-gray-600">
                  +{dayEvents.length - 1}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return cells;
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const prevMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prevMonthDate);
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(nextMonthDate);
  };

  return (
    <div className="mx-auto mt-3 w-full max-w-4xl rounded-md border border-gray-300 p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="rounded bg-mos-main-500 px-3 py-1 text-white hover:bg-mos-main-700"
        >
          &lt;
        </button>
        <div className="text-xl font-semibold">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </div>
        <button
          onClick={handleNextMonth}
          className="rounded bg-mos-main-500 px-3 py-1 text-white hover:bg-mos-main-700"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px">
        {/* 요일 헤더 */}
        <div className="text-center font-bold text-red-500">일</div>
        <div className="text-center font-bold">월</div>
        <div className="text-center font-bold">화</div>
        <div className="text-center font-bold">수</div>
        <div className="text-center font-bold">목</div>
        <div className="text-center font-bold">금</div>
        <div className="text-center font-bold">토</div>
        {/* 날짜 셀 */}
        {renderCalendarCells()}
      </div>
    </div>
  );
}

export default Calendar;
