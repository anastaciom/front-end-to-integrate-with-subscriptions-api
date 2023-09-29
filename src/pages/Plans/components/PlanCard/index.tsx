import { formatCurrency } from "../../../../utils/formatPrice";
import { IPlanCard } from "./types";
import { cardColor } from "./style";
import { createSession } from "../../api";
import { toast } from "react-toastify";

const PlanCard = ({
  colorName,
  priceId,
  name,
  price,
  featuresList,
}: IPlanCard) => {
  const sortedFeaturesList = featuresList.sort(
    (a, b) => Number(a.disabled) - Number(b.disabled)
  );

  const goToCheckout = async (priceId: string) => {
    try {
      const { data } = await createSession({ priceId });

      window.location.href = data.url;
    } catch (error) {
      toast.error("Erro ao redirecionar para o checkout.");
    }
  };

  return (
    <div
      className={`${cardColor[colorName].card} w-full md:w-auto max-w-sm p-4 rounded-lg shadow sm:p-8 `}
    >
      <h5 className={`mb-4 text-xl font-medium ${cardColor[colorName].text}`}>
        Plano {name}
      </h5>
      <div className={`flex items-baseline ${cardColor[colorName].text}`}>
        <span className="text-2xl font-semibold">R$</span>
        <span className="text-4xl font-extrabold tracking-tight">
          {formatCurrency(price).split("$")[1]}
        </span>
        <span className="ml-1 text-xl text-gray-400">/month</span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        {sortedFeaturesList.map((item, index) => (
          <li
            key={`${item.name}-${index}`}
            className={`${
              item.disabled
                ? "flex space-x-3 line-through decoration-secondary"
                : "flex space-x-3 items-center"
            }`}
          >
            <svg
              className={`${
                item.disabled
                  ? "flex-shrink-0 w-4 h-4 text-secondary"
                  : "flex-shrink-0 w-4 h-4 text-buttonPrimary"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span
              className={`${
                item.disabled
                  ? "text-base font-normal leading-tight text-gray-400"
                  : "text-base font-normal leading-tight text-gray-400"
              }`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => goToCheckout(priceId)}
        className={`w-full mt-4 py-2 rounded-lg ${cardColor[colorName].button}`}
      >
        Assinar
      </button>
    </div>
  );
};

export { PlanCard };
