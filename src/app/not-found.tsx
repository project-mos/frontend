import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import URL from "@/constants/URL";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex h-full items-center p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="flex max-w-md flex-col items-center justify-center gap-8 text-center">
          <Typography.Head1 className="text-9xl font-extrabold dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </Typography.Head1>
          <Typography.Head3 className="md:text-3xl text-2xl font-semibold">
            죄송합니다 페이지를 찾을 수 없습니다
          </Typography.Head3>
          <Link
            rel="noopener noreferrer"
            href={URL.HOME}
            className="rounded px-8 py-3 font-semibold dark:bg-violet-600 dark:text-gray-50"
          >
            <Button.Solid color="Main" active>
              돌아가기
            </Button.Solid>
          </Link>
        </div>
      </div>
    </section>
  );
}
