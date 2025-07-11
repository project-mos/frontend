"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { StudyForm } from "@/entities/study/studies/api/studies.api.type";
import URL from "@/shared/constants/URL";

const useStudyStepProtection = (
  watch: (name?: string) => Partial<StudyForm>
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
