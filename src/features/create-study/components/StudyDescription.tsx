import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

import LabelTextAreaInput from "./LabelTextAreaInput";
import LabelEditor from "./LabelEditor";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@/components/atoms/ErrorMessage";

const StudyDescription = () => {
  const {
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext();

  return (
    <Card>
      <Card.Header className="mb-[30px]">
        <Typography.SubTitle1>스터디 설명</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[15px]">
        <LabelEditor
          label="스터디 설명"
          name="content"
          required
          onChange={(value) => {
            setValue("content", value);
            if (value.trim()) {
              clearErrors("content");
            }
          }}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message as string}</ErrorMessage>
        )}
        <LabelTextAreaInput label="참여 요건" name="requirements" />
      </Card.Content>
    </Card>
  );
};
export default StudyDescription;
