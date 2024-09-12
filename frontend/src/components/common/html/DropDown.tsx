import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { dropDownIcon } from "@assets/assets";
import { twMerge } from "tailwind-merge";

type DropDownProps = {
  className: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
};

export type DropDownRef = {
  getSelectedOption: () => string;
};

const DropDown = forwardRef<DropDownRef, DropDownProps>((props, ref) => {
  const { className, placeholder, options, onChange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const optionClickHandler = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
      console.log(value);
    }
  };

  const outsideClickHandler = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getSelectedOption: () => selectedOption,
  }));

  return (
    <>
      <div className="relative min-w-0 grow" ref={dropdownRef}>
        <div
          className={twMerge(
            "flex items-center justify-between border text-body2 font-semibold",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            className={twMerge(
              "w-full cursor-pointer",
              selectedOption ? "text-black" : "text-[#A1A1AA]"
            )}
            readOnly
            value={selectedOption || placeholder}
          />
          <div className="ml-2 flex size-5">
            <img src={dropDownIcon} alt="drop down icon" className="size-5" />
          </div>
        </div>
        {isOpen && (
          <ul className="absolute top-full z-10 mt-1 max-h-40 w-full cursor-pointer overflow-y-auto rounded-s-md border border-gray-300 bg-white">
            {options.map((option) => (
              <li
                key={option.value}
                className={twMerge("px-4 py-2 hover:bg-gray-200", className)}
                onClick={() => optionClickHandler(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
});

DropDown.displayName = "DropDown";

export default DropDown;
