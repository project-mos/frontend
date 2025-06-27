import React from "react";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";
import LabelRadioInput from "@/shared/components/molecules/LabelRadioInput";

import StudyApplicationInfoMessage from "./StudyApplicationInfoMessage"; // 내부에서 InfoField 사용
import { StudyApplicationFormFieldsProps } from "@/features/study/study-application/ui/study-application.ui.types";

const getRegisterOptions = (required: boolean) => {
  return {
    required: required ? "필수 입력 항목입니다." : false,
  };
};

const StudyApplicationFormFields = ({
  questions,
}: StudyApplicationFormFieldsProps) => {
  if (!questions || questions.length === 0) {
    return (
      <StudyApplicationInfoMessage>
        이 모집은 별도의 지원 양식을 사용하지 않습니다.
        <br />
        자유롭게 지원해주세요!
      </StudyApplicationInfoMessage>
    );
  }

  return (
    <>
      {questions.map((item, index) => {
        if (item.type === "주관식") {
          return (
            <div className="mb-[10px]" key={`${item.question}_${item.id}`}>
              <LabelTextAreaInput
                label={item.question}
                name={String(item.id)}
                placeholder="내용을 입력해 주세요."
                required={item.required}
                registerOptions={getRegisterOptions(item.required)}
              />
            </div>
          );
        } else {
          const options = item.options.map((option) => ({
            label: option,
            value: option,
          }));
          return (
            <LabelRadioInput
              key={`${item.question}_${item.id}_${index}`}
              name={String(item.id)}
              label={item.question}
              options={options}
              required={item.required}
              registerOptions={getRegisterOptions(item.required)}
            />
          );
        }
      })}
    </>
  );
};

export default StudyApplicationFormFields;
