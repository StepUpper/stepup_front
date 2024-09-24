import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "@hooks/useAxios";
import { TBrandPLPResponse, TProduct } from "@type/plp";
import { chatApi } from "@apis/services/chat";
import PLPHeader from "@components/plp/PLPHeader";
import GenderCategorySelector, {
  GenderCategory,
} from "@components/plp/GenderCategorySelector";
import PLPProductDisplay from "@components/plp/PLPProductDisplay";
import FilterBottomSheet from "@components/plp/FilterBottomSheet";
import Error from "@common/Error";
import PLPLoading from "@components/plp/PLPLoading";

interface BrandPLPProps {
  brandName: string;
}

const BrandPLP = (props: BrandPLPProps) => {
  const { brandName } = props;

  const { data, isLoading, isError } = useAxios<TBrandPLPResponse, [string]>(
    chatApi.getBrandInfo,
    null,
    brandName
  );

  const [selectedCategory, setSelectedCategory] =
    useState<GenderCategory>("ALL");
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    console.log(selectedCategory);
    // 성별 필터
    const newFilteredProducts =
      data?.products?.filter((product: TProduct) => {
        if (selectedCategory === "ALL") return true;
        return product.gender === selectedCategory;
      }) || [];
    setFilteredProducts(newFilteredProducts);
  }, [data, selectedCategory]);

  // 필터 적용
  const handleFilters = (selectedGender: GenderCategory) => {
    setSelectedCategory(selectedGender);
  };

  return (
    <>
      <PLPHeader>
        <h2 className="text-body2 font-label">{brandName}</h2>
      </PLPHeader>

      {data && filteredProducts && (
        <>
          {/* AD */}
          <Link to={data.link}>
            <div
              className="item-center h-[6.3rem] w-full bg-grey-50 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${data.brandHeaderImage})`,
              }}
            >
              <span className="text-body2 font-label text-white">
                {data?.description}
              </span>
              {/* <img src="" alt={`${"brandInfo.brand"} 로고`} /> */}
            </div>
          </Link>

          {/* 성별 카테고리 */}
          <GenderCategorySelector
            selectedGender={selectedCategory}
            onClick={(value) => setSelectedCategory(value)}
          />

          {/* 상품 영역 */}
          <PLPProductDisplay products={filteredProducts} />

          {/* 필터 바텀 */}
          <FilterBottomSheet
            products={filteredProducts}
            applyFilters={handleFilters}
          />
        </>
      )}
      {isLoading && <PLPLoading type="brand" />}

      {isError && (
        <div className="h-[calc(100vh-32px)] w-full">
          <Error />
        </div>
      )}
    </>
  );
};
export default BrandPLP;
