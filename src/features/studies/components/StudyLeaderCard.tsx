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

      <Card.Content className="mb-[20px]">
        <div className="flex items-center gap-[15px]">
          <Profile width={60} height={60} src={profileImg} />
          <div>
            <Typography.P3>김코딩</Typography.P3>
            <Typography.P3 className="mb-[5px] text-[14px] text-mos-gray-500">
              현직 네카라쿠배 개발자
            </Typography.P3>
            <div className="flex items-center">
              {Array(5)
                .fill(null)
                .map((item, index) => (
                  <i
                    className="bi bi-star-fill mr-[3px] text-yellow-500"
                    key={index}
                  ></i>
                ))}
              <Typography.P3 className="text-[15px] text-mos-gray-500">
                5
              </Typography.P3>
            </div>
          </div>
        </div>
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
