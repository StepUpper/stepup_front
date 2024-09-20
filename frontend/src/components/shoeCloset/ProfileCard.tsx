import { defaultProfilePlusImg } from "@/assets/assets";
import userStore from "@store/auth.store";

const ProfileCard = () => {
  const { user } = userStore();

  return (
    <div className="flex gap-5 px-5">
      <img src={defaultProfilePlusImg} />
      <div className="flex flex-col gap-1">
        <label className="text-body2 font-label">{user?.username}</label>
        <p className="text-body3 font-paragraph">평소 신는 사이즈 | {user?.sneakerSize} {user?.sizeType}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
