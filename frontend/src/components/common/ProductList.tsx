import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton, { LikeButtonProps } from "@common/LikeButton";
import ProductLearnMoreButton from "@common/ProductLearnMoreButton";
import Img from "@common/html/Img";
import { perfittLogo } from "@assets/assets";
import { addRecentProduct, TRecentProduct } from "@/utils/storeRecentProducts";

interface ProductItemProps extends LikeButtonProps {
  recSize?: string | null;
  thumb: string;
  brandName: string;
  productName: string;
  price?: number;
  customerLink: string;
  customerImg?: string;
}

const ProductList = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">{children}</ul>
  );
};
export default ProductList;

const ProductItem = (props: ProductItemProps) => {
  const {
    recSize,
    thumb,
    brandName,
    productName,
    price,
    customerLink,
    customerImg,
    isLiked,
  } = props;

  const navigate = useNavigate();

  // 브릿지
  const handleBridgeNavigation = () => {
    const recentProducts: TRecentProduct = {
      brandName,
      productName,
      customerImg,
      customerLink,
    };
    addRecentProduct(recentProducts);

    navigate(
      `/bridge?type=brand&brandName=${brandName}&productName=${productName}&customerImg=${customerImg}&customerLink=${customerLink}`
    );
  };

  return (
    <li
      className="w-full min-w-[136px] cursor-pointer list-none"
      onClick={handleBridgeNavigation}
    >
      {/* 상단 이미지 영역 */}
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-[0.39rem] bg-grey-50">
          {/* 신발 이미지 */}
          <div className="item-center mt-[-10px] size-full min-h-[136px]">
            <Img
              src={thumb}
              alt={productName}
              width="100%"
              errorStyle="w-[60%] mt-[10px]"
            />
          </div>
        </div>
        {/* 사이즈 추천 */}
        {recSize && (
          <span className="absolute left-2.5 top-2 flex rounded bg-gradient-to-r from-[#e8f4fe] to-[#ffecfe] p-[0.31rem]">
            <strong className="bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] bg-clip-text text-caption1 font-label leading-4 text-transparent">
              {recSize} 추천
            </strong>
          </span>
        )}
        {/* 좋아요 버튼 */}
        <LikeButton
          className="absolute right-[0.69rem] top-2"
          isLiked={isLiked}
        />
        {/* 판매처 이미지 */}
        <div className="absolute -bottom-3 right-1.5 size-6 rounded-full bg-grey-400">
          <img src={customerImg ? customerImg : perfittLogo} alt={brandName} />
        </div>
      </div>
      {/* 하단 신발 정보 */}
      <div className="flex flex-col gap-2.5 px-0 py-2.5 text-body3 sm:px-1.5">
        <div className="flex flex-col gap-[3px]">
          <strong className="font-paragraph">{brandName}</strong>
          <h3 className="truncate font-label">{productName}</h3>
        </div>
        {price && <p className="font-label">{price}</p>}
        <ProductLearnMoreButton />
      </div>
    </li>
  );
};
ProductList.Item = ProductItem;
