import { perfittLogo } from "@/assets/assets";
import LikeButton, { LikeButtonProps } from "@common/LikeButton";

interface ProductItemProps {
  brand: string;
  title: string;
  imgUrl: string;
  link: string;
  modelNo: string;
  productId: string;
}

const ChatProductItem = (props: ProductItemProps) => {
  // const isLiked = true;
  const { brand, title, imgUrl, link, modelNo, productId } = props;
  return (
    <div className="w-[166px] overflow-hidden rounded-md border border-grey-50">
      <div className="relative h-[155px]">
        <div className="h-[146px] overflow-hidden bg-grey-50">
          <img src={imgUrl} alt={title} className="w-full object-cover" />
        </div>
        {/* <LikeButton
          className="absolute right-[0.69rem] top-2"
          isLiked={isLiked}
        /> */}
        {/* likebutton 누르면 유저의 좋아요 db에 기록되게끔. */}
        <div className="absolute bottom-0.5 right-1.5 size-6 rounded-full bg-grey-400">
          <img src={perfittLogo} alt="임시 로고" />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 px-1.5 py-2.5 text-body3">
        <div className="flex flex-col gap-[3px]">
          <strong className="text-caption1 font-paragraph">{brand}</strong>
          <h3 className="truncate font-label">{title}</h3>
        </div>
      </div>
    </div>
  );
};
export default ChatProductItem;
