import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface ProfileProps {
  width: number;
  height: number;
  src: string | StaticImageData;
  className?: string;
  children?: React.ReactNode;
}

const Profile: React.FC<ProfileProps> = ({
  width,
  height,
  src,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-full",
        `w-[${width}px] h-[${height}px]`,
        className
      )}
    >
      <Image src={src} alt="프로필 이미지" width={width} height={height} />
      {children}
    </div>
  );
};
export default Profile;
