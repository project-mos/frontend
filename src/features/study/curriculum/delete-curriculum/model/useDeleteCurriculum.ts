import { FormValues } from "@/entities/study/curriculum/model/curriculum.queries.types";
import { useFormContext } from "react-hook-form";

const useDeleteCurriculum = () => {
  const { register, getValues, setValue } = useFormContext<FormValues>();

  // 커리큘럼 삭제
  const deleteCurriculum = (sectionId: number) => {
    const curriculumList = getValues("curriculumList");
    const filteredList = curriculumList.filter(
      (item) => item.sectionId !== sectionId
    );

    // sectionId를 1부터 순차적으로 재정렬
    const updatedList = filteredList.map((item, index) => ({
      ...item,
      sectionId: index + 1,
    }));

    setValue("curriculumList", updatedList);
  };

  return {
    deleteCurriculum,
    register,
  };
};

export default useDeleteCurriculum;
