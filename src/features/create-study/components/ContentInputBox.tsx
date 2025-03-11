import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Typography from "@/components/atoms/Typography";
import React from "react";

interface ContentInputBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  subTitle: string;
  buttonText: string;
}

const InlineInput = ({ ...props }) => {
  return (
    <div className="flex">
      <Input
        //   id={inputId}
        //   value={tagInput}
        //   onChange={(e) => setTagInput(e.target.value)}
        className="w-full rounded-r-none placeholder:text-mos-gray-500"
        {...props}
      />
      <Button.Solid
        type="button"
        color="Main"
        className="h-[42px] w-[50px] rounded-l-none"
      >
        <i className="bi bi-trash text-mos-coral-500"></i>
      </Button.Solid>
    </div>
  );
};

const ContentInputBox = ({
  subTitle,
  buttonText,
  ...props
}: ContentInputBoxProps) => {
  //   const [rules, setRules] = useState<string[]>([]);

  return (
    <Card>
      <Card.Header className="mb-[30px] flex justify-between">
        <Typography.SubTitle1>{subTitle}</Typography.SubTitle1>
        <div className="flex gap-[3px] ">
          <Button.Default className="h-[35px]">
            <i className="bi bi-plus"></i>
            {buttonText}
          </Button.Default>
          <Button.Solid color="Main" className="h-[35px]">
            <i className="bi bi-x"></i>
            취소
          </Button.Solid>
        </div>
      </Card.Header>
      <Card.Content className="mb-[20px] flex flex-col gap-[13px]">
        <InlineInput {...props} />
        <InlineInput {...props} />
      </Card.Content>
    </Card>
  );
};

export default ContentInputBox;
