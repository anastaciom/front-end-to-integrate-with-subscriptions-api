import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import { TSearchSchema } from "../validate";

export interface TFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<{
    searchPhoto?: string | undefined;
    imageType?: "all" | "photo" | "illustration" | "vector" | undefined;
    order?: "popular" | "latest" | undefined;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      searchPhoto?: string | undefined;
      imageType?: "all" | "photo" | "illustration" | "vector" | undefined;
      order?: "popular" | "latest" | undefined;
    },
    undefined
  >;
  errors: FieldErrors<{
    searchPhoto?: string | undefined;
    imageType?: "all" | "photo" | "illustration" | "vector" | undefined;
    order?: "popular" | "latest" | undefined;
  }>;
  changeFilter: (newFilterType: "popular" | "latest") => void;
  onSubmit: ({ imageType, order, searchPhoto }: TSearchSchema) => Promise<void>;
  filterType: "popular" | "latest" | undefined;
}
