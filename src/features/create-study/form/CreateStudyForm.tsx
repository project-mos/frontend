"use client";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import CreateStudyForm1 from "@/features/create-study/form/CreateStudyForm1";
import CreateStudyForm2 from "@/features/create-study/form/CreateStudyForm2";
import CreateStudyForm3 from "@/features/create-study/form/CreateStudyForm3";
import CreatStidyForm4 from "./CreateStudyForm4";

export interface StudyFormInterface {
  category: string;
  meetingType: string;
  name: string;
  person: string;
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  schedule: string;
  content: string;
  requirements?: string;
  rules?: string[];
  benefits?: string;
  questions: {
    question: string;
    answerType: string;
    isRequired: boolean;
    options: string[];
  }[];
}

const CreateStudyForm = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "1";
  const stepNumber = Number(step);

  const methods = useForm<StudyFormInterface>();

  return (
    <FormProvider {...methods}>
      {stepNumber === 2 ? (
        <CreateStudyForm2 />
      ) : stepNumber === 3 ? (
        <CreateStudyForm3 />
      ) : stepNumber === 4 ? (
        <CreatStidyForm4 />
      ) : (
        <CreateStudyForm1 />
      )}
    </FormProvider>
  );
};

export default CreateStudyForm;
