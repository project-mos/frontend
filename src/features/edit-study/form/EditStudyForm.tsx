"use client";
import { FormProvider, useForm } from "react-hook-form";

import EditStudyForm1 from "@/features/edit-study/form/EditStudyForm1";

import {
  PatchStudyForm,
  StudyForm,
} from "@/entities/study/studies/api/studies.api.type";

const EditStudyForm = ({ study }: { study: StudyForm }) => {
  const methods = useForm<PatchStudyForm>({
    mode: "onChange",
    defaultValues: {
      title: study.title,
      category: study.category,
      maxStudyMemberCount: study.maxStudyMemberCount,
      recruitmentStartDate: study.recruitmentStartDate,
      recruitmentEndDate: study.recruitmentEndDate,
      tags: study.tags,
      meetingType: study.meetingType,
      schedule: study.schedule,
      content: study.content,
      requirements: study.requirements,
    },
  });

  return (
    <FormProvider {...methods}>
      <EditStudyForm1 />
    </FormProvider>
  );
};

export default EditStudyForm;
