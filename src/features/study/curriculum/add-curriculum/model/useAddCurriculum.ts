import { FormValues } from "@/entities/study/curriculum/model/curriculum.queries.types";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const useAddCurriculum = () => {
  // 커리큘럼 추가 버튼 플래그
  const [isCreateState, setIsCreateState] = useState<boolean>(false);

  const {
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();
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

  // 모든 커리큘럼 항목이 비어 있지 않은지 검사 (하나라도 비어 있으면 false)
  // → 액션 버튼 활성화 조건에 사용
  const isValidCurriculum = curriculumList.every(
    (item) => item.sectionId && item.title.trim() && item.content.trim()
  );

  // 특정항목의 step, title, content 중 하나라도 에러가 있으면 true 에러가 없으면 false
  const hasAnyFieldError = (index: number) => {
    const error = errors?.curriculumList?.[index];
    return error?.sectionId || error?.title || error?.content;
  };

  return {
    isCreateState,
    setIsCreateState,
    addCurriculum,
    curriculumList,
    isValidCurriculum,
    hasAnyFieldError,
  };
};

export default useAddCurriculum;
