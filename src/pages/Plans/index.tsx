import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlanCard } from "./components/PlanCard";
import { IStatePlansProps } from "./types";
import { fetchAllPlans } from "./api";
import { useUserData } from "../../hooks/store/userData";
import { useNavigate } from "react-router-dom";
import { LayoutPage } from "../../components/Layout";

const PlansPage = () => {
  const [plans, setPlans] = useState<Array<IStatePlansProps>>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const userData = useUserData.getState().userData;
  const navigate = useNavigate();

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
    if (userData?.subscription) {
      return navigate("/me", { replace: true });
    } else {
      fetchAllProducts();
    }
  }, []);

  return (
    <LayoutPage>
      <section className="h-[calc(100vh_-_5rem)] flex flex-col items-center overflow-y-auto">
        <div className="bg-secondary w-4/5 p-4 mt-10 rounded-2xl shadow-2xl">
          {loadingPlans ? (
            <h1 className="text-2xl font-bold flex items-center justify-center tracking-wide">
              Carregando planos disponíveis...
            </h1>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-4">
                Escolha o seu plano
              </h1>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {plans.map((plan) => (
                  <PlanCard
                    featuresList={plan.featuresList}
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
        </div>
      </section>
    </LayoutPage>
  );
};

export { PlansPage };
