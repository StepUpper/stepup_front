import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import useAxios from "@hooks/useAxios";
// import { TBrandPLPResponse, TProduct } from "@types/plp";
// import { chatApi } from "@apis/services/chat";
import PLPHeader from "@components/plp/PLPHeader";
import { GenderCategory } from "@components/plp/GenderCategorySelector";
import PLPProductDisplay from "@components/plp/PLPProductDisplay";
import FilterBottomSheet from "@components/plp/FilterBottomSheet";
import Error from "@common/Error";
import { TChatResponse } from "@type/chat";
import { perfittLogo } from "@assets/assets";
import PLPLoading from "./PLPLoading";

interface ProductsPLPProps {
  data: TChatResponse; // TODO: API 타입에 따라 수정 예정
}

// TODO: 채팅 데이터로 임시 처리
const ProductsPLP = (props: ProductsPLPProps) => {
  const { data } = props;

  // TODO: API 추가되면 교체 예정
  // const { data, isError } = useAxios<TBrandPLPResponse>();

  const [selectedCategory, setSelectedCategory] =
    useState<GenderCategory>("ALL");
  const [filteredProducts, setFilteredProducts] = useState(data.products);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // 로딩 에러 임시 처리
    if (!data) setIsError(true);
    setIsLoading(true);
    // 성별 필터
    const newFilteredProducts =
      data?.products?.filter(() => {
        if (selectedCategory === "ALL") return true;
        // return product?.gender === selectedCategory; // 데이터에 성별이 없어 보류
      }) || [];
    setFilteredProducts(newFilteredProducts);
    setIsLoading(false);
  }, [data, selectedCategory]);

  // 필터 적용
  const handleFilters = (selectedGender: GenderCategory) => {
    setSelectedCategory(selectedGender);
  };

  return (
    <>
      <PLPHeader>
        <img src={perfittLogo} alt="펄핏 로고" className="shrink-0" />
        <h2 className="w-full truncate text-body2 font-label">
          {data.message}
        </h2>
      </PLPHeader>

      {data && filteredProducts && (
        <>
          {/* 상품 영역 */}
          <PLPProductDisplay products={filteredProducts} />

          {/* 필터 바텀 */}
          <FilterBottomSheet
            products={filteredProducts}
            applyFilters={handleFilters}
          />
        </>
      )}

      {isLoading && <PLPLoading type="product" />}

      {isError && (
        <div className="h-[calc(100vh-32px)] w-full">
          <Error />
        </div>
      )}
    </>
  );
};
export default ProductsPLP;
