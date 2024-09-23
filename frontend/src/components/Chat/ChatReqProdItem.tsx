import { twMerge } from "tailwind-merge";

interface ReqProdProps {
  brand: string;
  title: string;
  imgUrl: string;
  link: string;
  onClick: () => void;
  className: string;
}

const ChatReqProdItem = (props: ReqProdProps) => {
  const { brand, title, imgUrl, onClick, className } = props;
  return (
    <div
      className={twMerge("flex items-center space-x-3", className)}
      onClick={onClick}
    >
      <img
        src={imgUrl}
        alt={title}
        className="size-12 rounded-md object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-normal">{brand}</p>
        <p className="max-w-36 truncate text-sm font-semibold">{title}</p>
      </div>
    </div>
  );
};
export default ChatReqProdItem;
