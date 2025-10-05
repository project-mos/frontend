"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useGetBanners } from "@/entities/study/banner/model/banner.quseries";
import Typography from "@/shared/components/atoms/Typography";

const StudyLandingBanner = () => {
  // 현재 보고 있는 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // 배너 조회
  const { data: banners } = useGetBanners();

  // 현재 인덱스가 0이면 마지막 슬라이드로, 아니면 -1 이동
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (banners?.length ?? 1) - 1 : prevIndex - 1
    );
  }, [banners]);

  // 마지막 인덱스이면 다시 0으로, 아니면 +1 이동
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (banners?.length ?? 1) - 1 ? 0 : prevIndex + 1
    );
  }, [banners]);

  // 특정 인덱스로 점프
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext]);

  if (!banners || banners.length === 0) {
    return (
      <div className="flex min-h-[325px] w-full flex-col border bg-gray-200 tablet:flex-row">
        <Typography.Head3 className="m-auto text-gray-400">
          현재 등록된 배너가 없습니다.
        </Typography.Head3>
      </div>
    );
  }

  return (
    <div className="flex min-h-[325px] w-full flex-col tablet:flex-row">
      <div className="relative mx-auto w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((item) => (
            <div key={item.id} className="relative min-w-full">
              <Image
                src={item.imageUrl}
                alt={item.content}
                width={1200}
                height={400}
                className="h-[400px] w-full object-cover"
              />
            </div>
          ))}
        </div>

        {banners.length > 1 && (
          <>
            {/* 이전 버튼 */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 w-10 -translate-y-1/2 rounded-full bg-gray-500 bg-opacity-50 p-2 text-white transition hover:bg-opacity-75"
            >
              ←
            </button>

            {/* 다음 버튼 */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 w-10 -translate-y-1/2 rounded-full bg-gray-500 bg-opacity-50 p-2 text-white transition hover:bg-opacity-75"
            >
              →
            </button>
          </>
        )}

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
          {banners.length > 1 &&
            banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`size-3 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudyLandingBanner;
