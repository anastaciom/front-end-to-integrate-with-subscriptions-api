import { formatCurrency } from "../../../../utils/formatPrice";
import { IPlanCard } from "./types";
import { cardColor } from "./style";
import { createSession } from "../../api";
import { toast } from "react-toastify";

const PlanCard = ({
  colorName,
  description,
  priceId,
  name,
  price,
}: IPlanCard) => {
  const goToCheckout = async (priceId: string) => {
    try {
      const { data } = await createSession({ priceId });

      window.location.href = data.url;
    } catch (error) {
      toast.error("Erro ao redirecionar para o checkout.");
    }
  };

  return (
    <div className={`${cardColor[colorName].card} p-6 rounded-lg h-96`}>
      <h2 className={`text-xl mb-4 ${cardColor[colorName].text}`}>
        Plano {name}
      </h2>
      <p className={`${cardColor[colorName].text} max-h-3/5 h-3/5`}>
        {description}
      </p>
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
