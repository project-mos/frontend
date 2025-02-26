import QueryClientProvider from "@/app/queryClientProvider";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "@/components/molecules/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Header />
        <QueryClientProvider>
          <div className="px-[100] pt-[75]">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
