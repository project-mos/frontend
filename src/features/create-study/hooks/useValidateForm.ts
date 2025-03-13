import { useFormContext } from "react-hook-form";
import { StudyFormInterface } from "../form/CreateStudyForm";

const useValidateForm = () => {
  const { setError } = useFormContext<StudyFormInterface>();

  const validateForm = (data: StudyFormInterface) => {
    let isValid = true;

    if (!data.name?.trim()) {
      setError("name", { message: "스터디명은 필수 입력사항입니다." });
      isValid = false;
    }

    if (!data.person?.trim()) {
      setError("person", { message: "모집 인원은 필수 입력사항입니다." });
      isValid = false;
    } else if (parseInt(data.person) <= 0) {
      setError("person", { message: "모집 인원은 1명 이상이어야 합니다." });
      isValid = false;
    }

    if (!data.recruitmentStartDate || !data.recruitmentEndDate) {
      setError("recruitmentStartDate", {
        message: "모집 시작일과 마감일은 필수 입력사항입니다.",
      });
      isValid = false;
    }

    if (data.recruitmentStartDate > data.recruitmentEndDate) {
      setError("recruitmentStartDate", {
        message: "유효하지 않은 날짜 지정입니다.",
      });
      setError("recruitmentEndDate", {
        message: "유효하지 않은 날짜 지정입니다.",
      });
      isValid = false;
    }

    if (!data.meetingType) {
      setError("meetingType", {
        message: "스터디 방식은 필수 입력사항입니다.",
      });
      isValid = false;
    }

    if (!data.schedule?.trim()) {
      setError("schedule", { message: "진행 시간은 필수 입력사항입니다." });
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

export default useValidateForm;
