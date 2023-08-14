import { PlansPage } from "../../pages/Plans";
import { AuthenticationPage } from "../../pages/AuthenticationPage";
import { TPathsProps } from "./types";

const paths: Array<TPathsProps> = [
  {
    path: "/",
    element: <AuthenticationPage />,
  },

  {
    path: "/plans",
    element: <PlansPage />,
  },
];

export { paths };
