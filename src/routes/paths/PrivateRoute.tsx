import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

type Props = {
  children: JSX.Element;
};

export const Protected: React.FC<Props> = ({ children }) => {
  return useLogout() ? children : <Navigate to={"/"} replace />;
};
