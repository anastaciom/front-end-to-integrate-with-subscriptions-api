import { useEffect } from "react";
import { useAccessTokenStore } from "./hooks/accessToken";
import { useUserData } from "./hooks/userData";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function App() {
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  useEffect(() => {
    useUserData.getState().init();
  }, [accessToken]);

  return (
    <SkeletonTheme>
      <RouterProvider router={routes} />
      <ToastContainer theme="dark" position="bottom-right" />
    </SkeletonTheme>
  );
}
