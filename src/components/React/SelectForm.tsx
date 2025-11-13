import { type ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  children: ReactNode;
  label: string;
}
export const SelectForm = ({ name, label, children }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name];
  return (
    <div className={`flex flex-col }`}>
      <label
        htmlFor="height"
        className="capitalize text-slate-800">
        {label}
      </label>
      <select
        {...register(name)}
        className="
          border border-slate-300 
          rounded-md 
          p-2 
          text-slate-800
          focus:outline-none 
          focus:ring-2 
          focus:ring-slate-600 
          focus:border-slate-600 
          transition 
          duration-150
        ">
        {children}
      </select>
      {errors[name] && (
        <span className="text-red-800 text-xs mt-1">
          {" "}
          {String((fieldError as any)?.message)}
        </span>
      )}
    </div>
  );
};
