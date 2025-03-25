import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import LabelTextAreaInput from "@/components/molecules/LabelTextAreaInput";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface ApplyFormCardInterface {
  setIsApplyVisible: Dispatch<SetStateAction<boolean>>;
}

interface formDataInterface {
  experience: string;
  goal: string;
  motivation: string;
}

const ApplyFormCard = ({ setIsApplyVisible }: ApplyFormCardInterface) => {
  const methods = useForm<formDataInterface>({
    defaultValues: { motivation: "", experience: "", goal: "" },
    mode: "onChange",
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = (data: formDataInterface) => {
    console.log("form data", data);
  };

  return (
    <Card className="h-auto w-full">
      <Card.Header className="mb-[15px]">
        <Typography.SubTitle1>지원양식</Typography.SubTitle1>
      </Card.Header>

      <Card.Content>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {TextareaField("스터디를 지원하게 된 동기", "motivation")}
            {TextareaField("관련 경험 및 보유 기술", "experience")}
            {TextareaField("스터디를 통해 이루고 싶은 목표", "goal")}

            <div className="flex justify-center gap-[10px]">
              <Button.Ghost
                color="Gray"
                className="w-[90px]"
                onClick={() => setIsApplyVisible(false)}
              >
                취소
              </Button.Ghost>
              <Button.Solid
                color="Main"
                active={formState.isValid}
                disabled={!formState.isValid}
              >
                제출하기
              </Button.Solid>
            </div>
          </form>
        </FormProvider>
      </Card.Content>

      <Card.Footer>
        <div className="flex w-full gap-2"></div>
      </Card.Footer>
    </Card>
  );
};

const TextareaField = (label: string, name: string) => {
  return (
    <div className="mb-[10px]">
      <LabelTextAreaInput
        label={label}
        name={name}
        placeholder="내용을 입력해 주세요."
        required
        registerOptions={{ required: "필수 입력입니다." }}
      />
    </div>
  );
};

export default ApplyFormCard;
