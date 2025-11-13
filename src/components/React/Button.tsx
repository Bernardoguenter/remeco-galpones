import type { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  style?: "primary" | "secondary";
  type?: "submit" | "button";
}

export const Button = ({
  children,
  style = "primary",
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      className={`border px-4 py-2 border-slate-800 rounded w-full cursor-pointer ${
        style === "primary"
          ? "bg-slate-800 text-white hover:bg-slate-700"
          : "bg-white text-slate-800 hover:bg-stone-200"
      }`}>
      {children}
    </button>
  );
};
