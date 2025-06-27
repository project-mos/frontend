import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import { SetStateAction } from "react";

interface PreviewBoxProps {
  data: string[];
  setState: React.Dispatch<SetStateAction<boolean>>;
  label: "혜택" | "규칙";
}

const PreviewBox = ({ data, label, setState }: PreviewBoxProps) => {
  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-3">
        {<StudyRulesList data={data} label={label} />}
      </div>

      {/* 관리자만 볼 수 있는 버튼 */}
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
    </div>
  );
};

const StudyRulesList = ({
  data,
  label,
}: {
  data: PreviewBoxProps["data"];
  label: PreviewBoxProps["label"];
}) => {
  return (
    <div className="flex flex-col gap-3">
      {data && data.length > 0 ? ( // data가 존재하는지 먼저 확인
        data.map((item, index) => (
          <div className="rounded-md border p-3" key={index}>
            <Typography.P3 className="text-[14px]">{item}</Typography.P3>
          </div>
        ))
      ) : (
        <div className="rounded-md border p-3">
          <Typography.P3 className="text-[14px]">
            스터디 {label}이 없습니다!
          </Typography.P3>
        </div>
      )}
    </div>
  );
};

export default PreviewBox;
