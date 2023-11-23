import { ISelectCustomProps } from "./types";

const SelectCustom = ({
  inputProps,
  fieldName,
  error,
  label,
  options,
  register,
  optionPlaceholder,
  labelTextSize,
}: ISelectCustomProps) => {
  const labelText = labelTextSize ? `text-${labelTextSize}` : "text-md";

  return (
    <div className={"block"}>
      {label && (
        <label htmlFor={fieldName} className={`block text-text ${labelText}`}>
          {label}
        </label>
      )}
      <select
        id={fieldName}
        className={`${inputProps.className} bg-bgInput text-text border-2 ${
          error
            ? "border-error focus:border-error shake"
            : "border-borderInput focus:border-borderFocus"
        } outline-none focus:ring-0`}
        {...register(fieldName)}
      >
        {optionPlaceholder && <option disabled>{optionPlaceholder}</option>}
        {options.map(({ value, label }, index) => (
          <option
            key={`option-${index}-${label}`}
            value={value}
            className="font-semibold"
          >
            {label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
};

export { SelectCustom };
