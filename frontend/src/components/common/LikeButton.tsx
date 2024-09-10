import LikeIcon from "@assets/images/like-icon.svg?react";
import Button from "./html/Button";
import { twMerge } from "tailwind-merge";

export type LikeButtonProps = {
  isLiked: boolean;
  className: string;
  onClick?: () => void;
};
const LikeButton = (props: LikeButtonProps) => {
  const { isLiked = false, className, onClick } = props;
  return (
    <>
      <Button className={twMerge("border-none", className)} onClick={onClick}>
        <LikeIcon fill={isLiked ? "#F87171" : "#fff"} />
      </Button>
    </>
  );
};
export default LikeButton;
