import { PlansPage } from "../../pages/Plans";
import { WelcomePage } from "../../pages/Welcome";
import { TPathsProps } from "./types";

const paths: Array<TPathsProps> = [
  {
    path: "/",
    element: <WelcomePage />,
  },

  {
    path: "/plans",
    element: <PlansPage />,
  },
];

export { paths };
