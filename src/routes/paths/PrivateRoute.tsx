import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export const Protected: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("is_auth")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("is_auth"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return isAuthenticated ? children : <Navigate to={"/"} replace />;
};
