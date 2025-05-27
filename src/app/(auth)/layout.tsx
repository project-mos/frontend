import AuthInitializerProvider from "@/shared/components/system/AuthInitializerProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthInitializerProvider isAuth />
      {children}
    </>
  );
}
