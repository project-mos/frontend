import Button from "@/components/atoms/Button";

interface StudyActionsProps {
  solidLabel: string;
  ghostLabel: string;
}
const StudyActions = ({ solidLabel, ghostLabel }: StudyActionsProps) => {
  return (
    <div className="m-auto flex gap-[10px]">
      <Button.Solid color="Main" className="px-[40px]" active>
        {solidLabel}
      </Button.Solid>
      <Button.Ghost type="button" color="Gray" className="px-[30px]">
        {ghostLabel}
      </Button.Ghost>
    </div>
  );
};

export default StudyActions;
