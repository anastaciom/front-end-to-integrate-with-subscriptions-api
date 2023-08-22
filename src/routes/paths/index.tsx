import { PlansPage } from "../../pages/Plans";
import { AuthenticationPage } from "../../pages/AuthenticationPage";
import { TPathsProps } from "./types";
import { Protected } from "./PrivateRoute";
import { CheckAuthentication } from "./CheckAuthentication";

const paths: Array<TPathsProps> = [
  {
    path: "/",
    element: (
      <CheckAuthentication>
        <AuthenticationPage />
      </CheckAuthentication>
    ),
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
