import Masonry from "react-masonry-css";
import "./style.css";
import { BeatLoader } from "react-spinners";
import { Image } from "../Image";
import { TImagesGridProps } from "./types";
import { breakpointColumnsObj } from "./helpers";
import { SkeletonGrid } from "./Skeleton";

const ImagesGrid = ({
  isSubmitting,
  images,
  loadingImages,
  hasMore,
  values,
  setSeeMore,
}: TImagesGridProps) => {
  return (
    <div className="w-full pt-8 h-[calc(100vh_-_15.8rem)] overflow-y-scroll">
      {(values.imageType || values.order || values.searchPhoto) &&
      !loadingImages &&
      !images.length ? (
        <div className="w-full h-full flex justify-center items-center italic font-semibold">
          Nenhuma imagem encontrada
        </div>
      ) : (values.imageType || values.order || values.searchPhoto) &&
        isSubmitting &&
        loadingImages ? (
        <SkeletonGrid />
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {images.map((imageData, index) => {
            const { imageUrl } = imageData;

            return (
              <Image
                key={`${imageUrl}${index}`}
                {...imageData}
                searchValue={values.searchPhoto}
              />
            );
          })}
        </Masonry>
      )}
      {hasMore && (
        <div className="flex justify-center items-center w-full h-20 bg-gradient-to-t from-slate-900 to-transparent z-50">
          {loadingImages ? (
            <div className={`${loadingImages && "fixed bottom-0 mb-2"}`}>
              <BeatLoader color="#fff" size={28} />
            </div>
          ) : (
            <button
              onClick={() => setSeeMore(true)}
              className="p-1 bg-buttonSecondary rounded-lg px-2 text-xs border-none hover:bg-buttonSecondaryHover transition-colors"
            >
              Ver mais
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export { ImagesGrid };
