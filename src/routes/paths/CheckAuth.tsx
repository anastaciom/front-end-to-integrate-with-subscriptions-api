import { Navigate } from "react-router-dom";
import { useAccessTokenStore } from "../../hooks/store/accessToken";

type Props = {
  children: JSX.Element;
};

export const CheckAuth: React.FC<Props> = ({ children }) => {
  const token = useAccessTokenStore((state) => state.accessToken);

  if (!token) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};
