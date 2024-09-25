import { addOrRemoveShoeFromLikes } from "@apis/firebase/likeFirestore";
import userStore from "@store/auth.store";
import LikeButton from "@common/LikeButton";
import Img from "@common/html/Img";
import { useParams } from "react-router-dom";

interface ProductItemProps {
  brand: string;
  productName: string;
  imgUrl: string;
  modelNo: string;
  customerLink: string;
  customerImg?: string;
  isLiked: boolean | undefined;
}

const ChatProductItem = (props: ProductItemProps) => {
  const { isLoggedIn, user, updateUserInfo } = userStore();
  const {
    brand,
    productName,
    imgUrl,
    modelNo,
    customerLink,
    customerImg,
    isLiked,
  } = props;
  const { messageId } = useParams();
  const isSharePage = Boolean(messageId);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoggedIn) {
      await addOrRemoveShoeFromLikes(user?.uid!, {
        brand,
        productName,
        imgUrl,
        modelNo,
        customerLink,
        customerImg,
      });
      updateUserInfo();
    } else {
      console.log("로그인이 필요합니다.");
      // 여기서 로그인하라는 채팅을 띄워주면 좋을 듯 하다. 일단 나중에 ..
    }
  };
  return (
    <div className="w-[166px] overflow-hidden rounded-md border border-grey-50">
      <div className="relative h-[155px]">
        <div className="flex h-[146px] w-full items-center justify-center overflow-hidden bg-grey-50">
          <Img src={imgUrl} alt={productName} className="w-full object-cover" />
        </div>
        {!isSharePage && (
          <LikeButton
            className="absolute right-[0.69rem] top-2"
            onClick={handleLikeClick}
            isLiked={isLiked}
          />
        )}
        <div className="bg-grey-300 absolute bottom-0.5 right-1.5 size-6 rounded-full">
          <Img src={customerImg} alt={brand} errorStyle="w-full opacity-40" />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 px-1.5 py-2.5 text-body3">
        <div className="flex flex-col gap-[3px]">
          <strong className="text-caption1 font-paragraph">{brand}</strong>
          <h3 className="truncate font-label">{productName}</h3>
        </div>
      </div>
    </div>
  );
};
export default ChatProductItem;
