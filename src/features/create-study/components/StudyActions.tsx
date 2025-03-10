import Button from "@/components/atoms/Button";

const StudyActions = () => {
  return (
    <div className="m-auto flex gap-[10px]">
      <Button.Solid color="Main" className="px-[40px]" active>
        다음 단계
      </Button.Solid>
      <Button.Ghost type="button" color="Gray" className="px-[30px]">
        취소
      </Button.Ghost>
    </div>
  );
};

export default StudyActions;
