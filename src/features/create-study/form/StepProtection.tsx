import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const StepProtection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") || "1");

  const { watch } = useFormContext();

  const isStep1Completed = watch("step1Completed", false);
  const isStep2Completed = watch("step2Completed", false);
  const isStep3Completed = watch("step3Completed", false);

  useEffect(() => {
    if (step === 2 && !isStep1Completed) router.replace("/create-study?step=1");
    if (step === 3 && !isStep2Completed) router.replace("/create-study?step=2");
    if (step === 4 && !isStep3Completed) router.replace("/create-study?step=3");
  }, [step, isStep1Completed, isStep2Completed, router]);

  return null;
};

export default StepProtection;
