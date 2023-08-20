import { PlansPage } from "../../pages/Plans";
import { AuthenticationPage } from "../../pages/AuthenticationPage";
import { TPathsProps } from "./types";
import { Protected } from "./PrivateRoute";

const paths: Array<TPathsProps> = [
  {
    path: "/",
    element: <AuthenticationPage />,
  },

  {
    path: "/plans",
    element: (
      <Protected>
        <PlansPage />
      </Protected>
    ),
  },
];

export { paths };
