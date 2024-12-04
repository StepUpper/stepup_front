import { addOrRemoveShoeFromLikes } from "@apis/firebase/likeFirestore";
import userStore from "@store/auth.store";
import LikeButton from "@common/LikeButton";
import Img from "@common/html/Img";
import { useNavigate, useParams } from "react-router-dom";
import useChatStore from "@/store/chat.store";
import { useBottomSheet } from "@/store/bottomSheet.store";

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

  const { addGuestMessage } = useChatStore();
  const { open } = useBottomSheet();
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("#login");
    open("login");
  };

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
      addGuestMessage({
        type: "bot",
        content: {
          message: "로그인이 필요한 기능입니다.",
        },
      });
      setTimeout(() => {
        goToLogin();
      }, 1500);
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
