"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatNumber } from "@/lib/formatNumber";
import { ResultProps } from "@/types";

const ResultCard = ({ result }: ResultProps) => {
  const router = useRouter();

  if (!result.result) router.replace("/");

  const totalReturn = result.result - result.amount;
  const returnPercentage = (totalReturn / result.amount) * 100;

  // schema markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: result.name,
    url: "https://www.whatifcalculators.com",
    description:
      "Find out how much your investment would be worth today. Use our Historical Investment Return Calculator to see your missed gains and investment growth over time.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    softwareVersion: "1.0",
    offers: {
      "@type": "Offer",
      price: `${result.result}`,
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="md:space-y-7 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
            <span
              className="md:text-2xl text-xl"
              role="img"
              aria-label="Chart increasing emoji"
            >
              💹
            </span>
          </div>
          <div>
            <h3 className="text-lg capitalize font-semibold">
              {result.name} Investment
            </h3>
            <p className="text-sm text-gray-500">Calculated returns</p>
          </div>
        </div>
        <div className="text-center">
          <h2 className="md:text-3xl text-lg font-bold ">
            Your investment would be worth:{" "}
            <span className="text-green-500 block">
              ${formatNumber(result.result)}
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 ">
            Based on an initial investment of $
            {formatNumber(Number(result.amount))} in{" "}
            {result.symbol === "AU" ? "Gold" : result.symbol}
          </p>
        </div>

        <div className="flex flex-col md:flex-row text-center gap-3 justify-between items-center bg-gray-100 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">YOU INVESTED</p>
            <p className="text-xl font-semibold ">
              ${formatNumber(Number(result.amount))}
            </p>
          </div>
          <ArrowRight className="text-blue-500 hidden md:block" />
          <div>
            <p className="text-sm  text-gray-500">CURRENT VALUE</p>
            <p className="text-xl font-semibold text-green-500">
              ${formatNumber(result.result)}
            </p>
          </div>
        </div>
        <div className="py-4">
          <h5 className=" text-gray-950 md:text-xl font-extrabold text-right">
            Total Return:
            <span className="md:text:2xl mx-2 text-lg font-[700] ">
              {returnPercentage.toFixed(2)}%
            </span>{" "}
          </h5>
        </div>

        <Link
          href={`/investment-calculator`}
          className="grow text-center my-8 rounded bg-dark-black text-white"
        >
          <Button
            onClick={() => {}}
            className="w-full bg-dark-black text-white"
          >
            Calculate Another Investment
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ResultCard;
