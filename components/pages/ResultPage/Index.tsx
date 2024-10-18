import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ResultContent from "../../ResultContent";
import { ResultProps } from "@/types";

const ResultPage = ({ result }: ResultProps) => {
  return (
    <Card className="w-full mx-auto bg-slate-50 shadow-lg py-1 ">
      <CardHeader>
        <CardTitle className="text-xl sm:text-lg font-bold text-center">
          Discover Your Missed Earnings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 md:p-6">
        <ResultContent result={result} />
      </CardContent>
    </Card>
  );
};

export default ResultPage;
