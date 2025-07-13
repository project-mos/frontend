import AuthInitializerProvider from "@/entities/auth/model/AuthInitializerProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthInitializerProvider isAuth={true} />
      {children}
    </>
  );
}
