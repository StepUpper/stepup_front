import { showBrandProductIcon } from "@assets/assets";
import Button from "@common/html/Button";

const ChatBrandCard = () => {
  return (
    <div className="h-32 w-28 overflow-hidden rounded-md border">
      <div className="flex h-24 items-center justify-center p-4">
        <img src="" alt="" className="h-full object-contain" />
      </div>

      <div className="border-t px-4 py-2 text-center">
        <Button className="flex items-center justify-center border-none text-caption2 text-gray-600">
          전체 상품보기
          <img
            src={showBrandProductIcon}
            alt="showBrandProductIcon"
            className="ml-2.5 w-1"
          />
        </Button>
      </div>
    </div>
  );
};

export default ChatBrandCard;
