import { TImageType, TImages, TLanguage, TOrderType } from "../../../types";

export interface TImagesGridProps {
  isSubmitting: boolean;
  images: TImages[];
  loadingImages: boolean;
  hasMore: boolean;
  values: {
    imageType: TImageType;
    order: TOrderType;
    searchPhoto?: string;
    lang: TLanguage;
  };
  setSeeMore: React.Dispatch<React.SetStateAction<boolean>>;
}
