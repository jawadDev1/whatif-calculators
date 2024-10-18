import React from "react";
import ResultPage from "@/components/pages/ResultPage/Index";
import Faqs from "@/components/Faqs";
import { detailPageFaqs, faqs } from "@/constants/faqs";
import { Result } from "@/types";

import YouMightAlsoLike from "@/components/YouMightAlsoLike";
import { replaceShareNameInFaqs } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Your Investment Results | How Much Would You Have Made in Stocks and Crypto?",
  description:
    "See your potential investment growth in top stocks and crypto. Calculate missed opportunities and explore how your investments could have performed over time. Get detailed results now!",
  alternates: {
    canonical: `https://whatifcalculators.com/investment-calculator/result`,
  },
};

const page = async ({
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: Result;
}) => {
  const result = {
    name: searchParams.name,
    symbol: searchParams.symbol,
    amount: Number(searchParams.amount),
    result: Number(searchParams.result),
    type: searchParams?.type,
    year: Number(searchParams?.year),
  };

  const newFaqs = replaceShareNameInFaqs(detailPageFaqs, {
    shareName: result.name,
    year: String(result.year),
  });

  return (
    <section className="md:min-h-[80vh] md:w-[60%] md:gap-16 gap-5  w-full mx-auto md:py-16 py-11 flex flex-col items-center justify-center px-4 ">
      <section className="md:w-[80%] w-full">
        <ResultPage result={result} />
      </section>

      <div className="md:w-[80%] w-full mx-auto   mt-7">
        <YouMightAlsoLike skipShare={result.symbol} />
      </div>
      {result.type === "single" ? (
        <Faqs faqs={newFaqs} />
      ) : (
        <Faqs faqs={faqs} />
      )}
    </section>
  );
};

export default page;
