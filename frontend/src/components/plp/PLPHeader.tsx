import { ReactNode } from "react";
import { closeIcon } from "@assets/assets";
import Button from "@common/html/Button";

interface PLPHeaderProps {
  onClick: () => void;
  children: ReactNode;
}

const PLPHeader = (props: PLPHeaderProps) => {
  const { onClick, children } = props;
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div>{children}</div>
        <Button onClick={onClick}>
          <img src={closeIcon} alt="닫기 버튼" />
        </Button>
      </div>
    </>
  );
};
export default PLPHeader;
