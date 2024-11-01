export const formatApiData = (data: any) => {
  const all_data = Object.keys(data).map((share: any) => {
    return {
      symbol: share.toUpperCase().replace("-USD", ""),
      date: new Date(data[share][0].Date),
      open: data[share][0].Open,
      high: data[share][0].High,
      low: data[share][0].Low,
      close: data[share][0].Close,
      volume: data[share][0].Volume,
    };
  });

  return all_data;
};
