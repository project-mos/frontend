"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import { StudyFormInterface } from "./CreateStudyForm";

const CreateStudyForm4 = () => {
  const { watch } = useFormContext<StudyFormInterface>();
  const formData = watch();
  const router = useRouter();

  const handleCompleteButton = () => {
    localStorage.removeItem("studyForm");
    router.replace("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col  gap-3">
      <Card className="p-6">
        <Card.Header className="mb-4">
          <Typography.Head3>입력된 스터디 정보</Typography.Head3>
        </Card.Header>
        <Card.Content className="flex flex-col gap-4">
          <Typography.SubTitle1>기본 정보</Typography.SubTitle1>
          <div>
            <p>📌 스터디명: {formData.name || "입력 없음"}</p>
            <p>📌 카테고리: {formData.category || "입력 없음"}</p>
            <p>📌 모집 인원: {formData.person || "입력 없음"}</p>
            <p>
              📌 모집 기간: {formData.recruitmentStartDate || "없음"} ~{" "}
              {formData.recruitmentEndDate || "없음"}
            </p>
            <p>📌 진행 방식: {formData.meetingType || "입력 없음"}</p>
            <p>📌 진행 시간: {formData.schedule || "입력 없음"}</p>
          </div>

          <Typography.SubTitle1>스터디 상세 설명</Typography.SubTitle1>
          <div>
            <p>📌 설명:</p>
            <div
              className="mb-[10px] rounded-md border bg-gray-50 p-2"
              dangerouslySetInnerHTML={{
                __html: formData.content || "입력 없음",
              }}
            />
            <p>📌 참여 요건: {formData.requirements || "입력 없음"}</p>
            <p>📌 혜택: {formData.benefits || "입력 없음"}</p>
            <p>📌 규칙: {formData.rules || "입력 없음"}</p>
          </div>

          <Typography.SubTitle1>질문 리스트</Typography.SubTitle1>
          <div>
            {formData.questions.length > 0 ? (
              formData.questions.map((question, index) => (
                <div key={index} className="rounded-md border p-3">
                  <p>
                    🔹 <strong>질문 {index + 1}</strong>:{" "}
                    {question.question || "입력 없음"}
                  </p>
                  <p>📝 답변 유형: {question.answerType || "입력 없음"}</p>
                  <p>
                    ✅ 필수 여부: {question.isRequired ? "✔ 필수" : "❌ 선택"}
                  </p>
                  {question.options && question.options.length > 0 && (
                    <div>
                      <p>📌 선택 옵션:</p>
                      <ul className="ml-4 list-disc">
                        {question.options.map((option, idx) => (
                          <li key={idx}>{option || "입력 없음"}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>질문이 없습니다.</p>
            )}
          </div>
        </Card.Content>
      </Card>
      <Button.Solid
        active
        color="Main"
        className="m-auto w-[300px]"
        type="button"
        onClick={() => handleCompleteButton()}
      >
        완료
      </Button.Solid>
    </div>
  );
};

export default CreateStudyForm4;
