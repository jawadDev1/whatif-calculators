import TopLoader from "@/components/ui/TopLoader";
import { unstable_noStore as noStore } from "next/cache";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();
  return (
    <>
      <TopLoader />
      {children}
    </>
  );
}
