import api from "../../../services/api";
import { TCreateSessionProps } from "./types";

const fetchAllPlans = () => {
  const response = api.get("/plans");

  return response;
};

const createSession = (params: TCreateSessionProps) => {
  const response = api.post("/session", params);

  return response;
};

export { fetchAllPlans, createSession };
