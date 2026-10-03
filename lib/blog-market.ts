/**
 * Which hub a post belongs to. Kept free of Node imports so client components
 * (the home page) can use it without pulling the filesystem-based post loader
 * into the browser bundle.
 */
export type BlogMarket = "norway" | "us";

/** The hub a language's own posts belong to by default. */
export function defaultMarketFor(lang: "en" | "no"): BlogMarket {
  return lang === "no" ? "norway" : "us";
}
