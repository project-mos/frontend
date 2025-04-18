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
import { StudyScheduleInterface } from "@/shared/types/api/studies/detail";
import { useEffect, useState } from "react";
import Checkbox from "@/shared/components/atoms/Checkbox";
import Card from "@/shared/components/atoms/Card";
import LabelInputDateLocal from "@/shared/components/molecules/LabelDateTimeLocal";
import { formatNowDate } from "@/shared/utils/date";

// success, close 시 실행할 함수들을 부모로부터 받음
interface ScheduleModalProps extends ModalProps {
  selectData?: StudyScheduleInterface;
  onSuccess: () => void;
  onClose: ModalOnClose;
}

const ScheduleModal = ({
  onSuccess,
  onClose,
  selectData,
  ...props
}: ScheduleModalProps) => {
  const methods = useForm<StudyScheduleInterface>({
    defaultValues: {
      startDateTime: formatNowDate("YYYY-MM-DDTHH:mm"),
      endDateTime: "",
      title: "",
      description: "",
      studyCurriculumResList: [],
    },
  });
  const [isUsingCurriculum, setIsUsingCurriculum] = useState(false);
  const startDateTime = methods.watch("startDateTime");
  const endDateTime = methods.watch("endDateTime");

  const isSelect = !!selectData;
  const onSubmit = (data: StudyScheduleInterface) => {
    console.log("data", data);
    onSuccess();
  };

  const onCloses = () => {
    methods.clearErrors();
    methods.reset({
      startDateTime: formatNowDate("YYYY-MM-DDTHH:mm"),
      endDateTime: "",
      title: "",
      description: "",
      studyCurriculumResList: [],
    });
    onClose();
  };

  const checkboxChangeHandler = () => {
    setIsUsingCurriculum(!isUsingCurriculum);
  };

  useEffect(() => {
    if (selectData) {
      methods.reset({
        ...selectData,
      });
    }
  }, [selectData, methods]);

  useEffect(() => {
    if (new Date(endDateTime) < new Date(startDateTime)) {
      methods.setError("endDateTime", {
        type: "validate",
        message: "종료일자는 시작일자보다 이후여야 합니다.",
      });
    } else {
      methods.clearErrors("endDateTime");
    }
  }, [endDateTime, methods, startDateTime]);

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onCloses}>
        <Modal.Header onClose={onCloses}>
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
              <LabelInputDateLocal<StudyScheduleInterface>
                label="시작 일자"
                name="startDateTime"
                min={formatNowDate("YYYY-MM-DDTHH:mm")}
                required
                registerOptions={{ required: "시작일자를 입력해주세요." }}
              />
              <LabelInputDateLocal<StudyScheduleInterface>
                label="종료 일자"
                min={startDateTime}
                name="endDateTime"
                required
                registerOptions={{
                  required: "종료일자를 입력해주세요.",
                }}
              />
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
                <div className="flex flex-col gap-7">
                  <LabelInput<StudyScheduleInterface>
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
                </div>
              )}
            </div>
          </Modal.Content>

          <Modal.Footer>
            <Button.Ghost color="Gray" onClick={onCloses}>
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
