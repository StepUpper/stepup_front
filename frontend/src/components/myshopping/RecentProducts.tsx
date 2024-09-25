import ProductList from "@common/ProductList";
import { useState, useEffect } from "react";
import {
  TRecentProductItem,
  getRecentProducts,
} from "@utils/storeRecentProducts";
import { shoeEye } from "@assets/assets";
import userStore from "@store/auth.store";

const RecentProducts = () => {
  const { likeShoes } = userStore();
  const [recentProducts, setRecentProducts] = useState<TRecentProductItem[]>(
    []
  );

  useEffect(() => {
    const products = getRecentProducts();
    setRecentProducts(products);
  }, []);

  return (
    <>
      {console.log("recent: ", recentProducts)}
      <div className="px-[16px]">
        <p className="py-[16px] text-body3 font-bold">
          총 {recentProducts?.length} 개
        </p>
        {recentProducts && recentProducts.length > 0 ? (
          <>
            <ProductList>
              {recentProducts &&
                recentProducts.map((product, index) => {
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
            <img src={shoeEye} />
            <p className="font-semibold"> 최근 본 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
};
export default RecentProducts;
