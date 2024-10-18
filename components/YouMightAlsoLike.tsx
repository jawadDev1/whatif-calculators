import React from "react";
import SubHeading from "./ui/SubHeading";
import Content from "./ui/Content";
import Link from "next/link";
import { ShareListType } from "@/types";
import { getTop5Links } from "@/services/sharelistServices";

interface Props {
  skipShare?: string;
}

const YouMightAlsoLike = async ({ skipShare }: Props) => {
  // Get the You might also like links
  const res = await getTop5Links(skipShare || "AAPL");
  const response = await res.json();

  const shares: ShareListType[] = JSON.parse(response.data.top5Links);

  return (
    <div className="border bg-white shadow-md rounded">
      <div className="text-center py-4 bg-slate-100">
        <SubHeading>Calculate for other shares</SubHeading>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 py-8 px-4 gap-5">
        {shares &&
          shares.map((share, i) => (
            <Link
              key={i}
              href={`/investment-calculator/shares/${share.slug}-investment-calculator`}
              className="hover:scale-105 transition-all duration-200 ease-out shadow-lg cursor-pointer rounded-md px-3 py-1"
            >
              <Content className="">
                What if i invested $1,000 in {share.name}?
              </Content>
            </Link>
          ))}
        <Link
          href={`/investment-calculator/shares`}
          className="hover:scale-105 flex items-center justify-center transition-all duration-200 ease-out shadow-lg cursor-pointer rounded-md px-3 py-1"
        >
          <Content className="text-center ">View all shares</Content>
        </Link>
      </div>
    </div>
  );
};

export default YouMightAlsoLike;
