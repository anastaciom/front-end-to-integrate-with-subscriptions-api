import { UseFormRegister } from "react-hook-form";

export interface ITabsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerFieldInForm: UseFormRegister<{
    order?: "popular" | "latest" | undefined;
  }>;
  filterType: "popular" | "latest" | undefined;
  changeFilter: (newFilterType: "popular" | "latest") => void;
}

export type TTabs = {
  nome: "latest" | "popular";
  title: "Recentes" | "Populares";
  className: string;
};
