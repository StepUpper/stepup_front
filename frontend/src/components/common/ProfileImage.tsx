import { useState } from "react";
import { cameraIcon, defaultProfileImg } from "@assets/assets";

type ProfileImageProps = {
  className?: string;
  uploadedImg?: string;
  showCameraIcon?: boolean;
};

const ProfileImage = (props: ProfileImageProps) => {
  const { className, uploadedImg, showCameraIcon = true } = props; //showCameraIcon={false} 로 설정시 프로필이미지 수정 불가능
  const [profileImg, setProfileImg] = useState<string>(
    uploadedImg || defaultProfileImg
  );
  const ImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImg(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className={className}>
        <div className="relative h-24 w-24 rounded-full border">
          {/* 프로필 이미지 영역 */}
          <img
            src={profileImg}
            alt="프로필 이미지"
            className="h-full w-full rounded-full object-cover"
          />
          {/* 카메라 아이콘 버튼 */}
          {showCameraIcon && (
            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full border bg-white p-1">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={ImageChangeHandler}
              />
              <img src={cameraIcon} alt="camera icon" className="h-6 w-6" />
            </label>
          )}
        </div>
      </div>
    </>
  );
};
export default ProfileImage;
