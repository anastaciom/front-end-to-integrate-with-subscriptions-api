import { TImages } from "../../../types";

export interface TImagesGridProps {
  isSubmitting: boolean;
  images: TImages[];
  loadingImages: boolean;
  hasMore: boolean;
  values: {
    imageType: "all" | "photo" | "illustration" | "vector" | undefined;
    order: "popular" | "latest" | undefined;
    searchPhoto: string | undefined;
  };
  setSeeMore: React.Dispatch<React.SetStateAction<boolean>>;
}
