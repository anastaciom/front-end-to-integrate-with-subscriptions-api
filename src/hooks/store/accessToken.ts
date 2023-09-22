import { create } from "zustand";
import { getCookie, removeCookie, setCookie } from "../../utils/Cookies";

type TState = {
  accessToken: string | null;
  setAccessToken: (newAccessToken: string | null) => void;
};

const useAccessTokenStore = create<TState>((set) => ({
  accessToken: getCookie({ key: "accessToken" }),

  setAccessToken: (newAccessToken: string | null) => {
    if (newAccessToken) {
      setCookie({ key: "accessToken", value: newAccessToken });
    } else {
      removeCookie({ key: "accessToken" });
    }

    set(() => ({ accessToken: newAccessToken }));
  },
}));

export { useAccessTokenStore };
