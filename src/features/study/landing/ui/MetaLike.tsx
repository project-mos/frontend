"use client";
import Meta from "@/shared/components/molecules/Meta";
import { useEffect, useState } from "react";

const MetaLike = () => {
  const [likedCount, setLikedCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    if (liked) setLikedCount((prev) => prev + 1);
    if (likedCount !== 0 && !liked) setLikedCount((prev) => prev - 1);
  }, [liked]);

  return (
    <Meta
      icon={
        liked
          ? `heart-fill text-red-500 text-[14px] mt-[3px]`
          : `heart text-[14px] mt-[3px]`
      }
      className="min-w-3"
      onClick={handleClick}
    >
      {likedCount}
    </Meta>
  );
};

export default MetaLike;
