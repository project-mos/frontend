"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import URL from "@/shared/constants/URL";
import { StudyFormInterface } from "@/entities/study/create/api/create-study.type";

const useStudyStepProtection = (
  watch: (name?: string) => Partial<StudyFormInterface>
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") || "1");

  const formValues = watch();

  const isStep1Completed =
    !!formValues.title &&
    !!formValues.category &&
    !!formValues.recruitmentStartDate &&
    !!formValues.recruitmentEndDate &&
    !!formValues.meetingType &&
    !!formValues.schedule;

  const isStep2Completed = !!formValues.content;

  useEffect(() => {
    if (step > 1 && !isStep1Completed) {
      router.replace(`${URL.STUDY.CREATE}?step=1`);
    } else if (step > 2 && !isStep2Completed) {
      router.replace(`${URL.STUDY.CREATE}?step=2`);
    }
  }, [step, isStep1Completed, isStep2Completed, router]);
};

export default useStudyStepProtection;
