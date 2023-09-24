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
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  Cookies.set(
    key,
    value,
    key === "access_token"
      ? {
          sameSite: "strict",
          expires: sevenDaysFromNow, // 7 days
          secure: false, //TODO: SET 'TRUE' IN PROD
        }
      : options
  );
};

const removeCookie = ({ key }: { key: string }) => {
  Cookies.remove(key);
};

const getCookie = ({ key }: { key: string }) => {
  return Cookies.get(key) ?? null;
};

export { getCookie, removeCookie, setCookie };
