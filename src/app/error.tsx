"use client"; // Error boundaries must be Client Components
import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";

import URL from "@/shared/constants/URL";

export default function Error({
  error,
  reset,
}: {
  error: Error | { digest?: string; name?: string; message: string };
  reset: () => void;
}) {
  const [errorMessageState, setErrorMessageState] = useState("");
  useEffect(() => {
    // Log the error to an error reporting service
    // {"name":"FetchAPIError","environmentName":"Server","digest":"1755205413"} 같이 Error 생성자가 JSON으로 직렬화해서 내려옴
    // console.log(JSON.stringify(error), error.message);
    // const isInstanceOfFetchAPIError = error.name === "FetchAPIError";
    // if (isInstanceOfFetchAPIError) {
    setErrorMessageState(error.message || "");
    // }
  }, [error]);

  return (
    <section className="flex h-full items-center p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="flex max-w-md flex-col items-center justify-center gap-8 text-center">
          <Typography.Head1 className="text-9xl font-extrabold dark:text-gray-400">
            <span className="sr-only">Error</span>Error!
          </Typography.Head1>
          <Typography.Head3 className="md:text-3xl text-2xl font-semibold">
            {errorMessageState}
          </Typography.Head3>
          <div className="flex items-center justify-center gap-2">
            <Link
              rel="noopener noreferrer"
              href={URL.HOME}
              className="rounded font-semibold dark:bg-violet-600 dark:text-gray-50"
            >
              <Button.Solid color="Main" active>
                홈페이지로 가기
              </Button.Solid>
            </Link>
            <Button.Solid color="Red" active onClick={reset}>
              다시 시도하기
            </Button.Solid>
          </div>
        </div>
      </div>
    </section>
  );
}
