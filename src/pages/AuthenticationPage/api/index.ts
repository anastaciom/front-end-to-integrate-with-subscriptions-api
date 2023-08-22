import api from "../../../services/api";
import { TCreateAccountParams, TLoginParams } from "./types";

const createAccount = (params: TCreateAccountParams) => {
  const response = api.post("/sign-up", params, { withCredentials: true });

  return response;
};

const login = (params: TLoginParams) => {
  const response = api.post("/sign-in", params, { withCredentials: true });

  return response;
};

export { createAccount, login };
