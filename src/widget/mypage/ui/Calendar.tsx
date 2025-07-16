"use client";
import { useState } from "react";

import StudyFormModal from "@/widget/mypage/ui/StudyFormModal";
import Button from "@/shared/components/atoms/Button";
import Grid from "@/shared/components/atoms/Grid";
import Typography from "@/shared/components/atoms/Typography";
import useModal from "@/shared/hooks/useModal";
import { useGetSchedules } from "@/entities/study/schedule/model/schedule.query";
import { GetSchedulesResponse } from "@/entities/study/schedule/api/schedule.api.types";
import { useCalendarNavigation } from "@/features/study/schedule/calendar-navigation/model/useCalendarNavigation";
import { useCalendarCells } from "@/features/study/schedule/calendar-cells/model/useCalendarCells";

function Calendar() {
  const [currentDateState, setCurrentDateState] = useState(new Date());
  const { isModalOpenState, openModal, closeModal } = useModal();
  const [dailySchedules, setDailySchedules] = useState<GetSchedulesResponse[]>(
    []
  );

  const { data: schedulesData } = useGetSchedules();

  // 캘린더 내비게이션 훅
  const { handlePrevMonth, handleNextMonth } = useCalendarNavigation(
    currentDateState,
    setCurrentDateState
  );

  // 캘린더 셀 렌더링 훅
  const { renderCalendarCells } = useCalendarCells({
    currentDate: currentDateState,
    onClickSchedule: (date: string) => {
      const dailySchedule =
        schedulesData?.filter(
          (item) => item.startDateTime.split("T")[0] === date
        ) || [];
      setDailySchedules(dailySchedule);
      openModal();
    },
    schedulesData: schedulesData!,
  });

  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-4xl rounded-md border border-gray-300 p-4 shadow-md tablet:h-[600px]">
        <div className="mb-4 flex items-center justify-between">
          <Button.Solid color="Main" active onClick={handlePrevMonth}>
            &lt;
          </Button.Solid>
          <Typography.SubTitle1>
            {currentDateState.getFullYear()}년 {currentDateState.getMonth() + 1}
            월
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
      {/* 일정 수정 모달 */}
      <StudyFormModal
        isOpen={isModalOpenState}
        onClose={() => closeModal()}
        schedulesData={dailySchedules!}
        isModifyMode={true}
      />
    </>
  );
}

export default Calendar;
