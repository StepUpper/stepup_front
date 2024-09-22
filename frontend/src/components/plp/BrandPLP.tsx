import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "@hooks/useAxios";
import { TBrandPLPResponse, TProduct } from "@types/plp";
import { chatApi } from "@apis/services/chat";
import PLPHeader from "@components/plp/PLPHeader";
import GenderCategorySelector, {
  GenderCategory,
} from "@components/plp/GenderCategorySelector";
import PLPProductDisplay from "@components/plp/PLPProductDisplay";
import FilterBottomSheet from "@components/plp/FilterBottomSheet";
import Error from "@common/Error";

interface BrandPLPProps {
  brandName: string;
}

const BrandPLP = (props: BrandPLPProps) => {
  const { brandName } = props;

  const { data, isError } = useAxios<TBrandPLPResponse>(
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
      {data && filteredProducts && (
        <>
          <PLPHeader>
            <h2 className="text-body2 font-label">{data.brand}</h2>
          </PLPHeader>

          {/* AD */}
          <Link to={data.link}>
            <div
              className="item-center h-[6.3rem] w-full bg-cover bg-center bg-no-repeat bg-grey-50"
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
            products={data.products}
            applyFilters={handleFilters}
          />
        </>
      )}
      {isError && (
        <div className="h-[calc(100vh-32px)] w-full">
          <Error />
        </div>
      )}
    </>
  );
};
export default BrandPLP;
