import { useEffect } from "react";
import { useAccessTokenStore } from "./hooks/store/accessToken";
import { useUserData } from "./hooks/store/userData";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  useEffect(() => {
    useUserData.getState().init();
  }, [accessToken]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer theme="dark" position="bottom-right" />
    </>
  );
}
