import { zodResolver } from "@hookform/resolvers/zod";
import { TSearchSchema, searchSchema } from "./components/Form/validate";
import { useForm } from "react-hook-form";
import { getImages } from "./api";
import { useEffect, useState } from "react";
import { showError } from "../../utils/showError";
import { TDialog, TImages, TOrderType } from "./types";
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
    resetField,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TSearchSchema>({
    defaultValues: {
      imageType: "all",
      order: "latest",
      searchPhoto: "",
      lang: "pt",
    },
    resolver: zodResolver(searchSchema),
  });
  const filterType = watch("order");

  useEffect(() => {
    const { imageType, order, searchPhoto, lang } = getValues();

    fetchImages({ imageType, lang, order, searchPhoto, pageNum: page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { imageType, order, searchPhoto, lang } = getValues();

    if (seeMore) {
      fetchImages({ imageType, order, searchPhoto, lang, pageNum: page + 1 });
      setPage((prevPage) => prevPage + 1);
      setSeeMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeMore]);

  useEffect(() => {
    if (changePhotoListingOrder) {
      handleSubmit((data) => onSubmit(data))();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, changePhotoListingOrder]);

  const fetchImages = async ({
    order,
    searchPhoto,
    imageType,
    pageNum = 1,
    lang,
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
        lang,
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

  const onSubmit = ({ imageType, order, searchPhoto, lang }: TSearchSchema) => {
    resetFilters();

    return fetchImages({ imageType, order, searchPhoto, lang, pageNum: 1 });
  };

  const changeFilter = (newFilterType: TOrderType) => {
    setValue("order", newFilterType);
    setChangePhotoListingOrder(true);
  };

  return (
    <>
      <PlanDialog dialogData={dialogData} setDialogData={setDialogData} />
      <div className="w-full mt-10">
        <Form
          resetFilter={resetField}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          changeFilter={changeFilter}
          onSubmit={onSubmit}
          filterType={filterType}
          isDirty={isDirty}
        />
        <ImagesGrid
          isSubmitting={isSubmitting}
          images={images}
          loadingImages={loadingImages}
          hasMore={hasMore}
          values={getValues()}
          setSeeMore={setSeeMore}
        />
      </div>
    </>
  );
};
