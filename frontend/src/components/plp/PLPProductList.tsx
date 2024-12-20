import { memo, useCallback, useEffect, useRef, useState } from "react";
import PLPControls from "@components/plp/PLPControls";
import ProductItem from "@components/common/ProductItem";
import PLPEmptyList from "@components/plp/PLPEmptyList";
import userStore from "@store/auth.store";
import { TProductResponse } from "@type/product";
import { useSizeConversion } from "@hooks/useSizeConversion";

interface PLPProductListProps {
  products: TProductResponse[];
}

const PLPProductList = (props: PLPProductListProps) => {
  const { products } = props;

  const { user, likeShoes } = userStore();

  const sizeType = user?.sizeType ?? "mm";
  const sneakerSize = user?.sneakerSize ?? null;

  // 신발 사이즈 변환
  const convertedSneakerSize = useSizeConversion(sizeType, sneakerSize);

  const limit = 20;
  const [itemsSize, setItemsSize] = useState(limit);
  const [displayData, setDisplayData] = useState(products.slice(0, limit));

  const observer = useRef<IntersectionObserver | null>(null);

  // 무한스크롤
  // 1. 프론트에서 데이터 쪼개기
  // 데이터가 변경되면 현재 limit만큼의 데이터를 displayData에 설정
  useEffect(() => {
    setDisplayData(products.slice(0, itemsSize));
  }, [products, itemsSize]);

  // 2. 스크롤 감지해서 추가 데이터 로딩
  // Intersection Observer 설정
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      // if (isLoading) return; // 로딩 중이면 감지 중지
      if (observer.current) observer.current.disconnect(); // 이전 관찰자는 해제

      observer.current = new IntersectionObserver((entries) => {
        // 현재 보여주는 사이즈가 전체 리스트 보다 작을 경우
        if (entries[0].isIntersecting && itemsSize < products.length) {
          setItemsSize((prev) => prev + limit); // 새로운 데이터 추가
        }
      });

      if (node) observer.current.observe(node); // 새로운 엘리먼트 감시
    },
    [itemsSize, products.length]
  );

  return (
    <>
      <PLPControls totalItems={products.length} />
      <div className="px-4 pb-6">
        {displayData.length > 0 ? (
          <ul className="no-scrollbar grid h-[calc(100vh-200px)] w-full grid-cols-2 gap-3 overflow-y-auto md:grid-cols-4">
            {displayData.map((product, index) => {
              const shoeId = product.brand + product.modelNo;
              const isLiked = likeShoes?.some((shoe) => shoe.shoeId === shoeId);

              return (
                <ProductItem
                  ref={index === displayData.length - 1 ? lastElementRef : null}
                  key={shoeId + index}
                  shoeId={shoeId}
                  productName={product.modelName}
                  imgUrl={product.image}
                  modelNo={product.modelNo}
                  brand={product.brand}
                  customerLink={product.link}
                  isLiked={isLiked}
                  sneakerSize={convertedSneakerSize}
                />
              );
            })}
          </ul>
        ) : (
          <PLPEmptyList />
        )}
      </div>
    </>
  );
};
export default memo(PLPProductList);
