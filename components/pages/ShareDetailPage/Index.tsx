import React from "react";
import Heading from "@/components/ui/Heading";
import SubHeading from "@/components/ui/SubHeading";
import Content from "@/components/ui/Content";
import { replaceShareNameInFaqs } from "@/lib/utils";
import { detailPageFaqs } from "@/constants/faqs";
import Faqs from "@/components/Faqs";
import { getShareDetail } from "@/services/sharelistServices";
import { ShareListType } from "@/types";
import SingleShareCalculator from "@/components/SingleShareCalculator";
import BreadCrumbs from "@/components/BreadCrumbs";
import Link from "next/link";

import { generateSlug } from "@/lib/generateSlug";
import { notFound } from "next/navigation";
import YouMightAlsoLike from "@/components/YouMightAlsoLike";

export interface Props {
  slug: string;
}

const Index = async ({ slug }: Props) => {
  const res2 = await getShareDetail(slug);
  const result2 = await res2.json();

  if (!result2.data.share) notFound();

  if (!result2.success) {
    return (
      <div className="h-screen bg-background flex flex-col justify-center items-center">
        <Heading>Oops! Share not found. (incorrect slug)</Heading>
        <SubHeading className="text-lg underline text-blue-500">
          <Link href={"/investment-calculator"}>Go to Home</Link>
        </SubHeading>
      </div>
    );
  }
  const shares: ShareListType[] = JSON.parse(result2.data.share);
  const share: ShareListType = shares[0];

  const newFaqs = replaceShareNameInFaqs(detailPageFaqs, {
    shareName: share.name,
    year: String(new Date(share.ipoDate).getFullYear()),
  });

  // generateMetadata({ shareName: share.name });

  // schema markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${share.name} ${share.symbol} Investment Calculator`,
    url: "https://www.whatifcalculators.com",
    description:
      "Find out how much your investment would be worth today. Use our Historical Investment Return Calculator to see your missed gains and investment growth over time.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    softwareVersion: "1.0",
    featureList: `${share.name} Investment Calculator`,
    about: {
      "@type": "Organization",
      name: `${share.name}`,
      alternateName: `${share.symbol}`,
      url: `https://www.whatifcalculators.com/investment-calculator/shares/${generateSlug(
        share.name
      )}-investment-calculator`,
      description: `See how much your investment could be worth today, if you would have invested $1,000 in ${share.name} ${share.symbol}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-8 px-4 text-center">
        <div className="md:w-[80%] w-full mx-auto  my-2 md:my-4 ">
          <BreadCrumbs symbol={share.symbol} />
        </div>
        <Heading>
          <span className="text-blue-600">
            {share.name} ({share.symbol})
          </span>{" "}
          Stock Investment Calculator
        </Heading>
        <SubHeading className="text-deep-blue">
          What If I Invested $1,000 in {share.name} Stock?
        </SubHeading>

        <Content className="">
          See how much your investment could be worth today, if you would have
          invested $1,000 in {share.name} ({share.symbol})
        </Content>

        <SingleShareCalculator selectedShare={share} />

        <div className="md:w-[50%] w-full mx-auto  mt-8">
          <Faqs className="" faqs={newFaqs} />
        </div>

        <div className="md:w-[50%] w-full mx-auto  mt-8">
          <YouMightAlsoLike />
        </div>
      </section>
    </>
  );
};

export default Index;
