"use client";

import Card from "@/shared/components/atoms/Card";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import Meta from "@/shared/components/molecules/Meta";

import useScheduleWidget from "@/widget/study-room/schedule/model/useScheduleWidget";
import ScheduleCard from "@/features/study/schedule/ui/ScheduleCard";
import ScheduleList from "@/features/study/schedule/ui/ScheduleList";
import ScheduleModal from "@/entities/study/schedule/ui/ScheduleModal";

const ScheduleWidget = () => {
  const {
    modal,
    isAdmin,
    formatScheduleDate,
    selectStudyData,
    scheduleData,
    now,
    isModalReadonly,
    studyData,
    openModal,
    closeModal,
    handleViewModal,
    setIsModalReadOnly,
    handleDelete,
    setSelectStudyData,
  } = useScheduleWidget();

  return (
    <>
      <ScheduleModal
        selectData={selectStudyData}
        isOpen={modal.get("schedule")!}
        readOnly={isModalReadonly}
        onClose={() => {
          setSelectStudyData(undefined);
          closeModal("schedule");
        }}
        onSuccess={() => {
          console.log("success!!");
        }}
      />

      <div className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
        <Card className="mb-3">
          <Meta icon="calendar">
            {formatScheduleDate && (
              <>
                {formatScheduleDate.startDate} ~ {formatScheduleDate.endDate}{" "}
                &middot;{" "}
              </>
            )}
            {studyData?.schedule}
          </Meta>
        </Card>
        <ScheduleCard
          title="예정된 스터디 일정"
          onAdd={() => {
            setIsModalReadOnly(false);
            openModal("schedule");
          }}
          isAdmin={isAdmin}
        >
          {now && (
            <ScheduleList
              scheduleData={scheduleData}
              type="upcoming"
              isAdmin={isAdmin}
              date={now}
              handleEdit={(id: number) => handleViewModal(id, "edit")}
              handleDelete={handleDelete}
              onClick={(id: number) => handleViewModal(id, "view")}
            />
          )}
        </ScheduleCard>
        <ScheduleCard title="마감된 스터디 일정" isAdmin={isAdmin}>
          {now && (
            <ScheduleList
              date={now}
              scheduleData={scheduleData}
              type="past"
              onClick={(id: number) => handleViewModal(id, "view")}
            />
          )}
        </ScheduleCard>
      </div>
      {/* 공지사항 삭제 확인 모달 */}
      <ActionConfirmModal
        type="danger"
        title="삭제 확인"
        content="정말 삭제하시겠습니까?"
        buttonLabel="삭제"
        isOpen={modal.get("schedule_delete_confirm")!}
        onClose={() => closeModal("schedule_delete_confirm")}
      />
    </>
  );
};

export default ScheduleWidget;
