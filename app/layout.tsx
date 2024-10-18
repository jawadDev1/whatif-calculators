import type { Metadata, Viewport } from "next";
import "./globals.css";
import { roboto } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Investment What-If Calculator | Discover Your Missed Earnings",
  description:
    "Find out how much your investment would be worth today. Use our Historical Investment Return Calculator to see your missed gains and investment growth over time.",
  keywords: [
    "Stock Gains Calculator",
    "Stock Investment Calculator",
    "Crypto Investment Return Calculator",
    "Gold Investment Calculator",
    "How Much Money Would I Have If I Invested in Tesla in 2010",
    "What If I Invested $1,000 in Amazon Stock in 2005",
    "Calculate Returns If I Invested in Bitcoin Early",
    "How Much Would I Have Made Investing in Netflix Stock",
    "Investment Calculator for Missed Stock Opportunities",
    "What If I Bought Apple Stock When It First Launched",
    "How Much Would My $5,000 Investment Be Worth Today",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-silver-background`}>
        {children}
      </body>
    </html>
  );
}
