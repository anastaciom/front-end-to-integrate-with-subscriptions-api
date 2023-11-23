import { Download, Eye, Star, User } from "lucide-react";
import { useState, memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IImageProps } from "./types";

const Image = memo(
  ({
    imageUrl,
    height,
    width,
    searchValue,
    userName,
    userPhoto,
    views,
  }: IImageProps) => {
    const [isImageLoaded, setImageLoaded] = useState<boolean>(false);
    const [showActions, setShowActions] = useState<boolean>(false);

    const handleImageLoaded = () => {
      setImageLoaded(true);
    };

    const handleMouseEnter = () => {
      setShowActions(true);
    };

    const handleMouseLeave = () => {
      setShowActions(false);
    };

    return (
      <figure
        className={`group w-[${width}] h-[${height}] relative rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:scale-105 select-none`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <LazyLoadImage
          alt={`Imagem referente a busca: ${searchValue}`}
          src={imageUrl}
          width={"100%"}
          height={"100%"}
          wrapperProps={{
            style: { transitionDelay: "2s" },
          }}
          effect="blur"
          onLoad={handleImageLoaded}
        />
        {isImageLoaded && showActions && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60" />
            <div className="p-4 absolute top-0 h-16 w-full flex items-center justify-between">
              <div className="flex items-center h-full w-1/2 gap-1">
                <span className="p-1 gap-1 h-full w-auto flex items-center justify-center">
                  <Eye size={20} /> {views}
                </span>
              </div>
              <div className="flex items-center h-full w-1/2 justify-end gap-2 ">
                <span className="cursor-pointer h-full hover:bg-black/60 w-12 flex items-center justify-center rounded-full">
                  <Download size={20} />
                </span>
                <span className="cursor-pointer h-full hover:bg-black/60 w-12 flex items-center justify-center rounded-full">
                  <Star size={20} />
                </span>
              </div>
            </div>
            <figcaption className="absolute bottom-0 p-4 flex justify-around items-center gap-2">
              {userPhoto ? (
                <img
                  className="w-10 h-10 rounded-full bg-bgInput border-borderFocus border-2"
                  src={userPhoto}
                  loading="lazy"
                  alt="Foto de perfil do autor da foto"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-bgInput border-borderFocus border-2 flex items-center justify-center">
                  <User />
                </div>
              )}
              <p className="font-semibold">{userName}</p>
            </figcaption>
          </>
        )}
      </figure>
    );
  }
);

export { Image };
