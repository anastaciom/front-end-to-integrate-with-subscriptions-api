import {
  UseFormRegister,
  FieldErrors,
  UseFormResetField,
} from "react-hook-form";
import { TImageType, TLanguage, TOrderType } from "../../../types";

export interface IFilterProps {
  register: UseFormRegister<{
    searchPhoto?: string;
    imageType: TImageType;
    order: TOrderType;
    lang: TLanguage;
  }>;
  errors: FieldErrors<{
    searchPhoto?: string;
    imageType: TImageType;
    order: TOrderType;
    lang: TLanguage;
  }>;
  isDirty: boolean;
  resetFilter: UseFormResetField<{
    imageType: TImageType;
    order: TOrderType;
    lang: TLanguage;
    searchPhoto?: string | undefined;
  }>;
}
