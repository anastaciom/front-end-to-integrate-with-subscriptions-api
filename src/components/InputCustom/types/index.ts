export interface IInputCustomProps {
  label?: string;
  fieldName: string;
  error?: string;
  isPasswordField?: boolean;
  inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">;
}
