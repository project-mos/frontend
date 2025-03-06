import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

const ShareCard = () => {
  return (
    <Card className="h-auto">
      <Card.Header className="mb-[15px]">
        <Typography.SubTitle1>공유하기</Typography.SubTitle1>
      </Card.Header>

      <Card.Footer>
        <div className="flex w-full gap-2">
          <Button.Icon className="flex-2 w-full">
            <i className="bi bi-link-45deg text-[18px]"></i>링크복사
          </Button.Icon>
          <Button.Icon className="w-full flex-1">
            <i className="bi bi-share"></i>
          </Button.Icon>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ShareCard;
