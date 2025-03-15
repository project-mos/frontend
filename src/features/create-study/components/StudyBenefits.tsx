import { useState } from "react";
import ContentAdderBox from "./ContentAdderBox";
import ContentInputBox from "./ContentInputBox";

const StudyBenefits = () => {
  const [isInputBoxOpened, setIsInputBoxOpened] = useState<boolean>(false);

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
