import LikeButton, { LikeButtonProps } from "./LikeButton";

interface ProductItemProps extends LikeButtonProps {
  recSize: string;
  thumb: string;
  brand: string;
  brandImg: string;
  title: string;
  price: number;
}
const ProductItem = (props: ProductItemProps) => {
  const { recSize, thumb, brand, brandImg, title, price, isLiked } = props;
  return (
    <li className="list-none w-[166px]">
      {/* 상단 이미지 영역 */}
      <div className="relative h-[156px] rounded-[0.39rem]">
        {/* 신발 이미지 */}
        <div className="bg-grey-50 h-[156px] w-full rounded-[0.39rem]">
          <img src={thumb} alt={title} width="100%" />
        </div>
        {/* 사이즈 추천 */}
        <span className="flex absolute top-2 left-[0.625rem] rounded p-[0.31rem] bg-gradient-to-r from-[#e8f4fe] to-[#ffecfe]">
          <strong className="text-caption1 font-label leading-4 bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] bg-clip-text text-transparent">
            {recSize}240mm 추천
          </strong>
        </span>
        {/* 좋아요 버튼 */}
        <LikeButton
          className="absolute top-2 right-[0.69rem]"
          isLiked={isLiked}
        />
        {/* 브랜드 이미지 */}
        <div className="absolute -bottom-3 right-[0.375rem] bg-grey-400 w-6 h-6 rounded-full">
          <img src={brandImg} alt={brand} />
        </div>
      </div>
      {/* 하단 신발 정보 */}
      <div className="flex flex-col gap-[0.625rem] text-body3 px-[0.375rem] py-[0.625rem]">
        <div className="flex flex-col gap-[3px]">
          <strong className="font-paragraph">{brand}Adidas</strong>
          <h3 className="font-label truncate">
            {title}스피리테인 스피리테인 스피리테인2000 고어텍...
          </h3>
        </div>
        <p className="font-label">{price}105,000원</p>
      </div>
    </li>
  );
};
export default ProductItem;
