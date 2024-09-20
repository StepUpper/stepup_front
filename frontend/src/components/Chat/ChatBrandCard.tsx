import { showBrandProductIcon } from "@assets/assets";

interface BrandProps {
  brand: string;
  description: string;
  link: string;
  thumbnail: string;
}

const ChatBrandCard = (props: BrandProps) => {
  const { brand, thumbnail } = props;
  return (
    <div className="h-32 w-28 overflow-hidden rounded-md border">
      <div className="flex h-24 items-center justify-center p-4">
        <img src={thumbnail} alt={brand} className="h-full object-contain" />
      </div>

      <div className="flex items-center justify-center border-t px-4 py-2 text-caption2 text-gray-600">
        전체 상품보기
        <img
          src={showBrandProductIcon}
          alt="showBrandProductIcon"
          className="ml-2.5 w-1"
        />
      </div>
    </div>
  );
};

export default ChatBrandCard;
