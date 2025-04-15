"use client";

import Curriculum from "./Curriculum";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { MockCurriculumCardApiResult } from "@/app/mock/api/study-room";
import { useState } from "react";
import { StudyCurriculumCardInterface } from "@/types/api/study-room";
import { FormProvider, useForm } from "react-hook-form";

const CurriculumCard = () => {
  // 수정 여부 플래그
  const [isModifyState, setIsModifyState] = useState<boolean>(false);
  // react-hook-form
  const methods = useForm<{ curriculumList: StudyCurriculumCardInterface[] }>({
    defaultValues: { curriculumList: MockCurriculumCardApiResult },
    mode: "onChange",
  });
  const { handleSubmit, setValue, getValues, watch } = methods;
  const curriculumList = watch("curriculumList");

  // 커리큘럼 추가
  const addCurriculum = () => {
    const currentValues = getValues("curriculumList");
    const newItem = {
      id: crypto.randomUUID(),
      step: "",
      title: "",
      content: "",
    };
    const updated = [...currentValues, newItem];
    setValue("curriculumList", updated);
  };

  // 빈 항목이 하나라도 있으면 false
  const isValidCurriculum = curriculumList.every(
    (item) => item.step.trim() && item.title.trim() && item.content.trim()
  );

  const onSubmit = (formData: {
    curriculumList: StudyCurriculumCardInterface[];
  }) => {
    console.log("data", formData);
  };

  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header className="mb-[20px] justify-between">
            <Typography.SubTitle1>커리큘럼</Typography.SubTitle1>
            <div className="flex gap-2">
              {isModifyState && (
                <Button.Ghost
                  color="Main"
                  active
                  className="h-[30px] p-0 pl-1.5 pr-3 text-[14px]"
                  onClick={addCurriculum}
                  type="button"
                >
                  <i className="bi bi-plus text-[22px]"></i>
                  커리큘럼 추가
                </Button.Ghost>
              )}
              <Button.Solid
                color="Main"
                className="h-[30px] text-[14px]"
                onClick={() => {
                  setIsModifyState((prev) => !prev);
                }}
                type={isModifyState ? "button" : "submit"}
                active={isValidCurriculum}
              >
                {isModifyState ? "확인" : "수정"}
              </Button.Solid>
            </div>
          </Card.Header>
          <Card.Content>
            <Curriculum isModify={isModifyState} />
          </Card.Content>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CurriculumCard;
