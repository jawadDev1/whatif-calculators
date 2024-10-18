import React from "react";
import Heading from '../components/ui/Heading'
import SubHeading from '../components/ui/SubHeading'
import Link from "next/link";


const PageNotFound = () => {
  return (
    <div className="h-screen bg-background flex flex-col justify-center items-center">
      <Heading>
        Oops! page not found
      </Heading>
      <SubHeading className="text-lg underline text-blue-500">
        <Link href={"/investment-calculator"}>
        Go to Home
        </Link>
      </SubHeading>
    </div>
  );
};

export default PageNotFound;
