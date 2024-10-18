// import { fetchData, formatApiData } from "../lib/utils";
import { Share, ShareListType, TmetaData, TtimeSeries } from "../types";
import { PrismaClient } from "@prisma/client";
import { top_100_shares_list } from "../top-100-shares";
import { cryptos } from "../cryptos";
import { generateSlug } from "../lib/generateSlug";

const prisma = new PrismaClient();

async function addSharesList() {
  // const list: ShareListType[] = top_100_shares_list.map((share) => {
  //   return {
  //     ...share,
  //     slug: generateSlug(share.name),
  //     ipoDate: new Date(share.ipoDate),
  //   };
  // });

  // const list: ShareListType[] = cryptos.map((share) => {
  //   return {
  //     ...share,
  //     slug: generateSlug(share.name),
  //     ipoDate: new Date(share.ipoDate),
  //   };
  // });

  // console.log("LIst ====> ", list)
  // await prisma.topSharesList.createMany({
  //   data: list,
  // });

  // const gold = {
  //   name: "Gold",
  //   slug: generateSlug("Gold"),
  //   symbol: "AU",
  //   ipoDate: new Date("1998-08-05"),
  //   volume: 15803139,
  //   type: "gold",
  // };

  // await prisma.topSharesList.create({
  //   data: gold,
  // });

  console.log("Share List added successfully");
}

async function addSharesHistoricalData() {
  let sharesHistoricalData = [];

  // for (let i = 0; i < top_100_shares_list.length; i++) {
  // for (let i = 0; i < cryptos.length; i++) {
  // if(i > 3) break;
  // console.log("SHare symbole ============+> ", { share: cryptos[i].symbol });

  // const data: Share[] = await getHistoricalData(`ETH-USD`);
  // const data: Share[] = await getHistoricalData(`${cryptos[i].symbol}-USD`);
  // const data: Share[] = await getHistoricalData(
  //   top_100_shares_list[i].symbol
  // );

  // sharesHistoricalData.push(...data);
  // }

  // const gold = await getHistoricalData(`AU`);

  // console.log("Share data ======+> ", sharesHistoricalData);

  // await prisma.sharesData.createMany({
  //   data: sharesHistoricalData,
  // });

  // await prisma.sharesData.createMany({
  //   data: gold,
  // });

  console.log(`Shares historical data added successfully`);
}

async function updateCryptoSymbols() {
  for (let i = 0; i < cryptos.length; i++) {
    const a = await prisma.sharesData.updateMany({
      where: {
        symbol: {
          contains: `${cryptos[i].symbol}-USD`,
        },
      },
      data: {
        symbol: `${cryptos[i].symbol}`,
      },
    });
  }

  console.log(`Symbols updated successfully successfully`);
}

async function main() {
  // await addSharesList();
  // await addSharesHistoricalData();

  // await updateCryptoSymbols();

  console.log("Seeded successfully");
}

main()
  .then(() => prisma.$disconnect()) // Disconnect from the database on successful completion
  .catch(async (e) => {
    console.error(e); // Log any errors
    await prisma.$disconnect(); // Ensure disconnection even if an error occurs
    process.exit(1); // Exit the process with an error code
  });
