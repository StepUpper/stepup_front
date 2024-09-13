import { grabber } from "@assets/assets";
import { ReactNode } from "react";

interface BottomSheetProps {
  children: ReactNode;
}

const BottomSheet = (props: BottomSheetProps) => {
  const { children } = props;
  return (
    <div className="absolute bottom-0 left-0 flex w-full flex-col rounded-t-3xl bg-white shadow-custom">
      {children}
    </div>
  );
};
export default BottomSheet;

const BottmSheetHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="item-center w-full flex-col pt-2">
        <img src={grabber} alt="드래그 바" />
      </div>
      <div className="flex w-full p-4">{children}</div>
    </div>
  );
};

const BottmSheetContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full px-4">{children}</div>;
};

BottomSheet.Header = BottmSheetHeader;
BottomSheet.Content = BottmSheetContent;
