export const generateSlug = (slug: string) =>
  slug
    ? slug
        .trim()
        .replaceAll("-", " ")
        .replaceAll("&", " ")
        .replaceAll("`", " ")
        .replaceAll(".", " ")
        .replaceAll("!", " ")
        .replaceAll("(", " ")
        .replaceAll(")", " ")
        .replaceAll("[", " ")
        .replaceAll("]", " ")
        .split(" ")
        .filter(Boolean)
        .join("-")
        .toLocaleLowerCase()
    : "";
