import { Search } from "lucide-react";
import { InputCustom } from "../../../../components/InputCustom";
import { Tabs } from "../Tabs";
import { TFormProps } from "./types";
import { Filter } from "../Filter";

const Form = ({
  register,
  handleSubmit,
  errors,
  changeFilter,
  onSubmit,
  filterType,
  isDirty,
  resetFilter,
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
        <div className="relative w-full">
          <InputCustom
            register={register}
            fieldName="searchPhoto"
            inputProps={{
              className: "w-full p-2.5 rounded-lg ",
              placeholder: "Buscar",
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
        <Filter
          errors={errors}
          isDirty={isDirty}
          register={register}
          resetFilter={resetFilter}
        />
      </div>
    </form>
  );
};

export { Form };
