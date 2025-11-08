"use client";
import { useState } from "react";

import StudyFormModal from "@/widget/mypage/ui/StudyFormModal";
import Button from "@/shared/components/atoms/Button";
import Grid from "@/shared/components/atoms/Grid";
import Typography from "@/shared/components/atoms/Typography";
import useModal from "@/shared/hooks/useModal";
import { useGetSchedules } from "@/entities/study/schedule/model/schedule.query";
import { useCalendarNavigation } from "@/features/calendar/calendar-navigation/model/useCalendarNavigation";
import { useCalendarCells } from "@/features/calendar/calendar-cells/model/useCalendarCells";
import { useGetUserSchedules } from "@/entities/study/schedule/model/userSchedule.query";
import UserScheduleFormModal from "./UserScheduleFormModal";
import { GetSchedulesResponse } from "@/entities/study/schedule/api/userSchedule.api.types";
import Modal from "@/shared/components/atoms/Modal";

// 개인/스터디 일정 타입 선택 모달 컴포넌트
function ScheduleTypeSelectModal({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: "study" | "user") => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[400px]">
      <Modal.Header onClose={onClose}>
        <Typography.P1 className="text-xl">
          등록할 일정 종류를 선택하세요
        </Typography.P1>
      </Modal.Header>
      <Modal.Content>
        <div className="flex w-full justify-center gap-2">
          <Button.Ghost
            color="Green"
            active
            onClick={() => {
              onSelect("study");
              onClose();
            }}
          >
            스터디 일정
          </Button.Ghost>
          <Button.Ghost
            color="Green"
            active
            onClick={() => {
              onSelect("user");
              onClose();
            }}
          >
            개인 일정
          </Button.Ghost>
        </div>
      </Modal.Content>
    </Modal>
  );
}

function Calendar() {
  const [currentDateState, setCurrentDateState] = useState(new Date());

  // 스터디 일정 수정 모달
  const { isModalOpenState, openModal, closeModal } = useModal();

  // 스터디 일정 생성 모달
  const {
    isModalOpenState: createModalOpenState,
    openModal: createOpenModal,
    closeModal: createCloseModal,
  } = useModal();

  // 개인 일정 수정 모달
  const {
    isModalOpenState: userScheduleModalOpenState,
    openModal: userScheduleOpenModal,
    closeModal: userScheduleCloseModal,
  } = useModal();

  // 개인 일정 생성 모달
  const {
    isModalOpenState: userScheduleCreateOpenState,
    openModal: userScheduleCreateOpenModal,
    closeModal: userScheduleCreateCloseModal,
  } = useModal();

  // 일정 종류 선택 모달
  const {
    isModalOpenState: selectModalOpenState,
    openModal: selectOpenModal,
    closeModal: selectCloseModal,
  } = useModal();

  const [dailySchedules, setDailySchedules] = useState<GetSchedulesResponse[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 전체 스터디 일정 조회
  const { data: schedulesData } = useGetSchedules();
  // 개인 일정 조회
  const { data: userSchedulesData } = useGetUserSchedules();

  // 캘린더 내비게이션 훅
  const { handlePrevMonth, handleNextMonth } = useCalendarNavigation(
    currentDateState,
    setCurrentDateState
  );

  // 스터디 + 개인 일정 합치기
  const combinedSchedulesData = [
    ...(schedulesData || []),
    ...(userSchedulesData || []),
  ];

  // 캘린더 셀 렌더링 훅
  const { renderCalendarCells } = useCalendarCells({
    currentDate: currentDateState,
    onClickSchedule: (date: string) => {
      const dailySchedule =
        combinedSchedulesData?.filter(
          (item) => item.startDateTime.split("T")[0] === date
        ) || [];

      setDailySchedules(dailySchedule);
      setSelectedDate(date);

      const hasStudy = dailySchedule.some(
        (item) => item.studyScheduleId !== undefined
      );
      const hasUser = dailySchedule.some((item) => item.id !== undefined);

      if (hasStudy && hasUser) {
        // 둘 다 있으면 일정 종류 선택 모달 표시
        selectOpenModal();
      } else if (hasStudy) {
        // 스터디 일정만 있으면 스터디 수정 모달
        openModal();
      } else if (hasUser) {
        // 개인 일정만 있으면 개인 일정 수정 모달
        userScheduleOpenModal();
      }
    },

    // 더블클릭 → 일정 종류 선택 모달 먼저 열기
    onDoubleClickSchedule: (date: string) => {
      setSelectedDate(date);
      selectOpenModal();
    },
    schedulesData: combinedSchedulesData!,
  });

  // 일정 종류 선택 시 처리
  const handleSelectType = (type: "study" | "user") => {
    if (!selectedDate) return;

    const now = new Date();
    const defaultSchedule: GetSchedulesResponse = {
      id: 0,
      studyId: 0,
      title: "",
      studyScheduleId: 0,
      description: "",
      studyCurriculumResList: [],
      startDateTime: `${selectedDate}T${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
      endDateTime: `${selectedDate}T${(now.getHours() + 1)
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
    };

    setDailySchedules([defaultSchedule]);

    if (type === "study") {
      createOpenModal(); // 스터디 일정 생성
    } else {
      userScheduleCreateOpenModal(); // 개인 일정 생성
    }
  };

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

      {/* 등록 일정 종류 선택 모달 */}
      <ScheduleTypeSelectModal
        isOpen={selectModalOpenState}
        onClose={selectCloseModal}
        onSelect={handleSelectType}
      />

      {/* 스터디 일정 수정 모달 */}
      <StudyFormModal
        isOpen={isModalOpenState}
        onClose={closeModal}
        schedulesData={dailySchedules!}
        isModifyMode={true}
      />

      {/* 스터디 일정 생성 모달 */}
      <StudyFormModal
        isOpen={createModalOpenState}
        schedulesData={dailySchedules!}
        onClose={createCloseModal}
      />

      {/* 개인 일정 수정 모달 */}
      <UserScheduleFormModal
        isOpen={userScheduleModalOpenState}
        schedulesData={dailySchedules!}
        onClose={userScheduleCloseModal}
        isModifyMode={true}
      />

      {/* 개인 일정 생성 모달 */}
      <UserScheduleFormModal
        isOpen={userScheduleCreateOpenState}
        schedulesData={dailySchedules!}
        onClose={userScheduleCreateCloseModal}
      />
    </>
  );
}

export default Calendar;
