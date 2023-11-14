import api from "../../../services/api";
import { TQueryParams } from "./types";

const getImages = (params: TQueryParams) => {
  const response = api.get("/images", { params });

  return response;
};

export { getImages };
