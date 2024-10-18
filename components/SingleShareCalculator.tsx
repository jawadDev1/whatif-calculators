"use client";
import React from "react";

import CalculatorContent from "@/components/CalculatorContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareListType } from "@/types";

interface Props {
  selectedShare: ShareListType;
}

const SingleShareCalculator = ({ selectedShare }: Props) => {
  return (
    <div className="md:w-[50%] w-full mx-auto my-8">
      <Card className=" mx-auto bg-slate-50 shadow-lg py-1 ">
        <CardHeader>
          <CardTitle className="text-xl sm:text-lg font-bold text-center">
            How Much Would I Have Made?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CalculatorContent calcType="single" singleShare={selectedShare} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleShareCalculator;
