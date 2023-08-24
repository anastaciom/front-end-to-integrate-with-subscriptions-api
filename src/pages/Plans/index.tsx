import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlanCard } from "./components/PlanCard";
import { IStatePlansProps } from "./types";
import { fetchAllPlans } from "./api";

const PlansPage = () => {
  const [plans, setPlans] = useState<Array<IStatePlansProps>>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);

  const fetchAllProducts = async () => {
    try {
      setLoadingPlans(true);

      const { data: plans } = await fetchAllPlans();

      setPlans(plans);
    } catch (error) {
      toast.error("Erro ao buscar os planos.");
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="sm:w-full sm:h-full md:w-screen md:h-screen md:flex md:justify-center md:items-center lg:px-20">
      <section className="p-8 bg-slate-800 md:rounded-lg shadow-md shadow-slate-900 ">
        {loadingPlans ? (
          <h1 className="text-2xl font-bold">Carregando...</h1>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-4">Escolha o seu plano</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  colorName={plan.themeColor}
                  description={plan.description}
                  name={plan.name}
                  price={plan.price}
                  priceId={plan.priceId}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export { PlansPage };
