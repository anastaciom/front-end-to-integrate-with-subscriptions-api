import api from "../../../services/api";
import { TCreateAccountProps } from "./types";

const createAccount = (params: TCreateAccountProps) => {
  const response = api.post("/sign-up", params, { withCredentials: true });

  return response;
};

export { createAccount };
