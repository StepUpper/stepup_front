import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
type ButtonProps = ComponentPropsWithoutRef<"button">;
const Button = (props: ButtonProps) => {
  const { children, className, ...rest } = props;
  return (
    <>
      <button className={twMerge(`border`, className)} {...rest}>
        {children}
      </button>
    </>
  );
};
export default Button;
