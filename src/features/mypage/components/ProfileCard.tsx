import Card from "@/components/atoms/Card";
import Profile from "@/components/atoms/Profile";
import profileImg from "../../../app/asset/images/profile_example.jpeg";
import Typography from "@/components/atoms/Typography";
import Tag from "@/components/atoms/Tag";
import Button from "@/components/atoms/Button";

const ProfileCard = () => {
  return (
    <Card>
      <Card.Content className="mb-[15px] items-center gap-[15px]">
        <Profile
          width={150}
          height={150}
          src={profileImg}
          className="mt-[25px]"
        />
        <Typography.Head3>홍길동</Typography.Head3>
        <Typography.P3 className="text-[14px] text-mos-gray-500">
          홍길동의 한줄 소개들어가유
        </Typography.P3>
        <div className="mb-[10px] flex gap-2">
          <Tag.Green border={true}>프로그래밍</Tag.Green>
          <Tag.Green border={true}>어학</Tag.Green>
        </div>
        <Button.Ghost color="Main" className="w-full">
          프로필 수정
        </Button.Ghost>
      </Card.Content>
      <Card.Footer>
        <Typography.P3 className="mt-[10px] text-[14px] text-mos-gray-300">
          가입일: 2024-01-01
        </Typography.P3>
      </Card.Footer>
    </Card>
  );
};

export default ProfileCard;
