import { twMerge } from "tailwind-merge";
import Button from "./html/Button";

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
          isSelected
            ? "border-gray-200 bg-white text-black"
            : "bg-gray-200 text-gray-400"
        )}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  );
};

export default OptionSelectorButton;

// 나중에 그룹화 할 때 쓸 코드
// const [selectedOption, setSelectedOption] = useState<string>("mm");
// const handleSelect = (option: string) => {
//   setSelectedOption(option);
// };

// 아래는 사용 예시
// <div className="flex space-x-2 justify-center">
//   <OptionSelectorButton
//     label="mm"
//     isSelected={selectedOption === "mm"}
//     onClick={() => handleSelect("mm")}
//   />
//   <OptionSelectorButton
//     label="EU"
//     isSelected={selectedOption === "EU"}
//     onClick={() => handleSelect("EU")}
//   />
//   <OptionSelectorButton
//     label="US"
//     isSelected={selectedOption === "US"}
//     onClick={() => handleSelect("US")}
//   />
// </div>
