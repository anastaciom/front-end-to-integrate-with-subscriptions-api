import { Link } from "react-router-dom";
import { useUserData } from "../../../../hooks/store/userData";
import { logout } from "../../../../services/api/logout";
import { showError } from "../../../../utils/showError";
import { useAccessTokenStore } from "../../../../hooks/store/accessToken";

export const OptionsUser = () => {
  const userData = useUserData((state) => state.userData);
  const reset = useUserData((state) => state.reset);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  const options = [
    {
      label: "Config. da Conta",
      to: "/any", //TODO: SET PATHNAME
    },
    {
      label: "Pagamentos",
      to: "/any", //TODO: SET PATHNAME
    },
    {
      label: "Histórico de Pesquisa",
      to: "/any", //TODO: SET PATHNAME
    },
  ];

  const logoutUser = async () => {
    try {
      await logout();
      setAccessToken(null);
      reset();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div
      id="userDropdown"
      className="absolute top-full right-0 z-10 divide-y divide-divider rounded-lg shadow w-56 bg-secondary"
    >
      <div className="px-4 py-3 text-sm">
        <div className="truncate font-semibold">{userData?.name}</div>
        <div className="truncate">{userData?.email}</div>
      </div>
      <ul className="text-sm text-text">
        {options.map((option, index) => (
          <li key={index}>
            <Link
              to={option.to}
              className="block px-4 py-2 hover:bg-borderInput"
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
      <div
        onClick={logoutUser}
        className="text-error font-semibold hover:bg-borderInput tracking-wide cursor-pointer rounded-b-lg block px-4 py-2 text-sm"
      >
        Sair
      </div>
    </div>
  );
};
