"use client";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import LabelInput from "@/shared/components/molecules/LabelInput";
import LabelDateInput from "@/shared/components/molecules/LabelInputDate";
import LabelTimeInput from "@/shared/components/molecules/LabelInputTime";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";
import { StudyScheduleInterface } from "@/shared/types/api/studies/detail";
import { useState } from "react";
import Checkbox from "@/shared/components/atoms/Checkbox";
import Card from "@/shared/components/atoms/Card";

// success, close 시 실행할 함수들을 부모로부터 받음
interface ScheduleModalProps extends ModalProps {
  selectData?: StudyScheduleInterface;
  onSuccess: () => void;
  onClose: ModalOnClose;
}
interface StudyScheduleForm {
  date: string;
  curriculumIds?: number[];
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime?: string;
}
const ScheduleModal = ({
  onSuccess,
  onClose,
  selectData,
  ...props
}: ScheduleModalProps) => {
  const methods = useForm<StudyScheduleForm>({
    defaultValues: {
      date: "",
      startDateTime: "",
      endDateTime: "",
      title: "",
      description: "",
      curriculumIds: [],
    },
  });
  const [isUsingCurriculum, setIsUsingCurriculum] = useState(false);
  const isSelect = !!selectData;
  const onSubmit = (data: StudyScheduleForm) => {
    console.log("data", data);
    onSuccess();
  };

  const onCloses = () => {
    methods.clearErrors();
    onClose();
  };

  const checkboxChangeHandler = () => {
    setIsUsingCurriculum(!isUsingCurriculum);
  };

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onCloses}>
        <Modal.Header onClose={onClose}>
          <Typography.Head3>
            스터디 일정 {isSelect ? "수정" : "등록"}
          </Typography.Head3>
        </Modal.Header>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <Modal.Content className="flex max-h-[300px] flex-col gap-5 overflow-y-scroll mobile:max-h-[505px]">
            <div className="flex flex-col gap-2">
              <Typography.SubTitle1>스터디 시간</Typography.SubTitle1>
              <LabelDateInput<StudyScheduleForm>
                label="일자"
                name="date"
                required
                registerOptions={{ required: "그만하쇼", valueAsDate: true }}
              />

              <div className="flex flex-col gap-2 mobile:flex-row">
                <LabelTimeInput<StudyScheduleForm>
                  name="startDateTime"
                  label="시작 시간"
                  registerOptions={{ required: "그만하쇼" }}
                  required
                />
                <LabelTimeInput<StudyScheduleForm>
                  name="endDateTime"
                  label="종료 시간"
                  registerOptions={{
                    required: "그만하쇼",
                    value: selectData?.endDateTime,
                  }}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 ">
                <Typography.SubTitle1>스터디 내용</Typography.SubTitle1>
                <div className="flex items-center gap-2">
                  <Checkbox
                    onChange={checkboxChangeHandler}
                    defaultChecked={isUsingCurriculum}
                  />
                  <Typography.P3 className="text-[12px]">
                    커리큘럼에서 가져오기
                  </Typography.P3>
                </div>
              </div>

              {isUsingCurriculum ? (
                <div className="flex gap-2 overflow-x-scroll">
                  {selectData?.studyCurriculumResList.map((item, index) => {
                    return (
                      <CurriCulumCard
                        key={`${item.title}_${index}`}
                        title={item.title}
                        content={item.content}
                        // description={item.content}
                      />
                    );
                  })}
                </div>
              ) : (
                <>
                  <LabelInput<StudyScheduleForm>
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
                  />
                </>
              )}
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
export const CurriCulumCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <Card className="mb-2 min-w-[180px] max-w-[180px] p-3 shadow-none">
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
