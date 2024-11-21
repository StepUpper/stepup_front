import { ComponentPropsWithRef, forwardRef } from "react";

import Button from "@common/html/Button";
import { twMerge } from "tailwind-merge";

interface BottomButtonProps extends ComponentPropsWithRef<"button"> {
  title: string;
  className?: string;
}

const BottomButton = forwardRef<HTMLButtonElement, BottomButtonProps>(
  ({ title, className, ...rest }, ref) => {
    return (
      <>
        <Button
          ref={ref}
          className={twMerge(
            "my-6 w-full rounded bg-black px-3.5 py-3.5 text-white",
            className
          )}
          {...rest}
        >
          {title}
        </Button>
      </>
    );
  }
);

BottomButton.displayName = "BottomButtong";
export default BottomButton;
