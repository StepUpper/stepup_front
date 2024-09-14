import { ReactNode, useRef, useState } from "react";
import { motion, PanInfo, useDragControls } from "framer-motion";
import { grabber } from "@assets/assets";
import { twMerge } from "tailwind-merge";

interface BottomSheetProps {
  isDragBar?: boolean;
  isOpen: boolean;
  isMinimized?: boolean;
  yPosition: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: ReactNode;
}

const BottomSheet = (props: BottomSheetProps) => {
  const {
    isDragBar = true,
    isOpen,
    isMinimized,
    yPosition,
    onClose,
    onMinimize,
    onMaximize,
    children,
  } = props;

  const bottomSheetRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  // TODO: 바텀 시트가 다 올라왔을 때 위로 올라오지 않도록 제한
  // 드래그 제한 설정을 위한 상태
  const [dragConstraints, setDragConstraints] = useState({ top: 0, bottom: 0 });

  // 스냅 애니메이션 추가
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 150; // 스냅 기준값 (얼마나 드래그 됐을 때 스냅할지)
    const velocityThreshold = 20; // 드래그 속도에 따른 스냅 기준

    // 드래그된 위치와 속도를 기반으로 스냅 결정
    if (info.offset.y > threshold || info.velocity.y > velocityThreshold) {
      if (onMinimize) onMinimize(); // 최소화
    } else {
      if (onMaximize) onMaximize(); // 최대화
    }
  };

  return (
    <div>
      {/* 오버레이 */}
      {isOpen && !isMinimized && <Overlay />}
      {/* 바텀시트 본체 */}
      <motion.div
        ref={bottomSheetRef}
        initial={{ y: "100%" }} // 초기값
        animate={{ y: isOpen ? yPosition : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }} // 부드럽게
        drag="y"
        dragControls={dragControls}
        dragConstraints={dragConstraints} // 드래그 범위
        dragListener={false}
        onDragEnd={handleDragEnd} // 드래그 끝난 후 스냅 애니메이션 적용
        className="fixed bottom-0 left-0 flex max-h-[98vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-custom"
      >
        {/* 드래그 바 */}
        {isDragBar && (
          <motion.div
            className="item-center w-full cursor-pointer flex-col pt-2"
            onPointerDown={(e) => dragControls.start(e)}
            onTap={onClose}
          >
            <img src={grabber} alt="드래그 바" />
          </motion.div>
        )}

        {/* 헤더 / 콘텐츠 영역 */}
        {children}
      </motion.div>
    </div>
  );
};
export default BottomSheet;

// BottomSheetHeader 👇
const BottomSheetHeader = ({
  isTitleOnly = true,
  className,
  children,
}: {
  isTitleOnly: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={twMerge("flex w-full justify-center p-4", className)}>
      {isTitleOnly ? (
        <h2 className="text-body1 font-label leading-[24px] tracking-[-0.27px]">
          {children}
        </h2>
      ) : (
        children
      )}
    </div>
  );
};

// BottomSheetContent 👇
const BottomSheetContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col overflow-y-auto px-4">{children}</div>
  );
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;

// Overlay 👇
const Overlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black"
    ></motion.div>
  );
};
