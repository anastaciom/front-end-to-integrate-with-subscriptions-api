import api from ".";

const logout = () => {
  const response = api.get("sign-out", {
    withCredentials: true,
  });

  return response;
};

export { logout };
