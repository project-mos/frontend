"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import Button from "../atoms/Button";

interface PaginationProps {
  totalPage: number;
  activePage: number;
  scrollIntoViewID?: string; // 스크롤 이동할 ID
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  activePage,
  scrollIntoViewID,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  const prevPage = activePage - 1;
  const nextPage = activePage + 1;

  const maxPageToShow = 5;
  let startPage = Math.max(1, activePage - 2);
  let endPage = startPage + maxPageToShow - 1;

  if (activePage <= 3) {
    // 처음 3페이지는 무조건 1부터 시작
    startPage = 1;
    endPage = maxPageToShow;
  }

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, endPage - maxPageToShow + 1);
  }

  const generatePagination = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => {
      const pageNumber = startPage + i;
      return (
        <Button.Ghost
          color="Main"
          key={pageNumber}
          active={pageNumber === activePage}
          disabled={false}
          onClick={() => pushPage(pathname, pageNumber)}
        >
          {pageNumber}
        </Button.Ghost>
      );
    }
  );

  function pushPage(pathname: string, route: string | number) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(route));
    router.push(`${pathname}?${searchParams.toString()}`);
  }

  useEffect(() => {
    if (activePage && !isFirstMount.current) {
      const element = document.getElementById(scrollIntoViewID || "pagination");

      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    isFirstMount.current = false;
  }, [activePage, scrollIntoViewID]);

  return (
    <div className="flex flex-wrap justify-center gap-2" id="pagination">
      <Button.Ghost
        color="Main"
        disabled={activePage === 1}
        onClick={() => {
          pushPage(pathname, 1);
        }}
      >
        처음
      </Button.Ghost>
      <Button.Ghost
        color="Main"
        disabled={activePage === 1}
        onClick={() => {
          pushPage(pathname, prevPage);
        }}
      >
        이전
      </Button.Ghost>
      {generatePagination}
      <Button.Ghost
        color="Main"
        disabled={activePage === totalPage}
        onClick={() => {
          pushPage(pathname, nextPage);
        }}
      >
        다음
      </Button.Ghost>
      <Button.Ghost
        color="Main"
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
