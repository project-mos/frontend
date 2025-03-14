"use client";
import React, { useState } from "react";
import Button from "../atoms/Button";
import Typography from "../atoms/Typography";
import Grid from "../atoms/Grid";
import { cn } from "@/lib/utils";

interface CalendarProps {
  [key: string]: {
    id: number;
    title: string;
    color: string;
  }[];
}

const cellStyle =
  "h-16 w-full min-w-14 mobile:min-w-20 border border-gray-200 p-2 mobile:h-20 tablet:min-w-[50px] ";

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
      cells.push(<div key={`empty-${i}`} className={cellStyle} />);
    }

    // 날짜 셀 렌더링
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDate(year, month, day);
      const dayDate = new Date(year, month, day);
      const isToday = dayDate.toDateString() === today.toDateString();
      const dayEvents = events[dateKey] || [];

      cells.push(
        <div key={day} className={cn(cellStyle)}>
          {/* 날짜 영역: 오늘이면 동그라미로 감싸기 */}
          <div className="flex items-center">
            {isToday ? (
              <div className="flex size-5 items-center justify-center rounded-full bg-mos-main-500">
                <Typography.P3 className="text-[12px] font-medium text-white">
                  {day}
                </Typography.P3>
              </div>
            ) : (
              <Typography.P3 className="text-[12px] font-medium">
                {day}
              </Typography.P3>
            )}
          </div>
          {/* 이벤트 영역: 날짜 숫자 바로 아래에 표시 */}
          {dayEvents.length > 0 && (
            <div className="mt-1 flex cursor-pointer flex-col space-y-1">
              <div
                className={`hidden h-5 w-full mobile:flex ${dayEvents[0].color} flex items-center rounded p-1`}
              >
                <Typography.P3 className="truncate text-[11px] text-white">
                  {dayEvents[0].title}
                </Typography.P3>
              </div>
              {dayEvents.length > 1 && (
                <div className="flex items-center justify-end text-right text-[11px] font-semibold ">
                  <Typography.P3 className="rounded-full bg-mos-green-500 px-[3px] py-[2px] text-mos-white-gray-100">
                    +{dayEvents.length - 1}
                  </Typography.P3>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // 마지막 행 빈 칸 채우기
    const totalCells = firstDay + daysInMonth;
    const extraCells = totalCells % 7;
    if (extraCells !== 0) {
      const remaining = 7 - extraCells;
      for (let i = 0; i < remaining; i++) {
        cells.push(<div key={`empty-end-${i}`} className={cellStyle} />);
      }
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
    <div className="mx-auto mt-8 w-full max-w-4xl rounded-md border border-gray-300 p-4 shadow-md tablet:h-[600px]">
      <div className="mb-4 flex items-center justify-between">
        <Button.Solid color="Main" active onClick={handlePrevMonth}>
          &lt;
        </Button.Solid>
        <Typography.SubTitle1>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </Typography.SubTitle1>
        <Button.Solid color="Main" active onClick={handleNextMonth}>
          &gt;
        </Button.Solid>
      </div>
      <Grid cols={7} className="gap-px text-center">
        {/* 요일 헤더 */}
        <Typography.P3 className="font-bold text-red-600">일</Typography.P3>
        <Typography.P3 className="text-center font-bold">월</Typography.P3>
        <Typography.P3 className="text-center font-bold">화</Typography.P3>
        <Typography.P3 className="text-center font-bold">수</Typography.P3>
        <Typography.P3 className="text-center font-bold">목</Typography.P3>
        <Typography.P3 className="text-center font-bold">금</Typography.P3>
        <Typography.P3 className="text-center font-bold">토</Typography.P3>
        {/* 날짜 셀 */}
        {renderCalendarCells()}
      </Grid>
    </div>
  );
}

export default Calendar;
