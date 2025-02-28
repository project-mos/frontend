import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Profile from "@/components/atoms/Profile";
import Typography from "@/components/atoms/Typography";
import profileImg from "../../../app/asset/images/profile_example.jpeg";

const StudyLeaderCard = () => {
  return (
    <Card className="h-auto">
      <Card.Header className="mb-[15px]">
        <Typography.SubTitle1>스터디장</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <Profile width={60} height={60} src={profileImg} />
      </Card.Content>
      <Card.Footer>
        <Button.Icon active={true} className="w-full">
          <i className="bi bi-chat-dots"></i>
          메시지 보내기
        </Button.Icon>
      </Card.Footer>
    </Card>
  );
};

export default StudyLeaderCard;
