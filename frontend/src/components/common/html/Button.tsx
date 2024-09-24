import { forwardRef } from "react";
import { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <>
        <button ref={ref} className={className} {...rest}>
          {children}
        </button>
      </>
    );
  }
);

export default Button;
