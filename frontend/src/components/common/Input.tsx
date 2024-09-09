import { twMerge } from "tailwind-merge";

interface InputProps 
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type: "email" | "password" | "text" | "button" ;
};

const Input = (props : InputProps) => {
  const { type, placeholder, className, ...rest } = props;

  return (
    <>
      <input 
        {type}
        className={twMerge(
          "h-[48px] rounded px-[16px] py-[14px] gap-2 border border-[#E4E4E7] placeholder:-[#A1A1AA]",className
          )}
          {...rest}
      />
    </>
  );
};
export default Input;