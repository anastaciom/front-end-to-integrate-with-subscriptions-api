import { useState } from "react";
import "./style.css";
import { IInputCustomProps } from "./types";

const InputCustom = ({
  label,
  fieldName,
  error,
  isPasswordField = false,
  inputProps,
}: IInputCustomProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasPasswordValue, setHasPasswordValue] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasPasswordValue(!!event.target.value);
    inputProps.onChange?.(event);
  };

  const inputType = isPasswordField && showPassword ? "text" : inputProps.type;

  return (
    <div className={isPasswordField ? "relative" : "block"}>
      {label && (
        <label htmlFor={fieldName} className="block text-text text-md">
          {label}
        </label>
      )}
      <input
        {...inputProps}
        type={inputType}
        id={fieldName}
        className={`${inputProps.className} bg-bgInput text-text border-2 ${
          error
            ? "border-error focus:border-error shake"
            : "border-borderInput focus:border-borderFocus"
        } outline-none focus:ring-0`}
        onChange={isPasswordField ? handlePasswordChange : inputProps.onChange}
      />
      {isPasswordField && hasPasswordValue && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`${
            error ? "top-1/5 bottom-1/4" : "top-1/2 bottom-1/2"
          } absolute  right-3 transform -translate-y-1/2 text-text`}
        >
          {showPassword ? "Esconder" : "Mostrar"}
        </button>
      )}
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
};

export { InputCustom };
