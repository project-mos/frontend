import { PreviewBoxProps } from "@/features/study-room/types/study-room.type";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";

const PreviewBox = ({ data, setState }: PreviewBoxProps) => {
  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-3">
        {data.map((d, index) => (
          <div className="rounded-md border p-3 " key={index}>
            <Typography.P3 className="text-[14px]">{d}</Typography.P3>
          </div>
        ))}
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

export default PreviewBox;
