import { defaultProfilePlusImg } from "@/assets/assets";
const { username, size } = {
  username: "김이름",
  size: 240,
};
const ProfileCard = () => {
  return (
    <div className="flex gap-5 px-5">
      <img src={defaultProfilePlusImg} />
      <div className="flex flex-col gap-1">
        <label className="text-body2 font-label">{username}</label>
        <p className="text-body3 font-paragraph">평소 신는 사이즈 | {size}mm</p>
      </div>
    </div>
  );
};

export default ProfileCard;
