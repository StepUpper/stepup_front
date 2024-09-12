import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const Button = (props: ButtonProps) => {
  const { children, className, ...rest } = props;
  return (
    <>
      <button className={className} {...rest}>
        {children}
      </button>
    </>
  );
};
export default Button;
