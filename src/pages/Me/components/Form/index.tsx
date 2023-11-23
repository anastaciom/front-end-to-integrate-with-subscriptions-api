import { Filter, Search, X } from "lucide-react";
import { InputCustom } from "../../../../components/InputCustom";
import { Tabs } from "../Tabs";
import { TFormProps } from "./types";
import { Popover } from "@headlessui/react";
import { PopoverCustom } from "../../../../components/PopoverCustom";
import { SelectCustom } from "../../../../components/SelectCustom";
import { languageOptions } from "../../helpers/languageOptions";

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
  const handleResetFilters = () => {
    resetFilter("imageType");
    resetFilter("order");
    resetFilter("lang");
  };

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

        <Popover className="relative z-20 flex items-center justify-center">
          {({ close, open }) => (
            <PopoverCustom
              children={
                <div
                  className={`${
                    open && "bg-secondary"
                  } p-2 rounded-md hover:bg-secondary shadow-md shadow-slate-900  cursor-pointer`}
                >
                  <Filter />
                </div>
              }
              content={
                <div className="bg-background border-2 border-borderInput shadow-2xl shadow-black rounded-2xl p-4 max-w-sm w-96 mt-8 right-0 mx-auto absolute">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold tracking-wide">Filtro</h2>
                    <button
                      className=" hover:bg-secondary p-2 rounded-full"
                      onClick={() => close()}
                      type="button"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="mb-4">
                    <SelectCustom
                      fieldName="lang"
                      label="Linguagem"
                      labelTextSize="sm"
                      register={register}
                      optionPlaceholder="Escolha a Linguagem da Pesquisa"
                      options={languageOptions}
                      inputProps={{
                        className: "w-full p-1.5 rounded-lg",
                      }}
                      error={errors.lang && errors.lang.message}
                    />
                  </div>
                  <div className="mb-4">
                    <SelectCustom
                      fieldName="imageType"
                      label="Tipo da imagem"
                      labelTextSize="sm"
                      register={register}
                      optionPlaceholder="Escolha o Tipo da imagem"
                      options={[
                        { label: "Todos os tipos", value: "all" },
                        { label: "Vector", value: "vector" },
                        { label: "Ilustração", value: "illustration" },
                        { label: "Foto", value: "photo" },
                      ]}
                      inputProps={{
                        className: "w-full p-1.5 rounded-lg ",
                      }}
                      error={errors.imageType && errors.imageType.message}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      disabled={!isDirty}
                      onClick={() => {
                        handleResetFilters();
                        close();
                      }}
                      className="bg-buttonSecondary hover:bg-buttonSecondaryHover text-sm py-1 px-2 rounded  disabled:bg-gray-500 disabled:text-gray-600 disabled:border-none disabled:shadow-none"
                    >
                      Limpar
                    </button>
                    <button
                      onClick={() => close()}
                      className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-sm py-1 px-2 rounded"
                    >
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              }
            />
          )}
        </Popover>
      </div>
    </form>
  );
};

export { Form };
