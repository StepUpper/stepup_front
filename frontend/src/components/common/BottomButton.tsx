import Button from "@common/html/Button";
import { ComponentPropsWithoutRef } from "react";

interface BottomButtonProps extends ComponentPropsWithoutRef<"button"> {
  title: string;
  onClick: () => void;
}

const BottomButton = (props: BottomButtonProps) => {
  const { title, ...rest } = props;
  return (
    <>
      <Button
        className="w-full rounded bg-black px-3.5 py-4 text-white"
        {...rest}
      >
        {title}
      </Button>
    </>
  );
};
export default BottomButton;
