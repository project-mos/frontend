import Pagination from "@/components/molecules/Pagination";
import LandingContentCards from "@/features/landing/components/LandingContentCards";

import LandingContentHeader from "@/features/landing/components/LandingContentHeader";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 border ">
      <LandingContentHeader />
      <LandingContentCards />
      <div className="flex justify-center">
        <Pagination activePage={1} totalPage={2} />
      </div>
    </div>
  );
}
