import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormSchema, formSchema } from "./validate";
import { InputCustom } from "../../components/InputCustom";
import { createAccount, login } from "./api";
import { TCreateAccountParams, TLoginParams } from "./api/types";
import { showError } from "../../utils/showError";
import { useNavigate } from "react-router-dom";
import { useAccessTokenStore } from "../../hooks/store/accessToken";

const AuthenticationPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema(isRegistering)),
  });

  const fetchCreateAccount = async (data: TCreateAccountParams) => {
    try {
      setLoading(true);

      const response = await createAccount(data);
      const {
        data: { accessToken: responseToken },
      } = response;

      setAccessToken(responseToken);
      navigate("/plans", { replace: true });
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogin = async (data: TLoginParams) => {
    try {
      setLoading(true);

      const response = await login(data);
      const {
        data: { accessToken: responseToken },
      } = response;

      setAccessToken(responseToken);
      navigate("/plans", { replace: true });
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: TFormSchema) => {
    if (isRegistering) {
      fetchCreateAccount(data);
    } else {
      fetchLogin(data);
    }
  };

  const handleBtnText = () => {
    if (loading) {
      return "Carregando...";
    }

    if (isRegistering) {
      return "Registrar";
    } else {
      return "Entrar";
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 bg-secondary rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <p className="text-3xl font-bold text-text mb-8">
            {isRegistering ? "Cadastro" : "Login"}
          </p>

          {isRegistering && (
            <InputCustom
              fieldName="name"
              label="Nome"
              error={errors.name && errors.name.message}
              inputProps={{
                className: "w-full p-2.5 rounded-lg",
                ...register("name"),
                type: "text",
              }}
            />
          )}
          <InputCustom
            fieldName="email"
            label="E-mail"
            error={errors.email && errors.email.message}
            inputProps={{
              className: "w-full p-2.5 rounded-lg",
              ...register("email"),
              type: "email",
            }}
          />
          <InputCustom
            fieldName="password"
            label="Senha"
            isPasswordField
            error={errors.password && errors.password.message}
            inputProps={{
              className: "w-full p-2.5 rounded-lg",
              ...register("password"),
              type: "password",
            }}
          />

          <button
            type="submit"
            className="w-full bg-buttonPrimary py-3 rounded-lg mt-12"
          >
            {handleBtnText()}
          </button>
        </form>
        <p className="mt-4 text-text text-right">
          {isRegistering ? "Já tem uma conta?" : "Ainda não tem conta?"}
          <button
            onClick={() =>
              setIsRegistering((prevIsRegistering) => !prevIsRegistering)
            }
            className="text-buttonSecondary ml-1 font-semibold"
          >
            {isRegistering ? "Faça o login." : "Cadastre-se."}
          </button>
        </p>
      </div>
    </div>
  );
};

export { AuthenticationPage };
