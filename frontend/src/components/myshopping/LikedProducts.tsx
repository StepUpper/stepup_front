import userStore from "@store/auth.store";
import ProductList from "@common/ProductList";
import { shoeHeart } from "@assets/assets";

const LikedProducts = () => {
  const { likeShoes } = userStore();

  return (
    <>
      <div className="px-[16px]">
        <p className="pb-[16px] text-body3 font-bold">
          총 {likeShoes?.length || 0} 개
        </p>
        {likeShoes && likeShoes.length > 0 ? (
          <>
            <ProductList>
              {likeShoes &&
                likeShoes.map((product, index) => {
                  const isLiked = likeShoes?.some(
                    (shoe) => shoe.shoeId === product.brand + product.modelNo
                  );
                  return (
                    <ProductList.Item
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
                    />
                  );
                })}
            </ProductList>
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
