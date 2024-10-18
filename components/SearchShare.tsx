"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { ShareListType } from "@/types";
import { SEARCH_SHARES } from "@/actions/sharesListActions/inedex";
import { Label } from "@/components/ui/label";
import SearchIcon from "@/icons/SearchIcon";

interface Props {
  handleShare: (val: ShareListType) => void;
}

const SearchStock = ({ handleShare }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchedShares, setSearchedShares] = useState<ShareListType[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const { debounceValue, loading } = useDebounce(search, 300);

  const searchShares = async () => {
    const result = await SEARCH_SHARES(debounceValue);
    // console.log(
    //   "Searched============> ",
    //   JSON.parse(result.data.shares).length
    // );

    setSearchedShares(JSON.parse(result.data.shares));
  };

  useEffect(() => {
    if (!loading && debounceValue) {
      searchShares();
    }
  }, [debounceValue]);

  return (
    <div className="relative">
      <div className="space-y-2 relative">
        <Label htmlFor="search">Search for a Stock</Label>
        <Input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Stock"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className="px-8"
        />
        <SearchIcon className="absolute top-[50%] left-2" />
      </div>
      <div
        className={cn(
          `text-black flex flex-col absolute left-0 gap-4 w-[100%] z-30 py-3 px-3`,
          {
            "bg-white": searchedShares?.length > 0,
            "bg-slate-50 hidden": !isSearchFocused,
          }
        )}
      >
        {searchedShares?.length > 0 &&
          searchedShares?.map((stock) => (
            <span
              key={stock.symbol}
              className="cursor-pointer hover:font-[700]"
              onClick={() => {
                handleShare(stock);
                setSearch(stock.name);
                setIsSearchFocused(false);
              }}
            >
              {stock.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default SearchStock;
