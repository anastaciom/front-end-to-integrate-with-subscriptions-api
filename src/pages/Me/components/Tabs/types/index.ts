import { UseFormRegister } from "react-hook-form";
import { TImageType, TLanguage, TOrderType } from "../../../types";

export interface ITabsProps {
  registerFieldInForm: UseFormRegister<{
    searchPhoto?: string;
    imageType: TImageType;
    order: TOrderType;
    lang: TLanguage;
  }>;
  filterType: TOrderType;
  changeFilter: (newFilterType: TOrderType) => void;
}

export type TTabs = {
  nome: TOrderType;
  title: "Recentes" | "Populares";
  className: string;
};
