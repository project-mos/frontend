import Pagination from "@/components/molecules/Pagination";
import LandingContentCards from "@/features/landing/components/LandingContentCards";

import LandingContentHeader from "@/features/landing/components/LandingContentHeader";

interface HomeProps {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const activePage = Number((await searchParams).page) || 1;

  return (
    <div className="flex flex-col gap-10 ">
      <LandingContentHeader />
      <LandingContentCards />
      <div className="flex justify-center">
        <Pagination activePage={activePage} totalPage={19} />
      </div>
    </div>
  );
}
