export const capitalizeString = (text: string) =>
  text
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");