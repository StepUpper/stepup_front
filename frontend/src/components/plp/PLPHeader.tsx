import { ReactNode } from "react";
import { closeIcon } from "@assets/assets";
import Button from "@common/html/Button";
import { useBottomSheet } from "@store/bottomSheet.store";

interface PLPHeaderProps {
  children: ReactNode;
}

const PLPHeader = (props: PLPHeaderProps) => {
  const { children } = props;

  const { close } = useBottomSheet();

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex w-[70%] items-center gap-2">{children}</div>
        <Button onClick={() => close("plp")}>
          <img src={closeIcon} alt="닫기 버튼" className="shrink-0" />
        </Button>
      </div>
    </>
  );
};
export default PLPHeader;
