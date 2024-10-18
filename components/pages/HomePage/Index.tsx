import React from "react";
import { ShareCalculator } from "@/components/ShareCalculator";

import Heading from "@/components/ui/Heading";
import SubHeading from "@/components/ui/SubHeading";
import Content from "@/components/ui/Content";
import Faqs from "@/components/Faqs";
import { faqs } from "@/constants/faqs";
import schemaMarkup from "@/schema-markup.json";
import YouMightAlsoLike from "@/components/YouMightAlsoLike";

const HomePage = async () => {
  // schema markup
  const jsonLd = schemaMarkup;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="lg:w-[60%] md:w-[65%] mx-auto w-full md:py-8 py-5 px-4  flex flex-col items-center justify-center bbg-slate-100 md:p-0 text-center">
        <Heading className="text-emerald-green">
          How Much Would I Have Made If I Invested In...
        </Heading>
        <SubHeading>Discover Your Missed Investment Opportunities</SubHeading>
        <Content className="text-start">
          Welcome to our Investment What-If Calculator! Have you ever asked
          yourself, &apos;How much would I have made if I invested in{" "}
          <strong>Apple</strong>, <strong>Bitcoin</strong>, or{" "}
          <strong>Tesla</strong> years ago?&apos; Now you can find out.
          <br />
          <br />
          Simply select your favorite share or crypto, enter your investment
          amount, and see how much your investment would be worth today.
          It&apos;s never been easier to calculate your missed gains and explore
          historical investment returns.
        </Content>

        <div className="lg:w-[80%] md:mt-6 mt-3 text-start w-full">
          <ShareCalculator />
        </div>
        <Faqs faqs={faqs} />

        <div className="w-full mx-auto mt-8">
          <YouMightAlsoLike />
        </div>
      </section>
    </>
  );
};

export default HomePage;
