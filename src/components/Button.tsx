import { clsx } from "clsx";

interface ButtonProps {
  children: preact.ComponentChildren;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export const Button = ({ children, type = "button", onClick, className }: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx("relative w-full border p-2 mt-2 hover-effect ", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
