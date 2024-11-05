import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/html/Button";
import { cameraIcon } from "@assets/assets";
import ImageSelectIcon from "@assets/icons/image-select-icon.svg?react";
import CloseIcon from "@assets/icons/close-icon.svg?react";
import CameraFocusOverlay from "@components/shoeCloset/search/ImageSearch/CameraFocusOverlay";
import { useBottomSheet } from "@store/bottomSheet.store";
import { uploadImage } from "@apis/firebase/storage";

const videoConstraints = {
  facingMode: "user",
};

const CameraView = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCapture, setIsCapture] = useState(false);
  const navigate = useNavigate();

  const { open, close } = useBottomSheet();
  const imageSearchSheet = useBottomSheet(
    (state) => state.sheets["imageSearch"]
  );

  // 촬영 중지 제어
  useEffect(() => {
    if (!imageSearchSheet?.isOpen) {
      webcamRef.current?.video?.play();
    } else {
      webcamRef.current?.video?.pause();
    }
  }, [imageSearchSheet?.isOpen]);

  // 이미지 업로드 및 라우팅
  const handleImageUpload = async (file: File | string, fileName: string) => {
    try {
      setIsCapture(true); // 캡쳐
      open("imageSearch"); // 결과 바텀 열기

      const downloadURL = await uploadImage(file, fileName); // 업로드
      navigate(`/shoecloset/search/image?query=${fileName}`, {
        replace: true,
        state: downloadURL,
      }); // 라우팅
    } catch (error) {
      console.log("이미지 업로드 오류: ", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      close("imageSearch");
    } finally {
      setIsCapture(false);
    }
  };

  // 웹캠 이미지 캡쳐 및 업로드
  const handleCameraCapture = useCallback(async () => {
    const capturedImage = webcamRef.current?.getScreenshot() || null;
    if (!capturedImage) {
      alert("촬영에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    handleImageUpload(capturedImage, `captured_image_${Date.now()}`);
  }, [webcamRef]);

  // 갤러리에서 파일 선택
  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  // 갤러리에서 선택한 이미지 업로드
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("이미지를 불러오지 못 했습니다. 다시 시도해주세요.");
      return;
    }
    handleImageUpload(file, `${file.name}_${Date.now()}`);
  };

  // 닫기 (검색창으로 이동)
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
      {!isCapture && <CameraFocusOverlay />}
      {/* 하단 갤러리 & 사진 촬영 버튼 영역 */}
      <div className="absolute bottom-[3.75rem] z-[1] flex w-4/5 flex-col items-center gap-3">
        <div className="w-fit rounded bg-black/50 px-3 py-1 text-body3 leading-6 text-white">
          촬영 버튼을 탭하여 검색
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="absolute left-0">
            <Button
              className="rounded-full bg-black/50 px-3 py-[.8125rem]"
              onClick={handleGalleryClick}
            >
              <ImageSelectIcon stroke="#fff" width="22px" />
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }} // 화면에 표시하지 않음
              onChange={handleFileInputChange}
            />
          </div>
          <Button
            className="rounded-full bg-white px-5 py-[1.375rem]"
            onClick={handleCameraCapture}
          >
            <img src={cameraIcon} alt="사진 촬영" width="26px" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CameraView;
