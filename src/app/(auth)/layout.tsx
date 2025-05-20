import URL from "@/shared/constants/URL";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token");

  if (!token) {
    redirect(URL.HOME);
  }

  return <>{children}</>;
}
