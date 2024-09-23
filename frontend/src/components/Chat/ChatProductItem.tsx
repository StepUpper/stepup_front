import { addOrRemoveShoeFromLikes } from "@apis/firebase/likeFirestore";
import { perfittLogo } from "@assets/assets";
import userStore from "@store/auth.store";
import LikeButton from "@common/LikeButton";
import Img from "@common/html/Img";

interface ProductItemProps {
  brand: string;
  title: string;
  imgUrl: string;
  link: string;
  modelNo: string;
  productId: string;
  isLiked: boolean | undefined;
}

const ChatProductItem = (props: ProductItemProps) => {
  const { isLoggedIn, user, updateUserInfo } = userStore();
  const { brand, title, imgUrl, link, modelNo, productId, isLiked } = props;

  const handleLikeClick = async () => {
    if (isLoggedIn) {
      await addOrRemoveShoeFromLikes(user?.uid!, {
        brand,
        title,
        imgUrl,
        link,
        modelNo,
        productId,
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
          <Img src={imgUrl} alt={title} className="w-full object-cover" />
        </div>
        <LikeButton
          className="absolute right-[0.69rem] top-2"
          onClick={handleLikeClick}
          isLiked={isLiked}
        />
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
