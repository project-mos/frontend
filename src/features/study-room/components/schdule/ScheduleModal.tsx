"use client";

import Button from "@/components/atoms/Button";

import Typography from "@/components/atoms/Typography";

import LabelDateInput from "@/components/molecules/LabelInputDate";
import LabelInput from "@/components/molecules/LabelInput";

import LabelTimeInput from "@/components/molecules/LabelInputTime";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import LabelTextAreaInput from "@/components/molecules/LabelTextAreaInput";
import Modal, { ModalOnClose, ModalProps } from "@/components/atoms/Modal";

// success, close 시 실행할 함수들을 부모로부터 받음
interface ScheduleModalProps extends ModalProps {
  onSuccess: () => void;
  onClose: ModalOnClose;
}
interface CreateStudySchedule {
  date: string;
  start_time: string;
  end_time: string;
  title: string;
  description: string;
}
const ScheduleModal = ({
  onSuccess,
  onClose,
  ...props
}: ScheduleModalProps) => {
  const methods = useForm<CreateStudySchedule>({
    defaultValues: {
      date: "",
      start_time: "",
      end_time: "",
      title: "",
      description: "",
    },
  });
  const onSubmit = (data: CreateStudySchedule) => {
    console.log("data", data);
    onSuccess();
  };

  const onCloses = () => {
    methods.clearErrors();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onCloses}>
        <Modal.Header onClose={onClose}>
          <Typography.Head3>스터디 일정 등록</Typography.Head3>
        </Modal.Header>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <Modal.Content className="flex max-h-[300px] flex-col gap-5 overflow-y-scroll mobile:max-h-[505px]">
            <div className="flex flex-col gap-2">
              <Typography.SubTitle1>스터디 시간</Typography.SubTitle1>
              <LabelDateInput<CreateStudySchedule>
                label="일자"
                name="date"
                required
                registerOptions={{ required: "그만하쇼", valueAsDate: true }}
              />

              <div className="flex flex-col gap-2 mobile:flex-row">
                <LabelTimeInput<CreateStudySchedule>
                  name="start_time"
                  label="시작 시간"
                  registerOptions={{ required: "그만하쇼" }}
                  required
                />
                <LabelTimeInput<CreateStudySchedule>
                  name="end_time"
                  label="종료 시간"
                  registerOptions={{ required: "그만하쇼" }}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Typography.SubTitle1>스터디 내용</Typography.SubTitle1>
                {/* <Button.Solid type="button" color="Blue" size="sm" active>
                  내용 추가
                </Button.Solid> */}
              </div>

              <LabelInput<CreateStudySchedule>
                label="제목"
                name="title"
                placeholder="제목을 입력하세요"
                registerOptions={{ required: "그만하쇼" }}
                required
              />
              <LabelTextAreaInput
                label="내용"
                name="description"
                className="w-full"
                placeholder="내용을 입력하세요"
                registerOptions={{ required: "그만하쇼" }}
              />
            </div>
          </Modal.Content>

          <Modal.Footer>
            <Button.Ghost color="Gray" onClick={onClose}>
              취소
            </Button.Ghost>
            <Button.Solid
              type="submit"
              color="Main"
              active={methods.formState.isValid}
              disabled={!methods.formState.isValid}
            >
              확인
            </Button.Solid>
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default ScheduleModal;
