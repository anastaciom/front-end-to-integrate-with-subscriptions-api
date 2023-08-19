import axios from "axios";
import { showError } from "../utils/showError";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const setBearerToken = (token: string) => {
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
};

async function refreshToken() {
  try {
    const { data } = await api.get("/refresh-token", {
      withCredentials: true,
    });

    const newAccessToken = data.accessToken;

    if (newAccessToken) {
      setBearerToken(newAccessToken);
    }
  } catch (error) {
    showError(error);
  }
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response && error.response.status;

    if (
      statusCode === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh-token"
    ) {
      originalRequest._retry = true;

      await refreshToken();

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
