import { useState } from "react";
import { cameraIcon, defaultProfileImg } from "@assets/assets";

type ProfileImageProps = {
  uploadedImg?: string;
  showCameraIcon?: boolean;
};

const ProfileImage = (props: ProfileImageProps) => {
  const { uploadedImg, showCameraIcon = true } = props;
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
      <div className="relative size-24 rounded-full border">
        <img
          src={profileImg}
          alt="프로필 이미지"
          className="size-full rounded-full object-cover"
        />
        {showCameraIcon && (
          <label className="absolute bottom-0 right-0 cursor-pointer rounded-full border bg-white p-1">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={ImageChangeHandler}
            />
            <img src={cameraIcon} alt="camera icon" className="size-6" />
          </label>
        )}
      </div>
    </>
  );
};
export default ProfileImage;
