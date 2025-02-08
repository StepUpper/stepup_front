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
  menuPlacement?: "top" | "bottom";
};

export type DropDownRef = {
  getSelectedOption: () => string;
  focus: () => void;
};

const DropDown = forwardRef<DropDownRef, DropDownProps>((props, ref) => {
  const {
    className,
    placeholder,
    options,
    onChange,
    menuPlacement = "bottom",
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const firstOptionRef = useRef<HTMLLIElement>(null);

  const optionClickHandler = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
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
    focus: () => {
      // 드롭다운이 포커스를 받을 때 드롭다운을 열도록 설정
      setIsOpen(true);
      inputRef.current?.focus();
    },
  }));

  return (
    <>
      <div className="relative min-w-0 grow" ref={dropdownRef}>
        <div
          ref={inputRef}
          className={twMerge(
            "flex items-center justify-between border text-body2",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
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
          <ul
            className={twMerge(
              "absolute z-10 max-h-40 w-full cursor-pointer overflow-y-auto rounded-s-md border border-gray-300 bg-white",
              menuPlacement === "top" ? "bottom-full mb-1" : "top-full mt-1"
            )}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                ref={index === 0 ? firstOptionRef : null}
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
