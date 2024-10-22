import CameraView from "@components/shoeCloset/search/ImageSearch/CameraView";

const ImageSearchShoeCloset = () => {
  return (
    <div className="h-real-screen relative w-full overflow-hidden">
      {/* 카메라 영역 */}
      <CameraView />
    </div>
  );
};
export default ImageSearchShoeCloset;
