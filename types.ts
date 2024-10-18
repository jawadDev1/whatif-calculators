import { Dispatch, SetStateAction } from "react";

export interface SHARE {
  symbol: string;
  name: string;
  exchange: string;
  assetType: string;
  ipoDate: string;
  delistingDate: null;
  status: string;
}

export type CalculatorContextType = {
  amount: number | string;
  setAmount: Dispatch<SetStateAction<number | string>>;
  selectedShare: ShareListType;
  setSelectedShare: Dispatch<SetStateAction<ShareListType>>;
  result: number;
  handleReset: () => void;
  setResult: Dispatch<SetStateAction<number>>;
};

export type ShareListType = {
  name: string;
  slug: string;
  symbol: string;
  ipoDate: Date | string;
  volume: number;
  type?: string;
};

export type Share = {
  id?: string;
  symbol: string;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number | bigint;
};

//

export type TmetaData = {
  [key: string]: {
    [key: string]: string;
  };
};
export type TtimeSeries = {
  [key: string]: {
    [key: string]: string;
  };
};

export type ShareListRes = {
  symbol: string;
  id: string;
  name: string;
  ipoDate: Date;
  volume: bigint;
};

// Share Calculator Props Type
export type ShareCalculatorProps = {
  top40Shares?: ShareListType[];
  calcType: string;
  singleShare?: ShareListType;
};

export type FAQ = {
  question: string;
  answer: string;
};

export interface Result {
  name: string;
  symbol: string;
  amount: number;
  result: number;
  type?: string
  year?: number
}

// Result Page props
export interface ResultProps {
  result: Result;
}
