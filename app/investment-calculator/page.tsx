import React from "react";
import HomePage from "@/components/pages/HomePage/Index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Use the Investment What-If Calculator to discover how much your investments in top stocks and crypto could have grown over time. Calculate missed opportunities now.",
  alternates: {
    canonical: `https://whatifcalculators.com/investment-calculator`,
  },
};

export default async function Home() {
  return <HomePage />;
}
