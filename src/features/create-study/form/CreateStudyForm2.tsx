import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import StudyActions from "../components/StudyActions";
import StudyBenefits from "../components/StudyBenefits";
import StudyCurriculum from "../components/StudyCurriculum";
import StudyDescription from "../components/StudyDescription";
import StudyRules from "../components/StudyRules";
import { StudyFormInterface } from "./CreateStudyForm";

type QuillEditorHandle = {
  getContent: () => string;
};

const CreateStudyForm2 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const [contents, setContents] = useState<string>("");
  const { setValue } = useFormContext();
  const editorRef = useRef<QuillEditorHandle>(null);

  const onSubmit = () => {
    methods.setValue("content", contents);
    handleGetContent();
    router.push("/create-study?step=3");
  };

  const handleClickBackButton = () => {
    router.push("/create-study?step=1");
  };

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setValue("content", content);
      if (setContents) setContents(content);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>2/3 단계</Badge>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <StudyDescription editorRef={editorRef} />
          <StudyCurriculum />
          <StudyRules />
          <StudyBenefits />
          <StudyActions
            solidLabel="다음 단계"
            ghostLabel="이전 단계"
            onClickBackButton={handleClickBackButton}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm2;
