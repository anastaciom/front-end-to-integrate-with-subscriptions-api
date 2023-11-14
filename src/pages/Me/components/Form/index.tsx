import { Search, SlidersHorizontal } from "lucide-react";
import { InputCustom } from "../../../../components/InputCustom";
import { Tabs } from "../Tabs";
import { TFormProps } from "./types";

const Form = ({
  register,
  handleSubmit,
  errors,
  changeFilter,
  onSubmit,
  filterType,
}: TFormProps) => {
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-center items-center flex-col"
    >
      <Tabs
        changeFilter={changeFilter}
        filterType={filterType}
        registerFieldInForm={register}
      />
      <div className="lg:w-1/2 w-4/5 h-20 flex items-center lg:gap-4 gap-2">
        <div className="relative lg:w-[95%] w-[90%]">
          <InputCustom
            fieldName="searchPhoto"
            inputProps={{
              className: "w-full p-2.5 rounded-lg ",
              placeholder: "Buscar",
              ...register("searchPhoto"),
              type: "text",
            }}
            error={errors.searchPhoto && errors.searchPhoto.message}
          />
          <button
            type="submit"
            className="absolute top-0 bottom-0 right-3.5 hover:bg-secondary/40 w-10 rounded-full my-1 flex items-center justify-center transition-all ease-in-out"
          >
            <Search className="text-buttonPrimary" />
          </button>
        </div>
        <button
          className="lg:w-[5%] w-[10%] hover:text-buttonPrimary transition-all ease-in-out"
          type="button"
        >
          {/*TODO: CREATE MORE FILTERS */}
          <SlidersHorizontal />
        </button>
      </div>
    </form>
  );
};

export { Form };
