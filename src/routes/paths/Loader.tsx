import React from "react";
import { useUserData } from "../../hooks/userData";

export const LoadingWrapper: React.FC = () => {
  const userData = useUserData((state) => state.userData);

  return !!userData;
};
