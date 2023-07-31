import api from "../../../services/api";

const fetchAllPlans = () => {
  const response = api.get("/plans");

  return response;
};

export { fetchAllPlans };
