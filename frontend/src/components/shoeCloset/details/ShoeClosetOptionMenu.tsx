import { pencilIcon, shareBlackIcon, trashRedIcon } from "@/assets/assets";
import Button from "@/components/common/html/Button";

const ShoeClosetOptionMenu = ({ 
  onClose, 
  onModify,
  onDelete,
  isLoggedIn,
}: { 
  onClose: () => void;
  onModify: () => void;
  onDelete: () => void;
  isLoggedIn: boolean;
}) => {
  return (
    <div
      className="absolute right-4 top-12 z-50 w-36 overflow-hidden rounded-lg bg-gray-200 shadow-[0_0px_20px_-12px]"
      onClick={onClose}
    >
      <div className="flex border-separate flex-col space-y-[1.5px]">
        {isLoggedIn ? (
          <>
            <Button 
              className="flex justify-center gap-2 bg-white px-4 py-2.5 text-red" 
              onClick={onDelete}>
              <img src={trashRedIcon} alt="삭제 아이콘" />
              삭제하기
            </Button>
            <Button 
              className="flex justify-center gap-2 bg-white px-4 py-2.5" 
              onClick={onModify}
            >
              <img src={pencilIcon} alt="수정 아이콘"  />
              수정하기
            </Button>
          </>) : ("")}
        <Button className="flex justify-center gap-2 bg-white px-4 py-2.5">
          <img src={shareBlackIcon} alt="공유 아이콘" />
          공유하기
        </Button>
      </div>
    </div>
  );
};
export default ShoeClosetOptionMenu;
