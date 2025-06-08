"use client";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import LabelInput from "@/shared/components/molecules/LabelInput";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";

import LabelInputDate from "@/shared/components/molecules/LabelInputDate";
import LabelSelectInput from "@/shared/components/molecules/LabelSelectInput";
import { useMyJoinedStudyStore } from "@/shared/store/useMyJoinedStudyStore";
import { useTokenStore } from "@/shared/store/authStore";
import {
  usePostCreateStudySchedule,
  useUpdateStudySchedule,
} from "@/features/mypage/services/mypage.service";
import { useToast } from "@/shared/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { GetMySchedulesResult } from "@/shared/types/api/mypage";
import { useEffect, useMemo } from "react";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  isModifyMode?: boolean;
  schedulesData?: GetMySchedulesResult[];
}

interface ScheduleData {
  title: string;
  description: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  startDateTime: string;
  endDateTime: string;
  studyId?: number;
  studyScheduleId?: number;
}

const StudyFormModal = ({
  onClose,
  isModifyMode,
  schedulesData,
  ...props
}: NoticeModalProps) => {
  const { accessToken } = useTokenStore();
  const queryClient = useQueryClient();
  const methods = useForm<ScheduleData>({
    defaultValues: {
      title: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
    },
    mode: "onChange",
  });
  const { handleSubmit, reset, watch } = methods;
  const { success, error } = useToast();
  const studyId = Number(watch("studyId"));
  const studyScheduleId = Number(watch("studyScheduleId"));

  const myJoinedStudiesData = useMyJoinedStudyStore(
    (state) => state.myJoinedStudiesData
  );

  const scheduleOption = useMemo(() => {
    return myJoinedStudiesData?.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  }, [myJoinedStudiesData]);

  const studyScheduleOption = useMemo(() => {
    return schedulesData?.map((item) => ({
      label: item.title,
      value: item.studyScheduleId,
    }));
  }, [schedulesData]);

  const selectedScheduleData = useMemo(() => {
    return schedulesData?.filter(
      (item) => item.studyScheduleId === studyScheduleId
    )[0];
  }, [schedulesData, studyScheduleId]);

  useEffect(() => {
    if (selectedScheduleData) {
      methods.setValue("studyId", selectedScheduleData.studyId);
      methods.setValue("title", selectedScheduleData.title);
      methods.setValue("description", selectedScheduleData.description);
      methods.setValue(
        "startDate",
        selectedScheduleData.startDateTime.split("T")[0]
      );
      methods.setValue(
        "startTime",
        selectedScheduleData.startDateTime.split("T")[1]
      );
      methods.setValue(
        "endDate",
        selectedScheduleData.endDateTime.split("T")[0]
      );
      methods.setValue(
        "endTime",
        selectedScheduleData.endDateTime.split("T")[1]
      );
    }
  }, [selectedScheduleData, methods]);

  console.log(selectedScheduleData);

  const { mutate: createSchedule, isPending: isCreating } =
    usePostCreateStudySchedule(accessToken, studyId, {
      onSuccess: () => {
        success("일정 생성이 완료되었습니다.");
        queryClient.invalidateQueries({
          queryKey: ["mySchedules"],
        });

        reset();
        onClose();
      },
      onError: (err) => {
        error("일정 생성 실패했습니다. 다시 시도해주세요.");
        console.log(err);
      },
    });

  const { mutate: updateSchedule, isPending: isUpdating } =
    useUpdateStudySchedule(accessToken, studyId, studyScheduleId, {
      onSuccess: () => {
        success("일정 수정 완료되었습니다.");
        queryClient.invalidateQueries({
          queryKey: ["mySchedules"],
        });

        reset();
        onClose();
      },
      onError: (err) => {
        error("일정 수정 실패했습니다. 다시 시도해주세요.");
        console.log(err);
      },
    });

  const onSubmit = (data: ScheduleData) => {
    const startDateTime = `${data.startDate}T${data.startTime}`;
    const endDateTime = `${data.endDate}T${data.endTime}`;

    // formattedData 생성
    const formattedData = {
      ...data,
      startDateTime,
      endDateTime,
    };

    // 불필요한 필드 제거
    delete formattedData.startDate;
    delete formattedData.startTime;
    delete formattedData.endDate;
    delete formattedData.endTime;
    delete formattedData.studyId;

    // API 호출
    if (isModifyMode) {
      updateSchedule(formattedData);
    } else {
      createSchedule(formattedData);
    }
  };

  const onClickCloseBtn = () => {
    reset();
    onClose();
  };

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
              <LabelInputDate
                name="startDate"
                label="일정 시작일"
                required
                registerOptions={{
                  required: "일정 시작일을 선택해주세요",
                }}
              />
              <LabelInput
                label="일정 시작 시간"
                name="startTime"
                placeholder="00:00:00"
                required
                registerOptions={{
                  required: "00:00:00 형식에 맞게 입력하세요.",
                  pattern: {
                    value: /^\d{2}:\d{2}:\d{2}$/,
                    message: "00:00:00 형식에 맞게 입력하세요.",
                  },
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-3 mobile:flex-row">
              <LabelInputDate
                name="endDate"
                label="일정 마감일"
                required
                registerOptions={{
                  required: "일정 마감일을 선택해주세요",
                }}
              />
              <LabelInput
                label="일정 종료 시간"
                name="endTime"
                placeholder="00:00:00"
                required
                registerOptions={{
                  required: "00:00:00 형식에 맞게 입력하세요.",
                  pattern: {
                    value: /^\d{2}:\d{2}:\d{2}$/,
                    message: "00:00:00 형식에 맞게 입력하세요.",
                  },
                }}
              />
            </div>
          </Modal.Content>

          <Modal.Footer>
            <Button.Ghost color="Gray" onClick={onClickCloseBtn}>
              취소
            </Button.Ghost>
            <Button.Solid
              type="submit"
              color="Main"
              active={true}
              disabled={isModifyMode ? isUpdating : isCreating}
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
