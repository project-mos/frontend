import AuthInitializerProvider from "@/shared/components/system/AuthInitializerProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 개발시에는 isAuth 무효화 */}
      <AuthInitializerProvider isAuth={process.env.NODE_ENV === "production"} />
      {children}
    </>
  );
}
