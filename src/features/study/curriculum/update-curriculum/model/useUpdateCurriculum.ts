import { FormValues } from "@/entities/study/curriculum/model/curriculum.queries.types";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

const useUpdateCurriculum = () => {
  // 수정 여부 플래그
  const [isModifyState, setIsModifyState] = useState<boolean>(false);

  const { setValue, watch } = useFormContext<FormValues>();
  const curriculumList = watch("curriculumList");

  // dnd 아이템 이동
  // dragIndex: 드래그한 아이템의 인덱스 (클릭한 항목)
  // hoverIndex: 드래그한 아이템을 놓을 목표 인덱스
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updatedList = [...curriculumList];
    const [draggedItem] = updatedList.splice(dragIndex, 1); // draggedItem: 기존 배열에서 이동시킬 아이템을 뽑아옴
    updatedList.splice(hoverIndex, 0, draggedItem); // 기존 배열의 hoverIndex 위치에 draggedItem을 삽입
    // sectionId를 index 순서에 맞게 재정렬
    const reorderedList = updatedList.map((item, index) => ({
      ...item,
      sectionId: index + 1,
    }));

    setValue("curriculumList", reorderedList);
  };

  return {
    isModifyState,
    setIsModifyState,
    moveItem,
  };
};

export default useUpdateCurriculum;
