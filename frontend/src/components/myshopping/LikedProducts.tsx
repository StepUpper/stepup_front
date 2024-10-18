import userStore from "@store/auth.store";
import ProductItem from "@components/common/ProductItem";
import { shoeHeart } from "@assets/assets";
import { useSizeConversion } from "@/hooks/useSizeConversion";

const LikedProducts = () => {
  const { user, likeShoes } = userStore();

  const sizeType = user?.sizeType ?? "mm";
  const sneakerSize = user?.sneakerSize ?? null;

  // 신발 사이즈 변환
  const convertedSneakerSize = useSizeConversion(sizeType, sneakerSize);

  return (
    <>
      <div className="px-[16px]">
        <p className="pb-[16px] text-body3 font-bold">
          총 {likeShoes?.length || 0} 개
        </p>
        {likeShoes && likeShoes.length > 0 ? (
          <>
            <ul className="no-scrollbar grid h-[calc(100vh-200px)] w-full grid-cols-2 gap-3 overflow-y-auto md:grid-cols-4">
              {likeShoes &&
                likeShoes.map((product, index) => {
                  const isLiked = likeShoes?.some(
                    (shoe) => shoe.shoeId === product.brand + product.modelNo
                  );
                  return (
                    <ProductItem
                      key={index}
                      shoeId={product.shoeId}
                      modelNo={product.modelNo}
                      imgUrl={product.imgUrl}
                      brand={product.brand}
                      productName={product.productName}
                      price={product.price}
                      customerLink={product.customerLink}
                      customerImg={product.customerImg || undefined}
                      isLiked={isLiked}
                      sneakerSize={convertedSneakerSize}
                    />
                  );
                })}
            </ul>
            <div className="mx-auto grid grid-cols-2 justify-items-center gap-[11px] py-[16px]"></div>
          </>
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
export default LikedProducts;
