import { useState } from "react";
import ContentAdderBox from "./ContentAdderBox";

const StudyCurriculum = () => {
  const [isInputBoxOpened, setIsInputBoxOpened] = useState<boolean>(false);

  return (
    <>
      {isInputBoxOpened ? (
        <ContentAdderBox
          buttonText="커리큘럼 추가하기"
          description="커리큘럼을 추가하여 스터디 계획을 구체적으로 설명해보세요."
          setIsInputBoxOpened={setIsInputBoxOpened}
        />
      ) : (
        <ContentAdderBox
          buttonText="커리큘럼 추가하기"
          description="커리큘럼을 추가하여 스터디 계획을 구체적으로 설명해보세요."
          setIsInputBoxOpened={setIsInputBoxOpened}
        />
      )}
    </>
  );
};

export default StudyCurriculum;
