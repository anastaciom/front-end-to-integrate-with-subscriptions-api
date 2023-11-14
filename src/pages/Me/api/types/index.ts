export type TQueryParams = {
  q?: string;
  page: number;
  order: "popular" | "latest";
  image_type: "all" | "photo" | "illustration" | "vector";
  per_page: number;
  lang:
    | "cs"
    | "da"
    | "de"
    | "en"
    | "es"
    | "fr"
    | "id"
    | "it"
    | "hu"
    | "nl"
    | "no"
    | "pl"
    | "pt"
    | "ro"
    | "sk"
    | "fi"
    | "sv"
    | "tr"
    | "vi"
    | "th"
    | "bg"
    | "ru"
    | "el"
    | "ja"
    | "ko"
    | "zh";
};
