import Cookies from "js-cookie";

const setCookie = ({
  key,
  value,
  options,
}: {
  key: string;
  value: string;
  options?: {
    domain?: string;
    expires?: number | Date;
    path?: string;
    sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
    secure?: boolean;
  };
}) => {
  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  Cookies.set(
    key,
    value,
    key === "accessToken"
      ? {
          sameSite: "strict",
          expires: fiveDaysFromNow, // 5 days
          secure: false, //TODO: SET 'TRUE' IN PROD
        }
      : options
  );
};

const removeCookie = ({ key }: { key: string }) => {
  Cookies.remove(key);
};

const getCookie = ({ key }: { key: string }) => {
  return Cookies.get(key);
};

export { getCookie, removeCookie, setCookie };
