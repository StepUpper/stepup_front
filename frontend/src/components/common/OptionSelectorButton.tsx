import { twMerge } from "tailwind-merge";
import Button from "@common/html/Button";

interface OptionSelectorButtonProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionSelectorButton = (props: OptionSelectorButtonProps) => {
  const { title, isSelected, onClick } = props;

  return (
    <>
      <Button
        className={twMerge(
          "flex w-full items-center justify-center rounded border-gray-200 px-3.5 py-4",
          !isSelected
            ? "border border-gray-200 bg-white text-black"
            : "bg-gray-200 text-gray-400"
        )}
        type="button"
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  );
};

export default OptionSelectorButton;
