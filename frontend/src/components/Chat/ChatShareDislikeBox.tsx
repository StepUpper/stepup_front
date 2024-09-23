import { thumbsDownIcon, shareIcon } from "@assets/assets";

const ChatShareDislikeBox = () => {
  return (
    <>
      <div className="flex gap-3 py-3 pl-8">
        <img src={shareIcon} alt="shareIcon" />
        <img src={thumbsDownIcon} alt="thumbsDownIcon" />
      </div>
    </>
  );
};
export default ChatShareDislikeBox;
