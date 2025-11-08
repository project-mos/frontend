import { GetSchedulesResponse } from "@/entities/study/schedule/api/schedule.api.types";
import Typography from "@/shared/components/atoms/Typography";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDate,
} from "@/shared/utils/calendar";
import cn from "@/shared/utils/cn";
import { useRef } from "react";

const cellStyle =
  "h-16 w-full min-w-10 mobile:min-w-20 border border-gray-200 p-2 mobile:h-20 tablet:min-w-[50px]";

interface CalendarProps {
  [key: string]: { id: number; title: string; color: string }[];
}

interface Props {
  currentDate: Date;
  onClickSchedule: (date: string) => void;
  schedulesData: GetSchedulesResponse[];
  onDoubleClickSchedule?: (date: string) => void;
}

export const useCalendarCells = ({
  currentDate,
  onClickSchedule,
  schedulesData,
  onDoubleClickSchedule,
}: Props) => {
  const studyIdColorMapRef = useRef<Record<number, string>>({});
  const usedColorsRef = useRef<Set<string>>(new Set());

  // 초기 로컬스토리지 데이터 로드
  if (
    typeof window !== "undefined" &&
    Object.keys(studyIdColorMapRef.current).length === 0
  ) {
    const saved = localStorage.getItem("studyIdColorMap");
    studyIdColorMapRef.current = saved ? JSON.parse(saved) : {};
  }

  const getRandomColor = () => {
    const colors = [
      "bg-blue-400",
      "bg-green-400",
      "bg-red-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-teal-400",
    ];

    // 사용되지 않은 컬러를 우선적으로 선택
    const unusedColors = colors.filter(
      (color) => !usedColorsRef.current.has(color)
    );

    if (unusedColors.length > 0) {
      const color =
        unusedColors[Math.floor(Math.random() * unusedColors.length)];
      usedColorsRef.current.add(color);

      // 모든 컬러가 사용되었으면 초기화
      if (usedColorsRef.current.size === colors.length) {
        usedColorsRef.current.clear();
      }

      return color;
    }
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // schedulesData가 존재할 때 바로 처리
  const getSchedulesByDate = schedulesData
    ? schedulesData.reduce((acc: CalendarProps, item) => {
        const dateKey = item.startDateTime.split("T")[0];

        if (!studyIdColorMapRef.current[item.studyId]) {
          studyIdColorMapRef.current[item.studyId] = getRandomColor();
          localStorage.setItem(
            "studyIdColorMap",
            JSON.stringify(studyIdColorMapRef.current)
          );
        }

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push({
          id: item.studyId,
          title: item.title,
          color: studyIdColorMapRef.current[item.studyId],
        });

        return acc;
      }, {})
    : {};

  // 예시 일정 데이터 (키: "YYYY-MM-DD" Parameters)
  const events: CalendarProps = getSchedulesByDate!;

  const today = new Date();

  const renderCalendarCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells = [];

    // 이전 달 빈 셀
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className={cellStyle} />);
    }

    // 날짜 셀
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDate(year, month, day);
      const dayDate = new Date(year, month, day);
      const isToday = dayDate.toDateString() === today.toDateString();
      const dayEvents = events[dateKey] || [];

      cells.push(
        <div
          key={day}
          className={cn(cellStyle)}
          onDoubleClick={() => onDoubleClickSchedule?.(dateKey)}
        >
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
          {dayEvents.length > 0 && (
            <div className="mt-1 flex cursor-pointer flex-col space-y-1">
              <div
                className={`hidden h-5 w-full mobile:flex ${dayEvents[0].color} flex items-center rounded p-1`}
                onClick={() => onClickSchedule(dateKey)}
                onDoubleClick={() => onDoubleClickSchedule?.(dateKey)}
              >
                <Typography.P3 className="truncate text-[11px] text-white">
                  {dayEvents[0].title}
                </Typography.P3>
              </div>
              {dayEvents.length > 1 && (
                <div
                  className="flex items-center justify-end text-right text-[11px] font-semibold"
                  onClick={() => onClickSchedule(dateKey)}
                  onDoubleClick={() => onDoubleClickSchedule?.(dateKey)}
                >
                  <Typography.P3 className="rounded-full bg-gray-500 px-[3px] py-[2px] text-mos-white-gray-100">
                    +{dayEvents.length - 1}
                  </Typography.P3>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // 마지막 행 빈 셀
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

  return { renderCalendarCells };
};
