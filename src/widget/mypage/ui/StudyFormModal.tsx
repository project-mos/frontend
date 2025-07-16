"use client";
import { FormProvider } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import LabelInput from "@/shared/components/molecules/LabelInput";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";

import LabelSelectInput from "@/shared/components/molecules/LabelSelectInput";
import LabelInputDateLocal from "@/shared/components/molecules/LabelDateTimeLocal";
import { StudyScheduleInterface } from "@/shared/types/api/studies/detail";
import { formatNowDate } from "@/shared/utils/date";
import { GetSchedulesResponse } from "@/entities/study/schedule/api/schedule.api.types";
import useCalendarScheduleForm from "@/features/study/schedule/calendar-schedule-form/model/useCalendarScheduleForm";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  isModifyMode?: boolean;
  schedulesData?: GetSchedulesResponse[];
}

const StudyFormModal = ({
  onClose,
  isModifyMode,
  schedulesData,
  ...props
}: NoticeModalProps) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    isCreating,
    isUpdating,
    isDeleting,
    scheduleOption,
    studyScheduleOption,
    startDateTime,
    studyScheduleId,
    onClickDeleteBtn,
    onClickCloseBtn,
    selectedScheduleData,
    isDelete,
  } = useCalendarScheduleForm({
    onClose,
    isModifyMode,
    schedulesData,
    isOpen: props.isOpen,
  });

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onClickCloseBtn}>
        <Modal.Header onClose={onClickCloseBtn}>
          <Typography.Head3>
            {isModifyMode ? "스터디 일정 수정/삭제" : "스터디 일정 생성"}
          </Typography.Head3>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content className="flex flex-col gap-7">
            {isModifyMode && (
              <LabelSelectInput
                className="text-mos-gray-400 text-[14px]"
                label="수정할 일정을 선택해 주세요."
                name="studyScheduleId"
                selectList={[
                  {
                    label: "일정을 선택해 주세요.",
                    value: "",
                  },
                  ...(studyScheduleOption || []),
                ]}
                required
                registerOptions={{
                  required: "필수 선택입니다.",
                }}
              />
            )}

            {!isModifyMode && (
              <LabelSelectInput
                className="text-mos-gray-400 text-[14px]"
                label="일정을 추가할 스터디를 선택해 주세요."
                name="studyId"
                selectList={[
                  {
                    label: "스터디를 선택해 주세요.",
                    value: "",
                  },
                  ...(scheduleOption || []),
                ]}
                required
                registerOptions={{
                  required: "필수 선택입니다.",
                }}
              />
            )}

            <LabelInput
              label="제목"
              name="title"
              placeholder="제목을 입력하세요."
              defaultValue={
                selectedScheduleData ? selectedScheduleData.title : ""
              }
              required
              registerOptions={{ required: "필수 입력입니다." }}
            />
            <LabelTextAreaInput
              label="일정 설명"
              name="description"
              placeholder="일정 설명을 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
            />
            <div className="flex w-full flex-col gap-3 mobile:flex-row">
              <div className="flex w-full flex-col gap-5">
                <LabelInputDateLocal<StudyScheduleInterface>
                  label="시작 일시"
                  name="startDateTime"
                  min={formatNowDate("YYYY-MM-DDTHH:mm")}
                  required
                  disabled={isDelete}
                  registerOptions={{ required: "시작일자를 입력해주세요." }}
                />
                <LabelInputDateLocal<StudyScheduleInterface>
                  label="종료 일시"
                  min={startDateTime}
                  name="endDateTime"
                  required
                  disabled={isDelete}
                  registerOptions={{
                    required: "종료일자를 입력해주세요.",
                  }}
                />
              </div>
            </div>
          </Modal.Content>

          <Modal.Footer>
            <Button.Ghost
              color="Gray"
              onClick={onClickCloseBtn}
              disabled={false}
            >
              취소
            </Button.Ghost>
            {isModifyMode && (
              <Button.Ghost
                color={"Red"}
                disabled={studyScheduleId ? false : true}
                active={studyScheduleId ? true : false}
                className={
                  "text-mos-gray-100 hover:border-mos-gray-100 hover:text-mos-gray-100"
                }
                onClick={onClickDeleteBtn}
              >
                삭제
              </Button.Ghost>
            )}
            <Button.Solid
              type="submit"
              color="Main"
              active={true}
              disabled={
                isModifyMode ? isUpdating : isDelete ? isDeleting : isCreating
              }
            >
              확인
            </Button.Solid>
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default StudyFormModal;
