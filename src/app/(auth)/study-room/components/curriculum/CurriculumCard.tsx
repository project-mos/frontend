"use client";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { StudyCurriculumCardInterface } from "@/features/study-room/types/study-room.type";
import Curriculum from "./Curriculum";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTokenStore } from "@/shared/store/authStore";
import { curriculumQueryOption } from "@/features/study-room/services/curriculum.service";
import { GetCurriculumResult } from "@/features/study-room/types/curriculum.api";

const CurriculumCard = ({ studyId }: { studyId: number }) => {
  const { accessToken } = useTokenStore();
  // 수정 여부 플래그
  const [isModifyState, setIsModifyState] = useState<boolean>(false);
  // 커리큘럼 데이터 조회
  const { data: curriculumData } = useSuspenseQuery<GetCurriculumResult[]>(
    curriculumQueryOption(accessToken, studyId)
  );

  // react-hook-form
  const methods = useForm<{ curriculumList: StudyCurriculumCardInterface[] }>({
    defaultValues: {
      curriculumList: [],
    },
    mode: "onChange",
  });
  const { handleSubmit, setValue, getValues, watch } = methods;
  const curriculumList = watch("curriculumList");

  // curriculumData가 로드된 후 defaultValues 업데이트
  useEffect(() => {
    if (curriculumData) {
      setValue("curriculumList", curriculumData);
    }
  }, [curriculumData, setValue]);

  // 커리큘럼 추가
  const addCurriculum = () => {
    const currentValues = getValues("curriculumList");
    const newItem = {
      id: 0,
      sectionId: 0,
      title: "",
      content: "",
    };
    const updated = [...currentValues, newItem];
    setValue("curriculumList", updated);
  };

  // 빈 항목이 하나라도 있으면 false
  const isValidCurriculum = curriculumList.every(
    (item) => item.sectionId && item.title.trim() && item.content.trim()
  );

  const onSubmit = (formData: {
    curriculumList: StudyCurriculumCardInterface[];
  }) => {
    console.log("data", formData);
  };

  return (
    <Card className="col-span-12 h-fit min-h-[565px] gap-3 tablet:col-span-9 laptop:col-span-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header className="mb-[20px] justify-between">
            <Typography.SubTitle1>커리큘럼</Typography.SubTitle1>
            <div className="flex gap-2">
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
