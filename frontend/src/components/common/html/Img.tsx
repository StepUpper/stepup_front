import { perfittLogo } from "@/assets/assets";
import { ComponentPropsWithoutRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ImgProps extends ComponentPropsWithoutRef<"img"> {
  fallbackSrc?: string; // 대체 이미지
  errorStyle?: string;
}

const Img = (props: ImgProps) => {
  const {
    src,
    alt,
    fallbackSrc = perfittLogo,
    errorStyle,
    className,
    ...rest
  } = props;

  const [isError, setIsError] = useState(false);
  return (
    <>
      <img
        src={isError ? fallbackSrc : src}
        alt={alt}
        onError={() => {
          setIsError(true);
        }}
        width="100%"
        className={twMerge(
          className,
          isError ? "w-[60%] opacity-10" : "opacity-100",
          isError && errorStyle
        )}
        {...rest}
      />
    </>
  );
};
export default Img;
