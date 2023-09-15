import { ErrorPage } from "..";

type AccessDeniedPageProps = {
  isOutletRoute: boolean;
};

export const AccessDeniedPage = ({ isOutletRoute }: AccessDeniedPageProps) => {
  const className = () => {
    if (isOutletRoute) {
      return "h-full w-full flex flex-col justify-center items-center bg-background";
    } else {
      return "h-screen w-screen flex flex-col justify-center items-center bg-background";
    }
  };

  return (
    <div className={className()}>
      <ErrorPage
        errorBody="Você não tem permissão para acessar esta página. Entre em contato com o administrador."
        titleError=" Acesso Negado"
      />
    </div>
  );
};
