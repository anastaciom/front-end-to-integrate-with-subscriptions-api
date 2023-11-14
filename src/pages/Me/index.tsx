import { zodResolver } from "@hookform/resolvers/zod";
import { TSearchSchema, searchSchema } from "./components/Form/validate";
import { useForm } from "react-hook-form";
import { getImages } from "./api";
import { useEffect, useState } from "react";
import { showError } from "../../utils/showError";
import { TDialog, TImages } from "./types";
import { handleCountFormatting } from "../../utils/CountFormatting";
import { Form } from "./components/Form";
import { PlanDialog } from "./components/PlanDialog";
import { ImagesGrid } from "./components/ImagesGrid";

export const MePage = () => {
  const [images, setImages] = useState<TImages[]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [changePhotoListingOrder, setChangePhotoListingOrder] =
    useState<boolean>(false);
  const [dialogData, setDialogData] = useState<TDialog>({
    isShow: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, defaultValues, isSubmitting },
  } = useForm<TSearchSchema>({
    defaultValues: {
      imageType: "all",
      order: "latest",
      searchPhoto: "",
    },
    resolver: zodResolver(searchSchema),
  });
  const filterType = watch("order");
  const { imageType, order, searchPhoto } = getValues();

  useEffect(() => {
    fetchImages({ ...defaultValues, pageNum: page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seeMore) {
      fetchImages({ imageType, order, searchPhoto, pageNum: page + 1 });
      setPage((prevPage) => prevPage + 1);
      setSeeMore(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeMore]);

  useEffect(() => {
    if (changePhotoListingOrder) {
      setImages([]);
      setHasMore(false);
      fetchImages({ imageType, order, searchPhoto, pageNum: 1 });
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, changePhotoListingOrder]);

  const fetchImages = async ({
    order,
    searchPhoto,
    imageType,
    pageNum = 1,
  }: TSearchSchema & {
    pageNum: number;
  }) => {
    const hasSearch = searchPhoto?.trim() && { q: searchPhoto?.trim() };

    try {
      setLoadingImages(true);

      const { data } = await getImages({
        page: pageNum,
        order: order ?? "latest",
        per_page: 20,
        ...hasSearch,
        image_type: imageType ?? "all",
        lang: "pt",
      });

      const formattedData = data.map(({ views, ...rest }: TImages) => ({
        ...rest,
        views: handleCountFormatting(views),
      }));

      setImages((prevData) => [...prevData, ...formattedData]);
      setHasMore(data.length === 20);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setHasMore(false);

      if (error?.response?.status === 403) {
        setDialogData({ isShow: true, message: error?.response.data.error });
      } else {
        showError(error);
      }
    } finally {
      setLoadingImages(false);
    }
  };

  const resetFilters = () => {
    setHasMore(false);
    setPage(1);
    setImages([]);
  };

  const onSubmit = ({ imageType, order, searchPhoto }: TSearchSchema) => {
    resetFilters();

    return fetchImages({ imageType, order, searchPhoto, pageNum: 1 });
  };

  const changeFilter = (newFilterType: "popular" | "latest") => {
    setValue("order", newFilterType);
    setChangePhotoListingOrder(true);
  };

  return (
    <>
      <PlanDialog dialogData={dialogData} setDialogData={setDialogData} />
      <div className="w-full mt-10">
        <Form
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          changeFilter={changeFilter}
          onSubmit={onSubmit}
          filterType={filterType}
        />
        <ImagesGrid
          isSubmitting={isSubmitting}
          images={images}
          loadingImages={loadingImages}
          hasMore={hasMore}
          values={{ imageType, order, searchPhoto }}
          setSeeMore={setSeeMore}
        />
      </div>
    </>
  );
};
