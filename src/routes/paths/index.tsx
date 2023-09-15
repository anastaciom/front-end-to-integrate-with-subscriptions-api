import { PlansPage } from "../../pages/Plans";
import { AuthenticationPage } from "../../pages/AuthenticationPage";
import { Navigate, RouteObject } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { LoadingWrapper } from "./Loader";
import { CheckAuth } from "./CheckAuth";
import { LayoutPage } from "../../components/Layout";
import { MePage } from "../../pages/Me";
import { Page404 } from "../../pages/errors/404";
import { Content } from "../../components/Layout/Content";

const paths: Array<RouteObject> = [
  { errorElement: <Page404 isOutletRoute={false} /> },
  {
    loader: () => <LoadingWrapper />,
  },
  {
    path: "/entrar",
    element: (
      <CheckAuth>
        <AuthenticationPage />
      </CheckAuth>
    ),
  },
  {
    path: "/plans",
    element: (
      <PrivateRoute>
        <PlansPage />
      </PrivateRoute>
    ),
  },

  {
    path: "/",
    element: (
      <LayoutPage>
        <Content />
      </LayoutPage>
    ),

    children: [
      {
        path: "/",
        element: <Navigate to="/me" />,
      },
      {
        path: "/me",
        element: (
          //TODO: SET CORRECT ROLES
          <PrivateRoute roles={["USER_PREMIUM"]}>
            <MePage />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export { paths };
