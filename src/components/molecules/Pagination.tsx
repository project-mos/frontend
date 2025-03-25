"use client";
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
        <Button.Ghost
          color="Main"
          key={pageNumber}
          active={pageNumber === activePage}
          onClick={() => pushPage(pathname, pageNumber)}
        >
          {pageNumber}
        </Button.Ghost>
      );
    }
    return null;
  }).filter(Boolean); // undefined/null 제거

  function pushPage(pathname: string, route: string | number) {
    router.push(`${pathname}?page=${route}`);
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button.Ghost
        color="Gray"
        disabled={activePage === 1}
        onClick={() => {
          pushPage(pathname, 1);
        }}
      >
        처음
      </Button.Ghost>
      <Button.Ghost
        color="Gray"
        disabled={activePage === 1}
        onClick={() => {
          pushPage(pathname, prevPage);
        }}
      >
        이전
      </Button.Ghost>
      {generatePagination}
      <Button.Ghost
        color="Gray"
        disabled={activePage === totalPage}
        onClick={() => {
          pushPage(pathname, nextPage);
        }}
      >
        다음
      </Button.Ghost>
      <Button.Ghost
        color="Gray"
        disabled={activePage === totalPage}
        onClick={() => {
          pushPage(pathname, totalPage);
        }}
      >
        마지막
      </Button.Ghost>
    </div>
  );
};

export default Pagination;
