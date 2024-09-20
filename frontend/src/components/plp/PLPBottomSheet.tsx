import { useEffect, useState } from "react";
import { TBrandPLPResponse, TProduct } from "@types/plp";
import { chatApi } from "@apis/services/chat";
import useAxios from "@hooks/useAxios";
import { useBottomSheet } from "@store/bottomSheet.store";
import BottomSheet from "@common/BottomSheet";
import PLPHeader from "@components/plp/PLPHeader";
import BrandPLP from "@components/plp/BrandPLP";
import { GenderCategory } from "@components/plp/GenderCategorySelector";
import PLPControls from "@components/plp/PLPControls";
import ProductList from "@common/ProductList";
import PLPEmptyList from "@components/plp/PLPEmptyList";
import FilterPanel from "@components/plp/FilterBottomSheet";
import userStore from "@store/auth.store";
import Error from "@common/Error";

interface PLPBottomSheetProps {
  brandName?: string;
}

const PLPBottomSheet = (props: PLPBottomSheetProps) => {
  const { brandName } = props;

  const { user } = userStore();
  const userFootSize = user?.footInfo || null;

  const { data, error } = useAxios<TBrandPLPResponse>(
    brandName ? chatApi.getBrandInfo : null,
    brandName ? { brandName } : null
  );

  const [selectedCategory, setSelectedCategory] =
    useState<GenderCategory>("ALL");
  const [filteredProducts, setFilteredProducts] = useState<TProduct[] | null>(
    null
  );

  const { close } = useBottomSheet();

  useEffect(() => {
    console.log(selectedCategory);
    // 성별 필터
    const newFilteredProducts =
      data?.products?.filter((product) => {
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
      <BottomSheet id="brandPLP" isDragBar={true}>
        {data && (
          <>
            {/* 헤더 */}
            <BottomSheet.Header
              isTitleOnly={false}
              className="flex w-full flex-col"
            >
              <PLPHeader onClick={() => close("brandPLP")}>
                <h2 className="text-body2 font-label">{data.brand}</h2>
              </PLPHeader>
            </BottomSheet.Header>

            {/* 콘텐츠 */}
            <BottomSheet.Content className="w-full gap-3 overflow-y-hidden p-0">
              <BrandPLP
                customerLink={data.link}
                brandHeaderImage={data.brandHeaderImage}
                description={data.description}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <PLPControls
                totalItems={
                  filteredProducts
                    ? filteredProducts.length
                    : data.products.length
                }
              />
              <div className="overflow-y-auto px-4 pb-6">
                {filteredProducts && filteredProducts.length > 0 ? (
                  <ProductList>
                    {filteredProducts.map((product, index) => (
                      <ProductList.Item
                        key={`${product.modelNo}-${index}`}
                        recSize={userFootSize}
                        thumb={product.image}
                        brandName={product.brand}
                        productName={product.modelName}
                        isLiked={false}
                        customerLink={product.link}
                      />
                    ))}
                  </ProductList>
                ) : (
                  <PLPEmptyList />
                )}
              </div>
            </BottomSheet.Content>

            {/* 필터 */}
            <FilterPanel
              products={data.products}
              applyFilters={handleFilters}
            />
          </>
        )}
        {error && (
          <div className="h-[calc(100vh-32px)] w-full">
            <Error />
          </div>
        )}
      </BottomSheet>
    </>
  );
};
export default PLPBottomSheet;
