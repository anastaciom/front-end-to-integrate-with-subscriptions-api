import { InputCustom } from "../../components/InputCustom";

export const MePage = () => {
  return (
    <div className="w-full flex justify-center items-center mt-8 flex-col">
      <div className="w-2/4">
        <ul className="hidden text-sm font-medium text-center divide-x divide-divider rounded-lg shadow sm:flex ">
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4  bg-secondary rounded-l-lg active focus:outline-none"
              aria-current="page"
            >
              Em alta
            </a>
          </li>
          <li className="w-full">
            <a href="#" className="inline-block w-full p-4 focus:outline-none">
              Mais baixados
            </a>
          </li>
          <li className="w-full">
            <a href="#" className="inline-block w-full p-4 focus:outline-none">
              Mais favoritados
            </a>
          </li>
          <li className="w-full">
            <a href="#" className="inline-block w-full p-4 focus:outline-none">
              Recentes
            </a>
          </li>
        </ul>
      </div>
      <div className="w-2/4 mt-10">
        <InputCustom
          fieldName="name"
          inputProps={{
            className: "w-full p-2.5 rounded-lg",
            placeholder: "Buscar",
            type: "text",
          }}
        />
      </div>
    </div>
  );
};
