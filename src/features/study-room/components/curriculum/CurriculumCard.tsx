"use client";

import Curriculum from "../../../studies/components/Curriculum";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { MockCurriculumCardApiResult } from "@/app/mock/api/study-room";
import { useState } from "react";
import { StudyCurriculumCardInterface } from "@/types/api/study-room";
import { FormProvider, useForm } from "react-hook-form";

const CurriculumCard = () => {
  // 수정 여부 플래그
  const [isModify, setIsModify] = useState<boolean>(false);
  // 커리큘럼 추가 액션 플래그
  const [isAddingCurriculum, setIsAddingCurriculum] = useState<boolean>(false);

  // react-hook-form
  const methods = useForm<{ curriculumList: StudyCurriculumCardInterface[] }>({
    defaultValues: { curriculumList: MockCurriculumCardApiResult },
    mode: "onChange",
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (formData: {
    curriculumList: StudyCurriculumCardInterface[];
  }) => {
    console.log("data", formData);
    reset();
  };

  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header className="mb-[20px] justify-between">
            <Typography.SubTitle1>커리큘럼</Typography.SubTitle1>
            <div className="flex gap-2">
              {isModify && (
                <Button.Ghost
                  color="Main"
                  active
                  className="h-[30px] p-0 pl-1.5 pr-3 text-[14px]"
                  onClick={() => setIsAddingCurriculum(true)}
                >
                  <i className="bi bi-plus text-[22px]"></i>
                  커리큘럼 추가
                </Button.Ghost>
              )}
              <Button.Solid
                color="Main"
                active
                className="h-[30px] text-[14px]"
                onClick={() => {
                  setIsModify((prev) => !prev);
                }}
                type={isModify ? "button" : "submit"}
              >
                {isModify ? "저장" : "수정"}
              </Button.Solid>
              {/* <Button.Ghost color="Blue" active className="h-[30px] text-[14px]">
              <i className="bi bi-upload"></i>
              파일업로드
            </Button.Ghost> */}
            </div>
          </Card.Header>
          <Card.Content>
            <Curriculum
              isModify={isModify}
              isAddingCurriculum={isAddingCurriculum}
              setIsAddingCurriculum={setIsAddingCurriculum}
            />
          </Card.Content>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CurriculumCard;
