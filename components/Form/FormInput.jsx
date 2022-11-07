import { useForm } from "./";
import Input from "../InputBase";

export default function FormInput({ input, ...others }) {
  const { field, placeholder, label, type } = input;
  const { values, errors, updateValue } = useForm();

  return (
    <div className="flex flex-col gap-y-0.5 md:gap-y-1">
      {label !== "" && (
        <div className="capitalize font-medium text-sm md:text-base">
          {label}:
        </div>
      )}
      <Input
        value={values[field] || ""}
        onChange={(e) => updateValue(field, e.target.value)}
        placeholder={placeholder}
        type={type}
        {...others}
      />

      <div className="text-red-500 text-[10px] md:text-xs italic">
        {errors[field] || ""}
      </div>
    </div>
  );
}
