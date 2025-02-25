import React from "react";
import Button from "../atoms/Button";
import { usePathname, useRouter } from "next/navigation";

type PaginationType = {
  activePage: number;
  totalPage: number;
};
const Pagination = ({ activePage, totalPage }: PaginationType) => {
  const router = useRouter();
  const pathname = usePathname();
  const prevPage = activePage - 1;
  const nextPage = activePage + 1;

  const generatePagination = Array.from({ length: 5 }, (_, i) => {
    const pageNumber = activePage + i;
    if (pageNumber <= totalPage) {
      return (
        <Button.Main
          key={pageNumber}
          onClick={() => pushPage(pathname, pageNumber)}
        >
          {pageNumber}
        </Button.Main>
      );
    }
    return null;
  }).filter(Boolean); // undefined/null 제거

  function pushPage(pathname: string, route: string | number) {
    router.push(`${pathname}?page=${route}`);
  }

  return (
    <div className="flex gap-2">
      <Button.Gray
        disabled={activePage === 1}
        onClick={() => {
          pushPage(pathname, 1);
        }}
      >
        처음
      </Button.Gray>
      <Button.Gray
        disabled={activePage === 1}
        onClick={() => {
          pushPage(pathname, prevPage);
        }}
      >
        이전
      </Button.Gray>
      {generatePagination}
      <Button.Gray
        disabled={activePage === totalPage}
        onClick={() => {
          pushPage(pathname, nextPage);
        }}
      >
        다음
      </Button.Gray>
      <Button.Gray
        disabled={activePage === totalPage}
        onClick={() => {
          pushPage(pathname, totalPage);
        }}
      >
        마지막
      </Button.Gray>
    </div>
  );
};

export default Pagination;
