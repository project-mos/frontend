"use client";
import ClientRedirect from "@/features/login/components/ClientRedirect";
import Typography from "@/shared/components/atoms/Typography";
import { useEffect, useState } from "react";

const Redirect = () => {
  const [dotCount, setDotCount] = useState(2); // 처음 ".." 부터 시작

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 500); // 0.5초마다

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <section className="flex h-[600px] items-center p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="flex max-w-md flex-col items-center justify-center gap-8 text-center">
          <Typography.Head3 className="text-6xl font-extrabold dark:text-gray-400">
            <span className="sr-only">Redirect</span>
            이동중{".".repeat(dotCount)}
          </Typography.Head3>
          <Typography.Head3 className="md:text-3xl text-2xl font-semibold">
            잠시만 기다려주세요!
          </Typography.Head3>
        </div>
      </div>
      <ClientRedirect />
    </section>
  );
};

export default Redirect;
