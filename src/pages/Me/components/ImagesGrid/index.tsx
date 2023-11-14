import Masonry from "react-masonry-css";
import "./style.css";
import { BeatLoader } from "react-spinners";
import { Image } from "../Image";
import { TImagesGridProps } from "./types";

const breakpointColumnsObj = {
  default: 4,
  1200: 2,
  992: 2,
  768: 1,
  576: 1,
};

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
          Nenhum item encontrado
        </div>
      ) : (values.imageType || values.order || values.searchPhoto) &&
        isSubmitting &&
        loadingImages ? (
        <div className="w-full h-full flex justify-center items-center">
          <BeatLoader color="#fff" size={28} />
        </div>
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
              className="p-1 bg-slate-900 rounded-lg px-2 text-xs border-none hover:bg-slate-600 transition-colors"
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
