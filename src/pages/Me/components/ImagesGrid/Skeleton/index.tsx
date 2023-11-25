import Masonry from "react-masonry-css";
import { breakpointColumnsObj } from "../helpers";
import SkeletonLib from "react-loading-skeleton";

const SkeletonGrid = () => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <SkeletonLib
          className="rounded-lg mb-4"
          key={index}
          count={1}
          height={520}
          highlightColor="#1F2937"
          baseColor="#374151"
        />
      ))}
    </Masonry>
  );
};

export { SkeletonGrid };
