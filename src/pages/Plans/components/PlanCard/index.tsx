import { formatCurrency } from "../../../../utils/formatPrice";
import { IPlanCard } from "./types";
import { cardColor } from "./style";

const PlanCard = ({
  colorName,
  description,
  priceId,
  name,
  price,
}: IPlanCard) => {
  const goToCheckout = (id: string) => {
    return console.log(id);
  };

  return (
    <div className={`${cardColor[colorName].card} p-6 rounded-lg h-96`}>
      <h2 className={`text-xl mb-4 ${cardColor[colorName].text}`}>
        Plano {name}
      </h2>
      <p className="text-gray-600 max-h-3/5 h-3/5">{description}</p>
      <div>
        <p className={`${cardColor[colorName].text} mt-4`}>
          {`${formatCurrency(price)}/mês`}
        </p>
        <button
          onClick={() => goToCheckout(priceId)}
          className={`w-full mt-4 py-2 rounded ${cardColor[colorName].button}`}
        >
          Assinar
        </button>
      </div>
    </div>
  );
};

export { PlanCard };
