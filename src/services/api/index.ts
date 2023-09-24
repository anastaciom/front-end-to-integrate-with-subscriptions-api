import axios from "axios";
import { showError } from "../../utils/showError";
import { refreshToken } from "./refreshToken";
import { getCookie, removeCookie, setCookie } from "../../utils/Cookies";
import { logout } from "./logout";

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
    setCookie({ key: "access_token", value: token });
  } else {
    removeCookie({ key: "access_token" });
  }
};

api.interceptors.request.use(
  (request) => {
    const token = getCookie({ key: "access_token" });
    setAuthorizationHeader(token, request);

    return request;
  },
  (error) => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.response?.status === 401) {
      //TODO: CREATE A DIALOG TO APPEAR TO THE USER, SOMETHING LIKE:
      // "TEMPO EXPIRADO, FAÇA O LOGIN NOVAMENTE";
      window.location.pathname = "/entrar";
    }

    showError(error);
  }
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response && error.response.status;
    const parsedResponse = JSON.parse(error.request.response);
    const errorMessage = parsedResponse.error || "";

    if (statusCode === 401 && errorMessage === "NO_REFRESH_TOKEN.") {
      try {
        await logout();
        setOrRemoveAccessTokenCookie(null);
        setAuthorizationHeader(null, originalRequest);

        window.location.pathname = "/entrar";
      } catch (error) {
        showError(error);
      }
    } else if (statusCode === 401 && originalRequest.url !== "/refresh-token") {
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
