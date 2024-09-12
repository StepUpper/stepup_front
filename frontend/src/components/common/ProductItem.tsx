import LikeButton, { LikeButtonProps } from "@common/LikeButton";

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
    <li className="w-[166px] list-none">
      {/* 상단 이미지 영역 */}
      <div className="relative h-[156px] rounded-[0.39rem]">
        {/* 신발 이미지 */}
        <div className="h-[156px] w-full rounded-[0.39rem] bg-grey-50">
          <img src={thumb} alt={title} width="100%" />
        </div>
        {/* 사이즈 추천 */}
        <span className="absolute left-2.5 top-2 flex rounded bg-gradient-to-r from-[#e8f4fe] to-[#ffecfe] p-[0.31rem]">
          <strong className="bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] bg-clip-text text-caption1 font-label leading-4 text-transparent">
            {recSize}240mm 추천
          </strong>
        </span>
        {/* 좋아요 버튼 */}
        <LikeButton
          className="absolute right-[0.69rem] top-2"
          isLiked={isLiked}
        />
        {/* 브랜드 이미지 */}
        <div className="absolute -bottom-3 right-1.5 size-6 rounded-full bg-grey-400">
          <img src={brandImg} alt={brand} />
        </div>
      </div>
      {/* 하단 신발 정보 */}
      <div className="flex flex-col gap-2.5 px-1.5 py-2.5 text-body3">
        <div className="flex flex-col gap-[3px]">
          <strong className="font-paragraph">{brand}Adidas</strong>
          <h3 className="truncate font-label">
            {title}스피리테인 스피리테인 스피리테인2000 고어텍...
          </h3>
        </div>
        <p className="font-label">{price}105,000원</p>
      </div>
    </li>
  );
};
export default ProductItem;
