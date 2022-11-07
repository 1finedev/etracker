import { useForm } from "./";
import Input from "../InputBase";

export default function FormInput({ input, ...others }) {
  const { field, placeholder, label, type, icon } = input;
  const { values, errors, updateValue } = useForm();

  return (
    <div className="flex flex-col gap-y-[5px] md:gap-y-1">
      {label !== "" && (
        <div className="capitalize font-medium text-sm md:text-base">
          {label}:
        </div>
      )}
      <Input
        intent={!!errors[field] ? 'error' : 'primary' }
        icon={icon}
        value={values[field] || ""}
        onChange={(e) => updateValue(field, e.target.value)}
        placeholder={placeholder}
        type={type}
        {...others}
      />
    </div>
  );
}
