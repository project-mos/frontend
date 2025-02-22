import QueryClientProvider from "@/app/queryClientProvider";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
