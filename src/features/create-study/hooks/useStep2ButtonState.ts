import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StudyFormInterface } from "../form/CreateStudyForm";

const useStep2ButtonState = () => {
  const { trigger, watch } = useFormContext<StudyFormInterface>();
  const [isValid, setIsValid] = useState(false);
  const content = watch("content");

  useEffect(() => {
    const checkValid = async () => {
      const result = await trigger(["content"]);
      setIsValid(result);
    };

    checkValid();
  }, [content]);

  return isValid;
};

export default useStep2ButtonState;
