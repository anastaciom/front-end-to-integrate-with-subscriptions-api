import axios from "axios";
import { showError } from "../utils/showError";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const setBearerToken = (token: string) => {
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("is_auth", "true");
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

      return newAccessToken;
    } else {
      return null;
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

      const newToken = await refreshToken();

      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return api(originalRequest);
      } else {
        localStorage.removeItem("is_auth");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
