import { ScheduleCardProps } from "@/features/study/schedule/ui/schedule.ui.types";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

const ScheduleCard = ({
  title,
  onAdd,
  children,
  isAdmin,
}: ScheduleCardProps) => {
  return (
    <Card className="mb-3 max-h-[400px] min-h-52 overflow-y-auto pt-0 tablet:max-h-[310px]">
      <Card.Header className="sticky top-0 z-[1] flex flex-col justify-between gap-3 bg-white py-4">
        <div className="flex w-full justify-between">
          <Typography.SubTitle1>{title}</Typography.SubTitle1>
          <div className="flex gap-2">
            {isAdmin && onAdd && (
              <Button.Solid color="Main" active size="sm" onClick={onAdd}>
                <i className="bi bi-plus text-xl" /> 일정 추가
              </Button.Solid>
            )}
          </div>
        </div>
      </Card.Header>
      <Card.Content className="gap-3">{children}</Card.Content>
    </Card>
  );
};
export default ScheduleCard;
