import LandingContentCards from "@/features/landing/components/LandingContentCards";
import LandingContentHeader from "@/features/landing/components/LandingContentHeader";
import LandingLoginToast from "@/features/landing/components/LandingLoginToast";
import Pagination from "@/shared/components/molecules/Pagination";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const activePage = Number((await searchParams).page) || 1;

  return (
    <div className="flex flex-col gap-10 ">
      <LandingLoginToast />
      <LandingContentHeader />
      <LandingContentCards />
      <div className="flex justify-center">
        <Pagination activePage={activePage} totalPage={19} />
      </div>
    </div>
  );
}
