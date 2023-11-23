export type TImages = {
  id: number;
  imageType: string;
  imageUrl: string;
  userName: string;
  userPhoto: string;
  views: number;
  height: number;
  width: number;
};

export type TDialog = {
  message?: string;
  isShow: boolean;
};

export type TImageType = "all" | "photo" | "illustration" | "vector";
export type TOrderType = "popular" | "latest";
export type TLanguage =
  | "pt"
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
