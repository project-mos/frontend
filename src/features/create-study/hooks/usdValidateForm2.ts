import { useFormContext } from "react-hook-form";
import { StudyFormInterface } from "../form/CreateStudyForm";

const useValidateForm2 = () => {
  const { setError } = useFormContext<StudyFormInterface>();

  const validateForm = (data: StudyFormInterface) => {
    let isValid = true;

    if (!data.content || data.content === "") {
      setError("content", { message: "스터디 설명은 필수 입력사항입니다." });
      isValid = false;
    }

    if (!isValid) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }

    return isValid;
  };

  return validateForm;
};

export default useValidateForm2;
