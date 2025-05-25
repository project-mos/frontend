import { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";
import {
  GetStudyQuestionsResponse,
  PostStudyJoin,
} from "@/shared/types/api/studies";

import LabelRadioInput from "@/shared/components/molecules/LabelRadioInput";
import { postJoin } from "@/features/studies/services/studies.service";

interface ApplyFormCardInterface {
  studyId: string;
  data: GetStudyQuestionsResponse;
  setIsApplyVisible: Dispatch<SetStateAction<boolean>>;
}

const ApplyFormCard = ({
  studyId,
  data,
  setIsApplyVisible,
}: ApplyFormCardInterface) => {
  const methods = useForm({
    mode: "onChange",
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: Record<string, string>) => {
    const transformedPostAPI: PostStudyJoin = Object.entries(data).map(
      ([key, value]) => ({
        studyQuestionId: Number(key),
        answer: value,
      })
    );
    try {
      const response = await postJoin(studyId, transformedPostAPI);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data, formState.isValid);

  return (
    <Card className="h-auto w-[85%] ">
      <Card.Header className="mb-[15px]">
        <Typography.SubTitle1>지원양식</Typography.SubTitle1>
      </Card.Header>

      <Card.Content>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {data.length > 0 ? (
              data.map((item, index) => {
                if (item.type === "주관식") {
                  return TextareaField(
                    item.question,
                    String(item.id),
                    item.required
                  );
                } else {
                  const options = item.options.map((options) => {
                    return { label: options, value: options };
                  });
                  return (
                    <LabelRadioInput
                      key={`${item}_${index}`}
                      name={String(item.id)}
                      label={item.question}
                      options={options}
                      required={item.required}
                      registerOptions={getRegisterOptions(item.required)}
                    />
                  );
                }
              })
            ) : (
              <div className="flex justify-center p-10">
                <Typography.SubTitle1 className="text-center text-mos-gray-500">
                  이 모집은 별도의 지원 양식을 사용하지 않습니다.
                  <br /> 자유롭게 지원해주세요!
                </Typography.SubTitle1>
              </div>
            )}

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
const getRegisterOptions = (required: boolean) => {
  return {
    required: required ? "필수 입력 항목입니다." : false,
  };
};
const TextareaField = (label: string, name: string, required: boolean) => {
  return (
    <div className="mb-[10px]" key={`${label}_${name}`}>
      <LabelTextAreaInput
        label={label}
        name={name}
        placeholder="내용을 입력해 주세요."
        required={required}
        registerOptions={getRegisterOptions(required)}
      />
    </div>
  );
};

export default ApplyFormCard;
