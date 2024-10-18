import { Share, ShareListRes } from "@/types";

const json = (param: ShareListRes[] | Share) => {
  return JSON.stringify(param, (key, value) => {
    return typeof value === "bigint" ? value.toString() : value;
  });
};
export default json;
