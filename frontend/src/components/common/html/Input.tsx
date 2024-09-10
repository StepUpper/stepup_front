import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  const { className, ...rest } = props;
  return (
    <>
      <input
        className={twMerge("border", className)}
        ref={ref}
        {...rest}
      ></input>
    </>
  );
});

Input.displayName = "Input";

export default Input;
