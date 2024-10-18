"use client";
import React, { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchShare from "@/components/SearchShare";
import { ShareCalculatorProps, ShareListType } from "@/types";

import {
  calculateReturns,
  cn,
  getShareIpoMonth,
  getShareIpoYear,
} from "@/lib/utils";
import { GET_LATEST_AND_MONTH_SHARE } from "@/actions/sharesActions";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/hooks/useMediaQuery";
import { initilaShareValues } from "@/constants/defaultValues";

import Loader from "./Loader";

const CalculatorCard = ({
  top40Shares,
  calcType,
  singleShare,
}: ShareCalculatorProps) => {
  const router = useRouter();
  const isMobileWindow = useMediaQuery(
    "(min-width: 0px) and (max-width: 768px)"
  );
  const [selectedShare, setSelectedShare] = useState<ShareListType>(
    singleShare || initilaShareValues
  );
  const [amount, setAmount] = useState<number | string>("");

  let ipYear: number = 1996;

  if (singleShare?.ipoDate) {
    const shareYear = getShareIpoYear(singleShare);
    if (!(shareYear < 1996)) {
      ipYear = shareYear;
    }
  }

  const [shareIpoYear, setShareIpoYear] = useState<number>(ipYear);
  const [ipoMonth, setIpoMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSelectFocused, setIsSelectFocused] = useState<boolean>(false);
  const [sharesList, setSharesList] = useState<ShareListType[] | null>(null);

  const handleYearChange = (value: string) => {
    setYear(Number(value));

    const sameYear = getShareIpoYear(selectedShare) === Number(value);

    if (sameYear) {
      const shareMonth = getShareIpoMonth(selectedShare);
      setIpoMonth(shareMonth);
    } else {
      setIpoMonth(0);
    }
  };

  // set the selected share and check if ipoYear is less then earliest year
  const handleShare = (share: ShareListType) => {
    setSelectedShare(share);

    if (typeof window !== undefined) {
      document
        .getElementById("share-details")
        ?.scrollIntoView({ behavior: "smooth" });
    }

    const ipoYear = getShareIpoYear(share);
    if (ipoYear < 1996) {
      setShareIpoYear(1996);
    } else {
      setShareIpoYear(ipoYear);
    }
  };

  // Calculate the Current value of the shares
  const handleCalculate = async () => {
    if (!amount || !selectedShare.symbol || !month || !year) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    const response = await GET_LATEST_AND_MONTH_SHARE(
      year.toString(),
      month < 10 ? `0${month}` : month.toString(),
      selectedShare.symbol,
      selectedShare?.type
    );

    if (!response.success) {
      setError(response.message);
      setLoading(false);
      return;
    }

    const latestShare = JSON.parse(response.data.latestShare);
    const userSelectedShare = JSON.parse(response.data.userSelectedShare);

    if (amount && selectedShare.symbol && month && year) {
      const calculatedResult = calculateReturns(
        latestShare.close,
        userSelectedShare.close,
        Number(amount)
      );

      router.push(
        `/investment-calculator/result?name=${encodeURIComponent(
          selectedShare.name
        )}&symbol=${
          selectedShare.symbol
        }&amount=${amount}&result=${calculatedResult.toFixed(
          2
        )}&year=${shareIpoYear}&type=${calcType}`
      );
    }
    setError("");
    setLoading(false);
  };

  useEffect(() => {
    if (isMobileWindow) {
      setSharesList(top40Shares?.slice(0, 16) ?? []);
    } else {
      setSharesList(top40Shares ?? []);
    }
  }, [isMobileWindow]);

  return (
    <>
      <div className="md:space-y-7 space-y-6">
        {/* Search */}

        {calcType !== "single" && <SearchShare handleShare={handleShare} />}

        {/* Top Shares List */}
        {calcType !== "single" && (
          <div className="space-y-2">
            <Label id="share-group-label" className="text-lg font-semibold">
              Select a Stock
            </Label>
            <div
              className={cn(
                "grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 z-0  w-full  items-center  md:max-h-max  gap-2 lg:px-6 px-  rounded-lg ",
                {
                  "pointer-events-none": isSelectFocused,
                }
              )}
              role="group"
              aria-labelledby="share-group-label"
            >
              <TooltipProvider>
                {!sharesList && (
                  <div className="w-full min-h-20 col-span-full flex items-center justify-center ">
                    <Loader />
                  </div>
                )}
                {sharesList &&
                  sharesList!.map((share: ShareListType, i) => {
                    if (isMobileWindow && i >= 15) return;
                    if (!isMobileWindow || i <= 15) {
                      return (
                        <Tooltip key={share.name}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                selectedShare.symbol === share.symbol
                                  ? "default"
                                  : "default"
                              }
                              onClick={() => handleShare(share)}
                              className={`text-sm w-[80%] mx-auto md:w-[95%] bg-transparent text-black hover:bg-dark-black hover:text-white  ${
                                selectedShare.symbol === share.symbol
                                  ? " bg-dark-black text-white"
                                  : ""
                              }`}
                            >
                              {share.symbol === "AU"
                                ? share.name
                                : share.symbol}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{share.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }
                  })}
              </TooltipProvider>
            </div>
          </div>
        )}

        <div id="share-details">
          {/* Selected Share */}
          {calcType !== "single" && selectedShare && selectedShare.symbol && (
            <div className="bg-silver-blue rounded px-2 py-3 shadow">
              <h4 className="md:text-lg text-[16px] font-[600] ">
                Selected Share:
              </h4>
              <h5 className="md:text-[1rem] text-sm font-[500]">
                {selectedShare?.name}
              </h5>
            </div>
          )}
        </div>
        {/* Enter Amount */}
        <div className="space-y-4">
          <div
            className={cn("space-y-2 text-start", {
              "pointer-events-none": isSelectFocused,
            })}
          >
            <Label htmlFor="amount">Investment Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => {
                if (e.target.value === "") {
                  setAmount("");
                  return;
                }
                setAmount(Number(e.target.value));
              }}
              placeholder="Enter investment amount"
              min={10}
            />
          </div>
          {/*  Select Month and Year */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 z-40">
            <div className="space-y-2 text-start">
              <Label htmlFor="year">Year</Label>
              <Select
                onValueChange={(value) => handleYearChange(value)}
                disabled={!selectedShare?.symbol}
                onOpenChange={(e) => {
                  setTimeout(() => {
                    setIsSelectFocused(e);
                  }, 100);
                }}
              >
                <SelectTrigger id="year" className="">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-white z-30">
                  {Array.from(
                    {
                      length: new Date().getFullYear() - shareIpoYear + 1,
                    },
                    (_, i) => {
                      const year = shareIpoYear + i; // Ascending wise
                      // const year = new Date().getFullYear() - i; // Descending wise
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-start">
              <Label htmlFor="month">Month</Label>
              <Select
                onValueChange={(value) => setMonth(Number(value))}
                disabled={!year}
                onOpenChange={(e) => {
                  setTimeout(() => {
                    setIsSelectFocused(e);
                  }, 100);
                }}
              >
                <SelectTrigger id="month">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent className="bg-white z-30">
                  {Array.from(
                    {
                      length:
                        year == new Date().getFullYear()
                          ? new Date().getMonth()
                          : 12 - ipoMonth,
                    },
                    (_, i) => {
                      return (
                        <SelectItem
                          key={i + 1}
                          value={(i + ipoMonth + 1).toString()}
                        >
                          {new Date(0, ipoMonth + i).toLocaleString("default", {
                            month: "long",
                          })}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <Button
            onClick={handleCalculate}
            disabled={!selectedShare.symbol || !year || !month || !amount}
            className={cn("w-full bg-dark-black  text-white ")}
          >
            {loading ? "Calculating..." : "Calculate"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CalculatorCard;
