import { memo } from "react";
import { ITabsProps, TTabs } from "./types";
import { TOrderType } from "../../types";

const TABS: TTabs[] = [
  {
    nome: "latest",
    title: "Recentes",
    className: "rounded-l-lg",
  },
  {
    nome: "popular",
    title: "Populares",
    className: "rounded-r-lg",
  },
];

const Tabs = memo(
  ({ registerFieldInForm, filterType, changeFilter }: ITabsProps) => {
    const handleButtonClick = (nome: TOrderType) => {
      if (filterType !== nome) {
        changeFilter(nome);
      }
    };

    return (
      <div className="lg:w-1/2 w-4/5 rounded-lg shadow-2xl">
        <ul className="text-sm font-medium text-center divide-x divide-divider flex">
          {TABS.map(({ nome, title, className }) => (
            <li className="w-full" key={nome}>
              <button
                type="button"
                {...registerFieldInForm("order")}
                className={`inline-block w-full p-4 focus:outline-none transition-colors ease-in-out ${
                  filterType === nome
                    ? "bg-buttonPrimary"
                    : filterType !== nome
                    ? "hover:bg-secondary"
                    : ""
                } ${className}`}
                onClick={() => handleButtonClick(nome)}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export { Tabs };
