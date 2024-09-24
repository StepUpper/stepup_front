import ProductList from "@common/ProductList";
import { useState, useEffect } from "react";
import {
  TRecentProductItem,
  getRecentProducts,
} from "@utils/storeRecentProducts";
import { shoeEye } from "@assets/assets";

const RecentProducts = () => {
  const [recentProducts, setRecentProducts] = useState<TRecentProductItem[]>(
    []
  );

  useEffect(() => {
    const products = getRecentProducts();
    setRecentProducts(products);
  }, []);

  return (
    <>
      <div className="px-[16px]">
        <p className="py-[16px] text-body3 font-bold">
          총 {recentProducts?.length} 개
        </p>
        {recentProducts && recentProducts.length > 0 ? (
          <>
            <ProductList>
              {recentProducts &&
                recentProducts.map((product) => (
                  <ProductList.Item
                    key={product.shoeId}
                    productId={product.shoeId}
                    modelNo={product.modelNo}
                    thumb={product.imgUrl}
                    brandName={product.brand}
                    productName={product.title}
                    isLiked={true}
                    customerLink={product.customerLink}
                    customerImg={product.customerLink || undefined}
                  />
                ))}
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
