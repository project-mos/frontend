import { useEffect, useState } from "react";
import ContentAdderBox from "./ContentAdderBox";
import ContentInputBox from "./ContentInputBox";

const StudyRules = () => {
  const [isInputBoxOpenedState, setIsInputBoxOpenedState] =
    useState<boolean>(false);

  useEffect(() => {
    const storedData = localStorage.getItem("studyForm");
    if (storedData) {
      const parsedForm = JSON.parse(storedData);
      const rules = parsedForm.rules;

      if (rules.length >= 1 && rules[0] !== "") {
        setIsInputBoxOpenedState(true);
      }
    }
  }, []);

  return (
    <>
      {isInputBoxOpenedState ? (
        <ContentInputBox
          name="rules"
          subTitle="스터디 규칙"
          buttonText="규칙 추가"
          placeholder="스터디 규칙을 입력하세요"
          setIsInputBoxOpened={setIsInputBoxOpenedState}
        />
      ) : (
        <ContentAdderBox
          buttonText="스터디 규칙 추가하기"
          description="스터디 규칙을 추가하여 참여자들이 지켜야 할 사항을 안내해보세요."
          setIsInputBoxOpened={setIsInputBoxOpenedState}
        />
      )}
    </>
  );
};

export default StudyRules;
