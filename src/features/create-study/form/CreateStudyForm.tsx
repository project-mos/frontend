"use client";
import CreateStudyForm1 from "@/features/create-study/form/CreateStudyForm1";
import CreateStudyForm2 from "@/features/create-study/form/CreateStudyForm2";
import CreateStudyForm3 from "@/features/create-study/form/CreateStudyForm3";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreateStudyForm4 from "./CreateStudyForm4";

export interface StudyFormInterface {
  category: string;
  meetingType: string;
  name: string;
  person: number;
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
  const pathname = usePathname();
  const step = searchParams.get("step") || "1";
  const stepNumber = Number(step);

  const methods = useForm<StudyFormInterface>({
    mode: "onChange",
    defaultValues: {
      category: "",
      meetingType: "",
      name: "",
      person: 4,
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

  /** 폼 데이터 변경 시마다 localStorage에 저장 */
  useEffect(() => {
    const subscription = methods.watch((values) => {
      localStorage.setItem("studyForm", JSON.stringify(values));
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  /** 페이지 최초 로드 시 localStorage에서 불러오기 */
  useEffect(() => {
    const storedData = localStorage.getItem("studyForm");
    if (storedData) {
      methods.reset(JSON.parse(storedData));
    }
  }, []);

  /** pathname이 변경되면 localStorage 초기화 */
  useEffect(() => {
    return () => {
      localStorage.removeItem("studyForm");
    };
  }, [pathname]);

  return (
    <FormProvider {...methods}>
      {stepNumber === 1 && <CreateStudyForm1 />}
      {stepNumber === 2 && <CreateStudyForm2 />}
      {stepNumber === 3 && <CreateStudyForm3 />}
      {stepNumber === 4 && <CreateStudyForm4 />}
    </FormProvider>
  );
};

export default CreateStudyForm;
