import { AxiosError } from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showError = (error: AxiosError | any) => {
  if (!error || !error.response) {
    return;
  }

  const { response } = error;

  if (response?.data?.errors) {
    response?.data.errors.forEach((errorMsg: string) => {
      toast.error(errorMsg);
    });
  } else if (response?.data?.error) {
    toast.error(response?.data.error);
  } else {
    toast.error("Erro interno, contate um administrador.");
  }
};

export { showError };
