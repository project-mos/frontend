"use client";
import CreateStudyForm1 from "@/features/create-study/form/CreateStudyForm1";
import CreateStudyForm2 from "@/features/create-study/form/CreateStudyForm2";
import CreateStudyForm3 from "@/features/create-study/form/CreateStudyForm3";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreatStidyForm4 from "./CreateStudyForm4";
import StepProtection from "./StepProtection";

export interface StudyFormInterface {
  step1Completed: boolean;
  step2Completed: boolean;
  step3Completed: boolean;
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
  benefits?: string[];
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

  const methods = useForm<StudyFormInterface>({
    defaultValues: {
      step1Completed: false,
      step2Completed: false,
      step3Completed: false,
      category: "",
      meetingType: "",
      name: "",
      person: "",
      recruitmentEndDate: "",
      recruitmentStartDate: "",
      schedule: "",
      content: "",
      requirements: "",
      rules: [""],
      benefits: [""],
      questions: [],
    },
  });

  useEffect(() => {
    methods.reset();
  }, []);

  return (
    <FormProvider {...methods}>
      <StepProtection />
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
