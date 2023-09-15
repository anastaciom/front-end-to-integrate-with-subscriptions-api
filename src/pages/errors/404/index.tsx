import { ErrorPage } from "..";

type Page404Props = {
  isOutletRoute: boolean;
};

export const Page404 = ({ isOutletRoute }: Page404Props) => {
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
        errorBody="A página que você está procurando pode ter sido removido ou não está
          disponível no momento."
        titleError="404"
      />
    </div>
  );
};
