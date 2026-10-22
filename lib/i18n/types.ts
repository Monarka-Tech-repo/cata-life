export type LegalSection = {
  title: string;
  paragraphs?: string[];
  subsections?: { h3?: string; paragraphs?: string[]; list?: string[] }[];
  list?: string[];
};

export type ShowcaseSlideKey =
  | "profile"
  | "explore"
  | "shuffle"
  | "restaurant"
  | "newEntry"
  | "rateTaste"
  | "publish"
  | "radar"
  | "diary"
  | "route"
  | "addStop"
  | "lists"
  | "recipes";
