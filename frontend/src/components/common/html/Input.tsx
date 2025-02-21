import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentPropsWithoutRef<"input"> & { isErrored?: boolean };

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <>
      <input
        className={twMerge(
          "border text-body2 focus:border-grey-600",
          className,
          rest.isErrored && "border-red-300 text-red"
        )}
        ref={ref}
        {...rest}
      />
    </>
  );
});

Input.displayName = "Input";

export default Input;
