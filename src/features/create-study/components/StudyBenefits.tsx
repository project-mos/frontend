import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StudyFormInterface } from "../form/CreateStudyForm";
import ContentAdderBox from "./ContentAdderBox";
import ContentInputBox from "./ContentInputBox";

const StudyBenefits = () => {
  const methods = useFormContext<StudyFormInterface>();

  const [isInputBoxOpened, setIsInputBoxOpened] = useState<boolean>(false);

  useEffect(() => {
    const benefits = methods.watch("benefits");

    if (benefits && benefits?.length >= 1 && benefits[0] !== "") {
      setIsInputBoxOpened(true);
    }
  }, []);

  return (
    <>
      {isInputBoxOpened ? (
        <ContentInputBox
          name="benefits"
          subTitle="스터디 혜택"
          buttonText="혜택 추가"
          placeholder="스터디 혜택을 입력하세요"
          setIsInputBoxOpened={setIsInputBoxOpened}
        />
      ) : (
        <ContentAdderBox
          buttonText="스터디 혜택 추가하기"
          description="스터디 혜택을 추가하여 참여자들에게 제공되는 장점을 설명해보세요."
          setIsInputBoxOpened={setIsInputBoxOpened}
        />
      )}
    </>
  );
};

export default StudyBenefits;
