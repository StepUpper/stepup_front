import LikeButton, { LikeButtonProps } from "@common/LikeButton";
import { ReactNode } from "react";
import ProductLearnMoreButton from "./ProductLearnMoreButton";
import { useNavigate } from "react-router-dom";
import { perfittLogo } from "@/assets/assets";

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
    navigate("/bridge", {
      state: {
        customerLink,
        brandName,
        productName,
        customerImg,
      },
    });
  };

  return (
    <li
      className="min-w-[136px] cursor-pointer list-none"
      onClick={handleBridgeNavigation}
    >
      {/* 상단 이미지 영역 */}
      <div className="relative">
        <div className="h-fit overflow-hidden rounded-[0.39rem]">
          {/* 신발 이미지 */}
          <div className="item-center mt-[-10px] h-fit w-full bg-grey-50">
            <img src={thumb} alt={productName} width="100%" />
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
      <div className="flex flex-col gap-2.5 px-1.5 py-2.5 text-body3">
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
