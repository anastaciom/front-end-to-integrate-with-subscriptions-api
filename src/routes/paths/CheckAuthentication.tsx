import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

type Props = {
  children: JSX.Element;
};

export const CheckAuthentication: React.FC<Props> = ({ children }) => {
  return useLogout() ? <Navigate to={"/plans"} replace /> : children;
};
