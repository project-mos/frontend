"use client";

import Button from "@/components/atoms/Button";

import Typography from "@/components/atoms/Typography";

import LabelDateInput from "@/features/create-study/components/LabelInputDate";
import LabelInput from "@/features/create-study/components/LabelInput";

import LabelTimeInput from "@/features/create-study/components/LabelInputTime";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import LabelTextAreaInput from "@/features/create-study/components/LabelTextAreaInput";
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
      <Modal {...props} className="w-[85%] max-w-[700px]" onClose={onCloses}>
        <Modal.Header onClose={onClose}>
          <Typography.Head3>스터디 일정 등록</Typography.Head3>
        </Modal.Header>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <Modal.Content className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Typography.SubTitle1>스터디 시간</Typography.SubTitle1>
              <LabelDateInput<CreateStudySchedule>
                label="일자"
                name="date"
                required
                registerOptions={{ required: "그만하쇼", valueAsDate: true }}
              />

              <div className="flex gap-2">
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

          <Modal.Footer className="flex justify-end gap-2">
            <Button.Default onClick={onClose}>취소</Button.Default>
            <Button.Solid type="submit" color="Main" active>
              확인
            </Button.Solid>
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default ScheduleModal;
