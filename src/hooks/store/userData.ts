import { create } from "zustand";
import api from "../../services/api";
import { showError } from "../../utils/showError";
import { getCookie } from "../../utils/Cookies";

interface IUserData {
  avatarUrl: string | null;
  email: string;
  name: string;
  authorizations: string[];
  subscription?: string;
}

type TState = {
  userData: IUserData | null;
  loading: boolean;
  init: () => Promise<void>;
  reset: () => void;
};

const useUserData = create<TState>((set) => ({
  userData: null,
  loading: false,

  reset: () => set(() => ({ loading: false, userData: null })),

  init: async () => {
    const tokenFromCookie = getCookie({ key: "access_token" });

    if (tokenFromCookie && window.location.pathname !== "/entrar") {
      try {
        set(() => ({ loading: true }));

        const { data } = await api.get("/me");

        set(() => ({ userData: data }));
      } catch (error) {
        showError(error);
      } finally {
        set(() => ({ loading: false }));
      }
    }
  },
}));

export { useUserData };
