import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StudyFormInterface } from "../form/CreateStudyForm";

const useStep1ButtonState = () => {
  const { trigger, watch } = useFormContext<StudyFormInterface>();
  const [isValid, setIsValid] = useState(false);

  const watched = watch([
    "name",
    "person",
    "recruitmentStartDate",
    "recruitmentEndDate",
    "meetingType",
    "schedule",
    "category",
  ]);

  useEffect(() => {
    const checkValid = async () => {
      const result = await trigger([
        "name",
        "person",
        "recruitmentStartDate",
        "recruitmentEndDate",
        "meetingType",
        "schedule",
        "category",
      ]);
      setIsValid(result);
    };

    checkValid();
  }, [watched.join("")]);

  return isValid;
};

export default useStep1ButtonState;
