import { useEffect } from "react";
import CameraView from "@components/shoeCloset/search/ImageSearch/CameraView";
import ImageSearchBottomSheet from "@/components/shoeCloset/search/ImageSearch/ShoeImageSearchBottomSheet";
import { useBottomSheet } from "@store/bottomSheet.store";

const ShoeImageSearch = () => {
  const { close } = useBottomSheet();
  const imageSearchSheet = useBottomSheet(
    (state) => state.sheets["imageSearch"]
  );

  useEffect(() => {
    close("imageSearch");
  }, []);

  return (
    <div className="h-real-screen relative w-full overflow-hidden">
      {/* 카메라 영역 */}
      <CameraView />
      {/* 검색 바텀 */}
      {imageSearchSheet?.isOpen === true && <ImageSearchBottomSheet />}
    </div>
  );
};
export default ShoeImageSearch;
