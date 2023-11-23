import { TImageType, TLanguage, TOrderType } from "../../types";

export type TQueryParams = {
  q?: string;
  page: number;
  order: TOrderType;
  image_type: TImageType;
  per_page: number;
  lang: TLanguage;
};
