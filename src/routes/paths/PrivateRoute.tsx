import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAccessTokenStore } from "../../hooks/store/accessToken";
import { useUserData } from "../../hooks/store/userData";
import { Loading } from "../../components/Loading";
import { AccessDeniedPage } from "../../pages/errors/AccessDenied";
import { getCookie } from "../../utils/Cookies";
import { showError } from "../../utils/showError";
import { logout } from "../../services/api/logout";

type Props = {
  children: JSX.Element;
  roles?: string[];
};

export const PrivateRoute: React.FC<Props> = ({ children, roles }) => {
  const [isVerified, setIsVerified] = useState(false);
  const token = useAccessTokenStore((state) => state.accessToken);
  const userData = useUserData((state) => state.userData);
  const { pathname } = useLocation();

  const insideOutlet = () => {
    if (pathname === "/plans") {
      return false;
    }
    return true;
  };

  const checkIfYouHaveTheAccessTokenInTheCookie = async () => {
    if (pathname !== "/entrar" && token && !getCookie({ key: "accessToken" })) {
      try {
        await logout();
      } catch (error) {
        showError(error);
      }
    }
  };

  useEffect(() => {
    checkIfYouHaveTheAccessTokenInTheCookie();

    if (token && userData?.authorizations) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userData]);

  if (isVerified && !userData?.subscription && pathname !== "/plans") {
    return <Navigate to="/plans" replace />;
  }

  if (!isVerified && token) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/entrar" replace />;
  }

  if (roles && userData?.authorizations) {
    const hasAuthorization = userData.authorizations.some((role) =>
      roles.includes(role)
    );
    return hasAuthorization ? (
      children
    ) : (
      <AccessDeniedPage isOutletRoute={insideOutlet()} />
    );
  }

  return children;
};
