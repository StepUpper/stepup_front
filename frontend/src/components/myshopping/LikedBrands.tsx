import LikeButton from "@common/LikeButton";
import { shoeHeart } from "@/assets/assets";
import userStore from "@/store/auth.store";

const LikedBrands = () => {
  const { likeShoes } = userStore();

  const likeUniqueBrands = likeShoes
    ? likeShoes.filter(
        (product, index, self) =>
          index ===
          self.findIndex(
            (p) => p.brand.toLowerCase() === product.brand.toLowerCase()
          )
      )
    : [];

  return (
    <>
      <div className="px-[16px]">
        <p className="text-body3 font-bold">총 {likeUniqueBrands?.length} 개</p>
        {likeUniqueBrands && likeUniqueBrands.length > 0 ? (
          <div className="justify-items-center gap-[10px] py-[16px]">
            {likeUniqueBrands.map((product) => (
              <div
                className="mb-[10px] flex w-full items-center justify-between gap-[20px] pl-[4px]"
                key={product.brand}
              >
                {/* 브랜드 로고 이미지 */}
                <div className="size-[75px] rounded-full bg-grey-50">
                  <img src={product.customerImg || undefined} />
                </div>
                {/* 브랜드명 */}
                <div className="flex grow flex-col items-start gap-[6px]">
                  <span className="grow text-body2 font-semibold">
                    {product.brand}
                  </span>
                  {/* 아직 한글명 없음 이슈.... */}
                  <span className="grow text-body2 font-normal text-grey-400">
                    {product.brand}
                  </span>
                </div>
                <LikeButton isLiked={true} className="w-[15px]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="item-center left-1/2 h-[50vh] flex-col gap-4">
            <img src={shoeHeart} />
            <p className="font-semibold"> 좋아요한 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LikedBrands;
