import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormResetField,
} from "react-hook-form";
import { TSearchSchema } from "../validate";
import { TImageType, TLanguage, TOrderType } from "../../../types";

export interface TFormProps {
  register: UseFormRegister<{
    searchPhoto?: string;
    imageType: TImageType;
    order: TOrderType;
    lang: TLanguage;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      searchPhoto?: string;
      imageType: TImageType;
      order: TOrderType;
      lang: TLanguage;
    },
    undefined
  >;
  errors: FieldErrors<{
    searchPhoto?: string;
    imageType: TImageType;
    order: TOrderType;
    lang: TLanguage;
  }>;
  changeFilter: (newFilterType: TOrderType) => void;
  onSubmit: ({ imageType, order, searchPhoto }: TSearchSchema) => Promise<void>;
  filterType: TOrderType;
  isDirty: boolean;
  resetFilter: UseFormResetField<{
    imageType: TImageType;
    order: TOrderType;
    lang: TLanguage;
    searchPhoto?: string | undefined;
  }>;
}
