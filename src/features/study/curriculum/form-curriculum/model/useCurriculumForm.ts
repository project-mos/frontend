import { PostCurriculumRequest } from "@/entities/study/curriculum/api/curriculum.api.type";
import {
  useGetCurriculum,
  usePostCurriculum,
} from "@/entities/study/curriculum/model/curriculum.query";

import { useToast } from "@/shared/hooks/useToast";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useCurriculumForm = (studyId: number) => {
  const { success, error } = useToast();

  // 커리큘럼 조회
  const { data: curriculumData } = useSuspenseQuery(useGetCurriculum(studyId));

  // 커리큘럼 생성 | 수정 | 삭제
  const { mutate: updateCurriculum } = usePostCurriculum({
    onSuccess: () => {
      success("등록되었습니다.");
    },

    onError: (err) => {
      error(String(err));
    },
  });

  // react-hook-form
  const methods = useForm<{ curriculumList: PostCurriculumRequest[] }>({
    defaultValues: {
      curriculumList: curriculumData,
    },
    mode: "onChange",
  });

  const { handleSubmit, setValue, watch } = methods;

  const curriculumList = watch("curriculumList");

  useEffect(() => {
    // curriculumData가 바뀔 때마다 form 상태를 동기화
    if (curriculumData) {
      setValue("curriculumList", curriculumData);
    }
  }, [curriculumData, setValue]);

  const onSubmit = (formData: { curriculumList: PostCurriculumRequest[] }) => {
    updateCurriculum({ studyId, data: formData.curriculumList });
  };

  return {
    methods,
    curriculumList,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default useCurriculumForm;
