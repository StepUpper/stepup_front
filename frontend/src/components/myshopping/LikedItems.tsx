import userStore from "@store/auth.store";
import ProductList from "@common/ProductList";
import { shoeHeart } from "@assets/assets";

const LikedItems = () => {
  const { likeShoes } = userStore();

  return (
    <>
      <div className="px-[16px]">
        <p className="text-body3 font-bold"> 총 {likeShoes?.length || 0} 개</p>

        {likeShoes && likeShoes.length > 0 ? (
          <>
            <ProductList>
              {likeShoes &&
                likeShoes.map((product) => (
                  <ProductList.Item
                    key={product.shoeId}
                    productId={product.shoeId}
                    modelNo={product.modelNo}
                    thumb={product.imgUrl}
                    brandName={product.brand}
                    productName={product.title}
                    isLiked={true}
                    customerLink={product.customerLink}
                    customerImg={product.customerLink}
                  />
                ))}
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
export default LikedItems;
