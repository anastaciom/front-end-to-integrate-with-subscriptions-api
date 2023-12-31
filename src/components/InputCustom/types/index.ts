import { UseFormRegister } from "react-hook-form";

export interface IInputCustomProps {
  label?: string;
  fieldName: string;
  error?: string;
  isPasswordField?: boolean;
  inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name">;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  labelTextSize?:
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
}
