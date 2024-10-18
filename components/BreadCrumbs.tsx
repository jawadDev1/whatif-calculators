import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

interface Props {
  symbol: string;
}

const BreadCrumbs = ({ symbol }: Props) => {
  return (
    <div className="flex items-center justify-start">
      <Link
        href={"/investment-calculator"}
        className="md:text-lg text-sm hover:font-bold"
      >
        Home
      </Link>
      <ChevronRightIcon className="md:w-5 w-4 h-4 md:h-6" />

      <Link
        href={"/investment-calculator/shares"}
        className="md:text-lg text-sm hover:font-bold"
      >
        Shares
      </Link>
      <ChevronRightIcon className="md:w-5 w-4 h-4 md:h-6" />
      <Link href={""} className="md:text-lg text-sm">
        {symbol}
      </Link>
    </div>
  );
};

export default BreadCrumbs;
