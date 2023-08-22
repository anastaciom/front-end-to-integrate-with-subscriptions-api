import { useEffect } from "react";
import { refreshToken } from "../services/api/refreshToken";
import { setBearerToken } from "../services/api";
import { useAuth } from "./useAuth";
import { useLocation } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { logout } from "../services/api/logout";
import { showError } from "../utils/showError";

export const useLogout = () => {
  const isAuthenticated = useReadLocalStorage("is_auth");
  const { pathname } = useLocation();
  const { setAccessToken } = useAuth();

  useEffect(() => {
    const fetchApi = async () => {
      if (!isAuthenticated && pathname !== "/") {
        setBearerToken("");
        setAccessToken("");

        try {
          await logout();
          await refreshToken();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.response && error.response.status !== 401) {
            showError(error);
          }
        }
      }
    };
    fetchApi();
  }, [isAuthenticated, pathname]);

  return isAuthenticated;
};
