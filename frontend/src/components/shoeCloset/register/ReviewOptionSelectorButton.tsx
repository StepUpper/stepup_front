import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import Button from "@common/html/Button";

interface ReviewOptionSelectorButtonProps {
  isSelected: boolean;
}
type ButtonProps = ComponentPropsWithoutRef<"button">;

const ReviewOptionSelectorButton = (
  props: ReviewOptionSelectorButtonProps & ButtonProps
) => {
  const { isSelected, value, onClick, ...rest } = props;
  return (
    <Button
      className={twMerge(
        "item-center w-full rounded border border-grey-50 py-2.5 text-body3 font-label",
        isSelected ? "bg-white text-black" : "bg-grey-50 text-grey-500"
      )}
      value={value}
      onClick={(e) => onClick(e)}
      {...rest}
    >
      {value}
    </Button>
  );
};

export default ReviewOptionSelectorButton;
