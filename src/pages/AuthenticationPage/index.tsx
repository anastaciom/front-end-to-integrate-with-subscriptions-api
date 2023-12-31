import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormSchema, formSchema } from "./validate";
import { InputCustom } from "../../components/InputCustom";
import { createAccount, login } from "./api";
import { TCreateAccountParams, TLoginParams } from "./api/types";
import { showError } from "../../utils/showError";
import { useNavigate } from "react-router-dom";
import { useAccessTokenStore } from "../../hooks/accessToken";
import { SelectAvatar } from "./components/SelectAvatar";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://api.dicebear.com/7.x/initials/svg?seed="
  );
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema(isRegistering)),
  });

  const fetchCreateAccount = async (
    data: TCreateAccountParams & {
      avatarUrl: string;
    }
  ) => {
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
      fetchCreateAccount({ ...data, avatarUrl });
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
          <div className="w-full h-20 flex justify-between">
            <p className="text-3xl font-bold text-text mb-8">
              {isRegistering ? "Cadastro" : "Login"}
            </p>

            {isRegistering && (
              <SelectAvatar
                fieldNameValue={watch().name}
                setAvatar={setAvatarUrl}
                avatarUrl={avatarUrl}
              />
            )}
          </div>

          {isRegistering && (
            <InputCustom
              fieldName="name"
              label="Nome"
              register={register}
              error={errors.name && errors.name.message}
              inputProps={{
                className: "w-full p-2.5 rounded-lg",
                type: "text",
              }}
            />
          )}
          <InputCustom
            fieldName="email"
            label="E-mail"
            register={register}
            error={errors.email && errors.email.message}
            inputProps={{
              className: "w-full p-2.5 rounded-lg",
              type: "email",
            }}
          />
          <InputCustom
            fieldName="password"
            label="Senha"
            register={register}
            isPasswordField
            error={errors.password && errors.password.message}
            inputProps={{
              className: "w-full p-2.5 rounded-lg",
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
            className="text-buttonPrimary ml-1 font-semibold"
          >
            {isRegistering ? "Faça o login." : "Cadastre-se."}
          </button>
        </p>
      </div>
    </div>
  );
};

export { AuthenticationPage };
