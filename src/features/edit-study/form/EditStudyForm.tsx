"use client";
import { FormProvider, useForm } from "react-hook-form";

import EditStudyForm1 from "@/features/edit-study/form/EditStudyForm1";

import { PatchStudyForm } from "@/entities/study/studies/api/studies.api.type";

const EditStudyForm = () => {
  const methods = useForm<PatchStudyForm>({
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
    },
  });

  return (
    <FormProvider {...methods}>
      <EditStudyForm1 />
    </FormProvider>
  );
};

export default EditStudyForm;
