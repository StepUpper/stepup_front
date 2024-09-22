import { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { motion, PanInfo, useDragControls } from "framer-motion";
import { grabberIcon } from "@assets/assets";
import { useBottomSheet } from "@/store/bottomSheet.store";

type BottomSheetProps = {
  id: string; // 바텀 시트 ID
  isDragBar?: boolean; // 드래그 바 여부
  isOverlayClose?: boolean; // 바텀 시트 밖에 영역 클릭 시 닫힘 여부
  children?: ReactNode;
};

const BottomSheet = (props: BottomSheetProps) => {
  const { id, isDragBar = true, isOverlayClose = true, children } = props;

  const { sheets, close, minimize, maximize } = useBottomSheet();

  const isOpen = sheets[id]?.isOpen || false;
  const isMinimized = sheets[id]?.isMinimized || false;
  const plp = sheets["plp"]?.isOpen || false;

  const dragControls = useDragControls();

  useEffect(() => {
    if (isMinimized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMinimized]);

  // 스냅 애니메이션 추가
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 150; // 스냅 기준값 (얼마나 드래그 됐을 때 스냅할지)
    const smallDragThreshold = 50; // 작은 드래그 거리 기준
    const velocityThreshold = 50; // 드래그 속도에 따른 스냅 기준

    // 드래그된 위치와 속도를 기반으로 스냅 결정
    if (info.offset.y > threshold || info.velocity.y > velocityThreshold) {
      minimize(id); // 최소화
      console.log("Minimized:", id);
    } else if (
      info.offset.y > smallDragThreshold &&
      info.offset.y < threshold
    ) {
      return; // 유지 (작은 드래그일 경우 동작하지 않음)
    } // 위로 드래그했을 때 최대화
    else if (info.offset.y < -threshold) {
      maximize(id); // 최대화
      console.log("Maximized:", id);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="z-[9999]">
          {/* 오버레이 */}
          {isOpen && !isMinimized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white"
              onClick={() => (isOverlayClose ? close(id) : undefined)}
            ></motion.div>
          )}

          {/* 바텀시트 본체 */}
          <motion.div
            initial={{ y: "100%" }} // 초기값
            animate={{
              y: isMinimized ? (plp ? "83%" : "97%") : "0%",
            }} // PLP 최소화 임시 처리
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 20,
              duration: 0.6,
            }}
            // transition={{ duration: 0.6, ease: "easeInOut" }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }} // 드래그 범위
            dragListener={false}
            onDragEnd={handleDragEnd} // 드래그 끝난 후 스냅 애니메이션 적용
            className="absolute bottom-0 left-0 flex max-h-[98vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-custom"
          >
            {/* 드래그 바 */}
            {isDragBar && (
              <motion.div
                className="item-center w-full cursor-pointer flex-col pt-2"
                style={{ touchAction: "none" }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  dragControls.start(e);
                }}
                // onTap={() => close(id)}
              >
                <img src={grabberIcon} alt="드래그 바" />
              </motion.div>
            )}

            {/* 헤더 / 콘텐츠 영역 */}
            {children}
          </motion.div>
        </div>
      )}
    </>
  );
};
export default BottomSheet;

// BottomSheetHeader 👇
const BottomSheetHeader = ({
  isTitleOnly = true,
  className,
  children,
}: {
  isTitleOnly?: boolean;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={twMerge("flex w-full justify-center py-4", className)}>
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
const BottomSheetContent = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={twMerge("container-y", className)}>{children}</div>;
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;
