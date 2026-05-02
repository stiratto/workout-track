import { clsx } from "clsx";

interface InputProps {
  name: string;
  placeholder?: string;
  value?: string;
  onInput?: (e: Event) => void;
  onFocusOut?: () => void;
  className?: string;
}

export const Input = ({ onFocusOut, name, placeholder, value, onInput, className }: InputProps) => {
  return (
    <input
      name={name}
      onFocusOut={onFocusOut}
      placeholder={placeholder}
      value={value}
      onInput={onInput}
      class={clsx("px-2 py-4 border border-dashed w-full mt-2", className)}
    />
  );
};
