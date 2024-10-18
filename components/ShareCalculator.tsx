import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTop40Shares } from "@/services/sharelistServices";
import { ShareListType } from "@/types";

import CalculatorContent from "./CalculatorContent";

export const ShareCalculator = async () => {
  const res = await getTop40Shares();
  const result = await res.json();
  const top40Shares: ShareListType[] = JSON.parse(result.data.top40Shares);

  return (
    <Card className=" mx-auto  shadow-lg ">
      <CardHeader>
        <CardTitle className="text-xl sm:text-lg font-bold text-center text-emerald-green">
          How Much Would I Have Made?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CalculatorContent calcType="mutiple" top40Shares={top40Shares} />
      </CardContent>
    </Card>
  );
};
