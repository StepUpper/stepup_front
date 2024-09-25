import { ComponentPropsWithRef, forwardRef } from "react";

import Button from "@common/html/Button";

interface BottomButtonProps extends ComponentPropsWithRef<"button"> {
  title: string;
}

const BottomButton = forwardRef<HTMLButtonElement, BottomButtonProps>(
  ({ title, ...rest }, ref) => {
    return (
      <>
        <Button
          ref={ref}
          className="my-6 w-full rounded bg-black px-3.5 py-6 text-white"
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
