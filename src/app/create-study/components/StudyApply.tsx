import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import {
  QuestionInterface,
  StudyFormInterface,
} from "@/features/create-study/types/create-study.type";
import StudyApplyQuestion from "./StudyApplyQuestion";

const StudyApply = () => {
  const { watch, setValue, setError, clearErrors } =
    useFormContext<StudyFormInterface>();
  const watchedQuestions = useWatch({ name: "applicationQuestions" });

  const questions = watch("applicationQuestions") || [
    {
      questionNum: 1,
      question: "",
      required: false,
      type: "주관식",
      options: [],
    },
  ];

  const handleAddQuestion = () => {
    setValue("applicationQuestions", [
      ...questions,
      {
        questionNum: questions.length + 1,
        question: "",
        required: false,
        type: "주관식",
        options: [],
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    setValue(
      "applicationQuestions",
      questions.filter((_: QuestionInterface, i: number) => i !== index)
    );
  };

  useEffect(() => {
    setValue("applicationQuestions", [
      {
        questionNum: 1,
        question: "",
        required: false,
        type: "주관식",
        options: [],
      },
    ]);
  }, []);

  useEffect(() => {
    questions.forEach((q: QuestionInterface, index: number) => {
      if (q.type === "객관식") {
        const validOptions = (q.options || []).filter(
          (opt) => opt.trim() !== ""
        );
        if (validOptions.length < 2) {
          setError(`applicationQuestions.${index}.options`, {
            type: "manual",
            message: "객관식은 최소 2개의 유효한 옵션이 필요합니다.",
          });
        } else {
          clearErrors(`applicationQuestions.${index}.options`);
        }
      } else {
        clearErrors(`applicationQuestions.${index}.options`);
      }
    });
  }, [questions, watchedQuestions]);

  return (
    <Card className="pb-[30px]">
      <Card.Header className="mb-[30px] flex justify-between">
        <Typography.SubTitle1>지원서 양식</Typography.SubTitle1>
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
      <Card.Footer className="mt-7 flex justify-end">
        <Button.Ghost onClick={handleAddQuestion} color="Main" type="button">
          <i className="bi bi-plus text-[20px]"></i>
          질문 추가
        </Button.Ghost>
      </Card.Footer>
    </Card>
  );
};

export default StudyApply;
