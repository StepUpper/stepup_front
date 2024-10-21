import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/html/Button";
import { cameraIcon } from "@assets/assets";
import ImageSelectIcon from "@assets/icons/image-select-icon.svg?react";
import CloseIcon from "@assets/icons/close-icon.svg?react";
import CameraFocusOverlay from "@components/shoeCloset/search/ImageSearch/CameraFocusOverlay";

const videoConstraints = {
  facingMode: "user",
};

const CameraView = () => {
  const webcamRef = useRef<Webcam | null>(null);

  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="item-center relative size-full">
      {/* 닫기 버튼 */}
      <div className="absolute left-0 top-0 z-[2] m-4">
        <Button
          className="rounded-full p-2 hover:bg-black/50"
          onClick={handleBack}
        >
          <CloseIcon stroke="white" className="shrink-0" />
        </Button>
      </div>
      {/* 카메라 화면 영역 */}
      <Webcam
        ref={webcamRef}
        audio={false}
        // width="100%" // 스크린샷 최소 너비
        // height="100%" // 스크린샷 최소 높이
        mirrored={true} // 좌/우 반전
        screenshotFormat="image/webp" //
        videoConstraints={videoConstraints}
        className="size-full object-cover"
      />
      {/* 신발 위치 표시 영역 */}
      <CameraFocusOverlay />
      {/* 하단 갤러리 & 사진 촬영 버튼 영역 */}
      <div className="absolute bottom-[3.75rem] z-[2] flex w-4/5 flex-col items-center gap-3">
        <div className="w-fit rounded bg-black/50 px-3 py-1 text-body3 leading-6 text-white">
          촬영 버튼을 탭하여 검색
        </div>
        <div className="flex w-full items-center justify-center">
          <Button className="absolute left-0 rounded-full bg-black/50 px-3 py-[.8125rem]">
            <ImageSelectIcon stroke="#fff" width="22px" />
          </Button>
          <Button
            className="rounded-full bg-white px-5 py-[1.375rem]"
            onClick={capture}
          >
            <img src={cameraIcon} alt="사진 촬영" width="26px" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CameraView;
