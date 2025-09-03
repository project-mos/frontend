"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GetBannersResponse } from "@/features/study/landing/ui/landing.ui.types";

// 더미 데이터 - 추후 API 연동 예정
const carouselItems: GetBannersResponse[] = [
  {
    id: 1,
    title: "First Slide",
    content: "This is the first slide description",
    imageUrl: "https://via.placeholder.com/1200x400?text=Slide+1",
    linkUrl: "https://example.com/event1",
    sortOrder: 1,
  },
  {
    id: 2,
    title: "Second Slide",
    content: "This is the second slide description",
    imageUrl: "https://via.placeholder.com/1200x400?text=Slide+2",
    linkUrl: "https://example.com/event2",
    sortOrder: 2,
  },
  {
    id: 3,
    title: "Third Slide",
    content: "This is the third slide description",
    imageUrl: "https://via.placeholder.com/1200x400?text=Slide+3",
    linkUrl: "https://example.com/event3",
    sortOrder: 3,
  },
];

const StudyLandingBanner = () => {
  // 현재 보고 있는 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 현재 인덱스가 0이면 마지막 슬라이드로, 아니면 -1 이동
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  }, []);

  // 마지막 인덱스이면 다시 0으로, 아니면 +1 이동
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

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

  return (
    <div className="flex min-h-[325px] w-full flex-col border tablet:flex-row">
      <div className="relative mx-auto w-full overflow-hidden border border-red-500">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item) => (
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

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
          {carouselItems.map((_, index) => (
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
