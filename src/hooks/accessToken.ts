import { create } from "zustand";
import { getCookie, removeCookie, setCookie } from "../utils/Cookies";

type TState = {
  accessToken: string | null;
  setAccessToken: (newAccessToken: string | null) => void;
};

const useAccessTokenStore = create<TState>((set) => ({
  accessToken: getCookie({ key: "access_token" }),

  setAccessToken: (newAccessToken: string | null) => {
    if (newAccessToken) {
      setCookie({ key: "access_token", value: newAccessToken });
    } else {
      removeCookie({ key: "access_token" });
    }

    set(() => ({ accessToken: newAccessToken }));
  },
}));

export { useAccessTokenStore };
