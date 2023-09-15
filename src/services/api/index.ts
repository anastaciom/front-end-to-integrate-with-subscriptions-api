import axios from "axios";
import { showError } from "../../utils/showError";
import { refreshToken } from "./refreshToken";
import { getCookie, removeCookie, setCookie } from "../../utils/Cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

let isRefreshing: boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((req) => {
    if (token) {
      req.resolve(token);
    } else {
      req.reject(error);
    }
  });

  failedQueue = [];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setAuthorizationHeader = (token: string | null, requestConfig: any) => {
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
};

const setOrRemoveAccessTokenCookie = (token: string | null) => {
  if (token) {
    setCookie({ key: "accessToken", value: token });
  } else {
    removeCookie({ key: "accessToken" });
  }
};

api.interceptors.request.use(
  (request) => {
    const token = getCookie({ key: "accessToken" });
    setAuthorizationHeader(token ?? null, request);

    return request;
  },
  async (error) => {
    return error;
  }
);

const handleRefreshToken = async () => {
  try {
    const { data } = await refreshToken();

    const newAccessToken = data.accessToken;

    if (newAccessToken) {
      return newAccessToken;
    } else {
      return null;
    }
  } catch (error) {
    showError(error);

    return null;
  }
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response && error.response.status;

    if (statusCode === 401 && originalRequest.url !== "/refresh-token") {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await handleRefreshToken();
          setOrRemoveAccessTokenCookie(newToken);
          processQueue(null, newToken);
        } catch (err) {
          processQueue(err, null);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          setAuthorizationHeader(token as string, originalRequest);
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    return Promise.reject(error);
  }
);

export default api;
