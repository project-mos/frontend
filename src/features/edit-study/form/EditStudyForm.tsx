"use client";
import { FormProvider, useForm } from "react-hook-form";

import EditStudyForm1 from "@/features/edit-study/form/EditStudyForm1";

import { StudyForm } from "@/entities/study/studies/api/studies.api.type";

const EditStudyForm = () => {
  const methods = useForm<StudyForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      maxStudyMemberCount: 4,
      recruitmentStartDate: "",
      recruitmentEndDate: "",
      tags: [],
      meetingType: "",
      schedule: "",
      content: "",
      requirements: "",
      rules: [{ ruleNum: 1, content: "" }],
      benefits: [{ benefitNum: 1, content: "" }],
      applicationQuestions: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <EditStudyForm1 />
    </FormProvider>
  );
};

export default EditStudyForm;
