"use client";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { StudyCurriculumCardInterface } from "@/features/study-room/types/study-room.type";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import Curriculum from "./Curriculum";

import { useTokenStore } from "@/entities/auth/store/auty.store";
import {
  curriculumQueryOption,
  useUpdateCurriculum,
} from "@/features/study-room/services/curriculum.service";
import { GetCurriculumResult } from "@/features/study-room/types/curriculum.api";
import { useToast } from "@/shared/hooks/useToast";

const CurriculumCard = ({ studyId }: { studyId: number }) => {
  const { accessToken } = useTokenStore();
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  // 수정 여부 플래그
  const [isModifyState, setIsModifyState] = useState<boolean>(false);
  // 커리큘럼 추가 버튼 플래그
  const [isCreateState, setIsCreateState] = useState<boolean>(false);
  // 커리큘럼 데이터 조회
  const { data: curriculumData } = useSuspenseQuery<GetCurriculumResult[]>(
    curriculumQueryOption(accessToken, String(studyId))
  );

  // react-hook-form
  const methods = useForm<{ curriculumList: StudyCurriculumCardInterface[] }>({
    defaultValues: {
      curriculumList: curriculumData,
    },
    mode: "onChange",
  });
  const { handleSubmit, setValue, getValues, watch } = methods;
  const curriculumList = watch("curriculumList");

  // 커리큘럼 추가
  const addCurriculum = () => {
    const currentValues = getValues("curriculumList");
    const newItem = {
      sectionId: curriculumList.length + 1,
      title: "",
      content: "",
    };
    const updated = [...currentValues, newItem];
    setValue("curriculumList", updated);
  };

  // 커리큘럼 생성 | 수정 | 삭제
  const { mutate: updateCurriculum } = useUpdateCurriculum(studyId, {
    onSuccess: () => {
      success("등록되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["study_room_curriculum", studyId],
      });
      setIsCreateState(false);
      setIsModifyState(false);
    },

    onError: (err) => {
      error(String(err));
    },
  });

  // 빈 항목이 하나라도 있으면 false
  const isValidCurriculum = curriculumList.every(
    (item) => item.sectionId && item.title.trim() && item.content.trim()
  );

  const onSubmit = (formData: {
    curriculumList: StudyCurriculumCardInterface[];
  }) => {
    updateCurriculum(formData.curriculumList);
  };

  return (
    <Card className="col-span-12 h-fit min-h-[565px] gap-3 tablet:col-span-9 laptop:col-span-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header className="mb-[20px] justify-between">
            <Typography.SubTitle1>커리큘럼</Typography.SubTitle1>
            <div className="flex gap-2">
              {isCreateState && (
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
                  setIsCreateState(true);
                  setIsModifyState((prev) => !prev);
                }}
                type={isModifyState ? "button" : "submit"}
                active={isValidCurriculum}
              >
                {curriculumList.length === 0
                  ? "등록"
                  : isCreateState
                  ? "확인"
                  : "수정"}
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
