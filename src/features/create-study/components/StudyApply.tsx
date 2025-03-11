import { useFormContext } from "react-hook-form";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import StudyApplyQuestion from "./StudyApplyQuestion";
import { useEffect } from "react";

interface QuestionInterface {
  question: string;
  isRequired: boolean;
  answerType: string;
  options?: string[];
}

const StudyApply = () => {
  const { watch, setValue } = useFormContext();
  const questions = watch("questions") || [
    { question: "", isRequired: false, answerType: "주관식", options: [] },
  ];

  const handleAddQuestion = () => {
    setValue("questions", [
      ...questions,
      { question: "", isRequired: false, answerType: "주관식", options: [] },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    setValue(
      "questions",
      questions.filter((_: QuestionInterface, i: number) => i !== index)
    );
  };

  useEffect(() => {
    setValue("questions", [
      { question: "", isRequired: false, answerType: "주관식", options: [] },
    ]);
  }, []);

  return (
    <Card className="pb-[30px]">
      <Card.Header className="mb-[30px] flex justify-between">
        <Typography.SubTitle1>지원서 양식</Typography.SubTitle1>
        <Button.Ghost onClick={handleAddQuestion} color="Main" type="button">
          <i className="bi bi-plus text-[20px]"></i>
          질문 추가
        </Button.Ghost>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[20px]">
        {questions &&
          questions.map((_: QuestionInterface, index: number) => (
            <StudyApplyQuestion
              key={index}
              index={index}
              i={index + 1}
              onRemove={() => handleRemoveQuestion(index)}
            />
          ))}
      </Card.Content>
    </Card>
  );
};

export default StudyApply;
