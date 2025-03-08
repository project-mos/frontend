import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Textarea from "@/components/atoms/Textarea";
import Typography from "@/components/atoms/Typography";
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
  const methods = useForm<formDataInterface>();
  const { watch } = methods;

  const [motivation, experience, goal] = watch([
    "motivation",
    "experience",
    "goal",
  ]);

  // 모든 필드가 채워졌는지 여부
  const isAllFilled = motivation && experience && goal;

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
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {TextareaField("스터디를 지원하게 된 동기", "motivation")}
            {TextareaField("관련 경험 및 보유 기술", "experience")}
            {TextareaField("스터디를 통해 이루고 싶은 목표", "goal")}

            <div className="flex justify-center gap-[10px]">
              <Button.Solid
                color="Main"
                active={!!isAllFilled}
                disabled={!isAllFilled}
              >
                제출하기
              </Button.Solid>
              <Button.Ghost
                color="Gray"
                className="w-[90px]"
                onClick={() => setIsApplyVisible(false)}
              >
                취소
              </Button.Ghost>
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
      <Typography.P3 className="mb-[5px]">{label}</Typography.P3>
      <Textarea name={name} />
    </div>
  );
};

export default ApplyFormCard;
