import api from ".";

const refreshToken = () => {
  const response = api.get("/refresh-token", {
    withCredentials: true,
  });

  return response;
};

export { refreshToken };
