import { Shell } from "lucide-react";
import { useLocation } from "react-router-dom";

export const Loading = () => {
  const { pathname } = useLocation();

  const className =
    pathname === "/plans"
      ? "flex items-center justify-center h-screen w-screen"
      : "flex items-center justify-center h-full w-full";

  return (
    <span className={className}>
      <span className="flex flex-col items-center justify-center">
        <Shell size={80} />
        <h1 className="text-2xl tracking-widest font-semibold">
          Carregando...
        </h1>
      </span>
    </span>
  );
};
