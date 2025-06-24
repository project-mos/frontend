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

import Card from "@/shared/components/atoms/Card";
import LabelInputDateLocal from "@/shared/components/molecules/LabelDateTimeLocal";
import { formatNowDate, formatSeoulDate, nowDate } from "@/shared/utils/date";

import { useParams } from "next/navigation";

import clsx from "clsx";
import {
  usePostStudySchedule,
  usePutStudySchedule,
} from "@/features/study-room/hooks/useScheduleQueries";
import { useEffect, useRef } from "react";
import {
  GetStudySchedule,
  PostStudySchedule,
} from "@/features/study-room/types/study-room.api";
import Label from "@/shared/components/molecules/Label";
import { useGetCurriculums } from "@/features/study-room/hooks/useCurriculumQueries";
import { GetStudyCurriculumResponse } from "@/features/studies/types/studies.api";

// success, close 시 실행할 함수들을 부모로부터 받음
interface ScheduleModalProps extends ModalProps {
  selectData?: GetStudySchedule;
  onSuccess: () => void;
  onClose: ModalOnClose;
  readOnly: boolean;
}

const ScheduleModal = ({
  onSuccess,
  onClose,
  selectData,
  readOnly,
  ...props
}: ScheduleModalProps) => {
  const methods = useForm<PostStudySchedule>({
    defaultValues: {
      startDateTime: formatNowDate("YYYY-MM-DDTHH:mm"),
      endDateTime: "",
      title: "",
      description: "",
      curriculumIds: [],
    },
  });
  // 수정되었는지 비교하기 위한 변수
  const editPastData = useRef<PostStudySchedule>(null);

  const { id } = useParams() as { id: string };
  const { data: curriculumsData } = useGetCurriculums(Number(id));
  const { mutate: postStudyScheduleMutate } = usePostStudySchedule(Number(id));
  const { mutate: putStudyScheduleMutate } = usePutStudySchedule(Number(id));

  const startDateTime = methods.watch("startDateTime");
  const endDateTime = methods.watch("endDateTime");
  const curriculumIds = methods.watch("curriculumIds");

  const isEdit = !!selectData && !readOnly;
  const isReadOnly = readOnly;

  // const isEqualPastData = editPastData.current === methods.getValues();

  const onSubmit = (data: PostStudySchedule) => {
    if (isEdit) {
      putStudyScheduleMutate({
        studyScheduleId: selectData.studyScheduleId,
        data,
      });
    } else {
      postStudyScheduleMutate(data);
    }

    onSuccess();
    onCloses();
  };

  const onCloses = () => {
    methods.clearErrors();
    methods.reset({
      startDateTime: formatNowDate("YYYY-MM-DDTHH:mm"),
      endDateTime: "",
      title: "",
      description: "",
      curriculumIds: [],
    });
    onClose();
  };

  const onCurriculumCardClick = (
    isCheck: boolean,
    item: GetStudyCurriculumResponse
  ) => {
    if (!isReadOnly) {
      let currentCurriculumIds: number[];
      // 체크 되어있을때 누르면 해제
      if (isCheck) {
        currentCurriculumIds = curriculumIds.filter(
          (id) => id !== item.sectionId
        );
        // 체크(중복 확인)
      } else {
        currentCurriculumIds = [...curriculumIds, item.sectionId];
      }
      methods.setValue("curriculumIds", currentCurriculumIds);
    }
  };

  useEffect(() => {
    if (selectData) {
      const formatForm: PostStudySchedule = {
        title: selectData.title,
        description: selectData.description,
        startDateTime: selectData.startDateTime,
        endDateTime: selectData.endDateTime,
        curriculumIds: selectData.studyCurriculumResList.map(
          (item) => item.sectionId
        ),
      };
      editPastData.current = formatForm;
      methods.reset({
        ...formatForm,
      });
    }
  }, [selectData, methods]);

  useEffect(() => {
    if (!readOnly) {
      if (nowDate() > formatSeoulDate(startDateTime)) {
        methods.setError("startDateTime", {
          type: "validate",
          message: "시작일자는 현재 시간보다 이후여야 합니다.",
        });
      } else {
        methods.clearErrors("startDateTime");
      }
      if (formatSeoulDate(endDateTime) < formatSeoulDate(startDateTime)) {
        methods.setError("endDateTime", {
          type: "validate",
          message: "종료일자는 시작일자보다 이후여야 합니다.",
        });
      } else {
        methods.clearErrors("endDateTime");
      }
    }
  }, [endDateTime, methods, startDateTime]);

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onCloses}>
        <Modal.Header onClose={onCloses}>
          <Typography.Head3>
            스터디 일정 {isReadOnly ? "상세 보기" : isEdit ? "수정" : "등록"}
          </Typography.Head3>
        </Modal.Header>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <Modal.Content className="flex max-h-[300px] flex-col gap-5 overflow-y-scroll mobile:max-h-[505px]">
            <div className="flex flex-col gap-2">
              <Typography.SubTitle1>스터디 시간</Typography.SubTitle1>
              <div className="flex flex-col gap-5">
                <LabelInputDateLocal<PostStudySchedule>
                  label="시작 일자"
                  name="startDateTime"
                  min={formatNowDate("YYYY-MM-DDTHH:mm")}
                  required
                  disabled={isReadOnly}
                  registerOptions={{ required: "시작일자를 입력해주세요." }}
                />
                <LabelInputDateLocal<PostStudySchedule>
                  label="종료 일자"
                  min={startDateTime}
                  name="endDateTime"
                  required
                  disabled={isReadOnly}
                  registerOptions={{
                    required: "종료일자를 입력해주세요.",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Typography.SubTitle1>스터디 내용</Typography.SubTitle1>
              <div className="flex flex-col gap-7">
                <LabelInput<PostStudySchedule>
                  label="제목"
                  name="title"
                  placeholder={
                    isReadOnly ? "제목이 없습니다." : "제목을 입력하세요"
                  }
                  disabled={isReadOnly}
                  registerOptions={{ required: "제목을 입력해주세요." }}
                  required
                />
                <LabelTextAreaInput
                  label="내용"
                  name="description"
                  className="w-full"
                  disabled={isReadOnly}
                  placeholder={
                    isReadOnly ? "내용이 없습니다." : "내용을 입력하세요"
                  }
                />
                {curriculumsData && (
                  <div>
                    <Label label="커리큘럼" />
                    <div className="flex gap-2 overflow-x-scroll">
                      {curriculumsData.map((item, index) => {
                        const isCheck = curriculumIds.includes(item.sectionId);
                        return (
                          <CurriCulumCard
                            key={`${item.title}_${index}`}
                            title={item.title}
                            content={item.content}
                            isCheck={isCheck}
                            onClick={() => onCurriculumCardClick(isCheck, item)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal.Content>

          <Modal.Footer>
            {isReadOnly ? (
              <Button.Solid
                color="Main"
                active={true}
                onClick={() => {
                  onSuccess();
                  onCloses();
                }}
              >
                확인
              </Button.Solid>
            ) : (
              <>
                <Button.Ghost color="Gray" onClick={onCloses}>
                  취소
                </Button.Ghost>
                <Button.Solid
                  type="submit"
                  color="Main"
                  active={methods.formState.isValid}
                  disabled={!methods.formState.isValid}
                >
                  {isEdit ? "수정" : "등록"}
                </Button.Solid>
              </>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};
export const CurriCulumCard = ({
  title,
  content,
  isCheck,
  onClick,
}: {
  title: string;
  content: string;
  isCheck: boolean;
  onClick?: () => void;
}) => {
  return (
    <Card
      className={clsx(
        "mb-2 min-w-[180px] max-w-[180px] cursor-pointer p-3 shadow-none transition-all",
        "hover:border-mos-main",
        isCheck && "border-mos-main bg-mos-main-100"
      )}
      onClick={onClick}
    >
      <Card.Header>
        <Typography.P3 className="font-bold text-mos-main">
          {title}
        </Typography.P3>
      </Card.Header>
      <Card.Footer>
        <Typography.P3 className="text-[12px] text-mos-gray-500">
          {content}
        </Typography.P3>
      </Card.Footer>
    </Card>
  );
};
export default ScheduleModal;
