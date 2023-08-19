import { createContext, useContext, ReactNode, useState } from "react";
import { setBearerToken } from "../services/api";

interface AuthContextProps {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  accessToken: "",
  setAccessToken: Function,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>("");

  if (accessToken) {
    setBearerToken(accessToken);
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext<AuthContextProps>(AuthContext);

  return context;
};
