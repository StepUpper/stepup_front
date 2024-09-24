import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton, { LikeButtonProps } from "@common/LikeButton";
import ProductLearnMoreButton from "@common/ProductLearnMoreButton";
import Img from "@common/html/Img";
import { shoeImg } from "@assets/assets";
import userStore from "@store/auth.store";
import { addOrRemoveShoeFromLikes } from "@apis/firebase/likeFirestore";
import { useSizeConversion } from "@hooks/useSizeConversion";
import { addRecentProduct } from "@/utils/storeRecentProducts";

interface ProductItemProps extends LikeButtonProps {
  productId: string;
  modelNo: string;
  imgUrl: string;
  brand: string;
  productName: string;
  price?: number | undefined | null;
  customerLink: string;
  customerImg?: string;
}

const ProductList = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="no-scrollbar grid h-[calc(100vh-200px)] w-full grid-cols-2 gap-3 overflow-y-auto md:grid-cols-4">
      {children}
    </ul>
  );
};
export default ProductList;

const ProductItem = (props: ProductItemProps) => {
  const {
    productId,
    modelNo,
    imgUrl,
    brand,
    productName,
    price,
    customerLink,
    customerImg,
    isLiked,
  } = props;

  const navigate = useNavigate();

  const { isLoggedIn, user, updateUserInfo } = userStore();
  const sizeType = user?.sizeType ?? "mm";
  const sneakerSize = user?.sneakerSize ?? 0;

  // 신발 사이즈 변환
  const convertedSneakerSize = useSizeConversion(sizeType, sneakerSize);

  // 브릿지
  const handleBridgeNavigation = () => {
    const recentProducts = {
      productId,
      productName,
      imgUrl,
      modelNo,
      brand,
      customerLink,
      customerImg,
    };
    addRecentProduct(recentProducts);

    navigate(
      `/bridge?type=brand&brandName=${brand}&productName=${productName}&customerImg=${customerImg}&customerLink=${customerLink}`
    );
  };

  // 좋아요
  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(productId);

    if (isLoggedIn) {
      await addOrRemoveShoeFromLikes(user?.uid!, {
        brand,
        productName,
        imgUrl,
        customerLink,
        modelNo,
        productId,
        customerImg,
      });
      updateUserInfo();
    } else {
      console.log("로그인이 필요합니다.");
      // 여기서 로그인하라는 채팅을 띄워주면 좋을 듯 하다. 일단 나중에 ..
    }
  };

  return (
    <li
      className="w-full min-w-[136px] cursor-pointer list-none"
      onClick={handleBridgeNavigation}
    >
      {/* 상단 이미지 영역 */}
      <div className="relative">
        <div className="w-full overflow-hidden rounded-[0.39rem] bg-grey-50">
          {/* 신발 이미지 */}
          <div
            className="item-center mt-[-10px] size-full min-h-[136px]"
            style={{ aspectRatio: "1/1" }}
          >
            <Img
              src={imgUrl}
              alt={productName}
              fallbackSrc={shoeImg}
              className="mt-[20px]"
              errorStyle="w-[60%] mt-[10px] opacity-100"
            />
          </div>
        </div>
        {/* 사이즈 추천 */}
        {convertedSneakerSize && (
          <span className="absolute left-2.5 top-2 flex rounded bg-gradient-to-r from-[#e8f4fe] to-[#ffecfe] p-[0.31rem]">
            <strong className="bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] bg-clip-text text-caption1 font-label leading-4 text-transparent">
              {convertedSneakerSize}mm 추천
            </strong>
          </span>
        )}
        {/* 좋아요 버튼 */}
        <LikeButton
          className="absolute right-[0.69rem] top-2"
          isLiked={isLiked}
          onClick={handleLikeClick}
        />
        {/* 판매처 이미지 */}
        <div className="absolute -bottom-3 right-1.5 size-6 rounded-full bg-grey-400">
          <Img src={customerImg} alt={brand} errorStyle="w-full opacity-40" />
        </div>
      </div>
      {/* 하단 신발 정보 */}
      <div className="flex flex-col gap-2.5 px-0 py-2.5 text-body3 sm:px-1.5">
        <div className="flex flex-col gap-[3px]">
          <strong className="font-paragraph">{brand}</strong>
          <h3 className="truncate font-label">{productName}</h3>
        </div>
        {price && <p className="font-label">{price}</p>}
        <ProductLearnMoreButton />
      </div>
    </li>
  );
};
ProductList.Item = ProductItem;
