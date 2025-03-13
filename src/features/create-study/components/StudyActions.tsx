import Button from "@/components/atoms/Button";

interface StudyActionsProps {
  solidLabel: string;
  ghostLabel: string;
  onClickBackButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StudyActions = ({
  solidLabel,
  ghostLabel,
  onClickBackButton,
}: StudyActionsProps) => {
  return (
    <div className="m-auto flex gap-[10px]">
      <Button.Solid color="Main" className="px-[40px]" active>
        {solidLabel}
      </Button.Solid>
      <Button.Ghost
        onClick={onClickBackButton}
        type="button"
        color="Gray"
        className="px-[30px]"
      >
        {ghostLabel}
      </Button.Ghost>
    </div>
  );
};

export default StudyActions;
