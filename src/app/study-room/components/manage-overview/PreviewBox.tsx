import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import { SetStateAction } from "react";

interface PreviewBoxProps {
  data: { id: number; text: string }[];
  setState: React.Dispatch<SetStateAction<boolean>>;
}

const PreviewBox = ({ data, setState }: PreviewBoxProps) => {
  return (
    <div className="px-4">
      <div className="flex w-full justify-end py-4">
        <Button.Solid
          onClick={() => setState(true)}
          active
          color="Main"
          type="submit"
          className="h-[35px]"
        >
          수정하기
        </Button.Solid>
      </div>
      {data.map((d, index) => (
        <div className="py-2" key={d.id}>
          <Typography.P2>
            {index + 1}. {d.text}
          </Typography.P2>
        </div>
      ))}
    </div>
  );
};

export default PreviewBox;
