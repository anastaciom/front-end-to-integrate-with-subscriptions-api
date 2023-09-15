import React from "react";
import { useAccessTokenStore } from "../../hooks/store/accessToken";
import { useUserData } from "../../hooks/store/userData";

type Props = {
  titleError: string;
  errorBody: string;
};

export const ErrorPage: React.FC<Props> = ({ titleError, errorBody }) => {
  const token = useAccessTokenStore((state) => state.accessToken);
  const userData = useUserData((state) => state.userData);

  const uri = () => {
    if (!token && !userData) {
      return { label: "Login/Registro", to: "/entrar" };
    } else if (token && userData?.subscription) {
      return { label: "Página Inicial", to: "/me" };
    } else {
      return { label: "A escolha de Planos", to: "/plans" };
    }
  };

  return (
    <div className="h-[50%] w-[40%] p-6 bg-secondary rounded-lg shadow-lg">
      <div className="flex justify-center items-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-error"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold mb-4 text-center ">
        {titleError}
      </h1>
      <p className="text-center mb-4 text-lg">{errorBody}</p>
      <div className="flex justify-center mt-8">
        <a
          href={uri().to}
          className="px-6 py-3 text-text bg-background rounded hover:bg-black focus:outline-none"
        >
          {`Retornar para ${uri().label}`}
        </a>
      </div>
    </div>
  );
};
