import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBrandInfo } from "@apis/services/plp";
import { TBrandPLPResponse, TProduct } from "@types/plp";
import { useBottomSheet } from "@store/bottomSheet.store";
import BottomSheet from "@common/BottomSheet";
import PLPHeader from "@components/plp/PLPHeader";
import PLPControls from "@components/plp/PLPControls";
import ProductList from "@common/ProductList";
import FilterPanel from "@/components/plp/FilterBottomSheet";
import PLPEmptyList from "@components/plp/PLPEmptyList";
import GenderCategorySelector, {
  GenderCategory,
} from "@components/plp/GenderCategorySelector";

interface BrandPLPBottomSheetProps {
  brandName: string;
}

const BrandPLPBottomSheet = (props: BrandPLPBottomSheetProps) => {
  const { brandName } = props;

  const [brandInfo, setBrandInfo] = useState<TBrandPLPResponse | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<GenderCategory>("ALL");
  const [filteredProducts, setFilteredProducts] = useState<TProduct[] | null>(
    null
  );

  const { close } = useBottomSheet();

  useEffect(() => {
    const BrandInfoData = async () => {
      try {
        const data = await getBrandInfo(brandName);
        setBrandInfo(data);
      } catch (error) {
        console.error("Error fetching brand info:", error);
      }
    };

    BrandInfoData();
  }, [brandName]);

  useEffect(() => {
    console.log(selectedCategory);
    // 성별 필터
    const newFilteredProducts =
      brandInfo?.products?.filter((product) => {
        if (selectedCategory === "ALL") return true;
        return product.gender === selectedCategory;
      }) || [];
    setFilteredProducts(newFilteredProducts);
  }, [brandInfo, selectedCategory]);

  // 필터 적용
  const handleFilters = (selectedGender: GenderCategory) => {
    setSelectedCategory(selectedGender);
  };

  return (
    <>
      {brandInfo && (
        <BottomSheet id="brandPLP" isDragBar={true}>
          {/* 헤더 */}
          <BottomSheet.Header
            isTitleOnly={false}
            className="flex w-full flex-col"
          >
            <PLPHeader onClick={() => close("brandPLP")}>
              <h2 className="text-body2 font-label">{brandInfo.brand}</h2>
            </PLPHeader>
            <Link to={brandInfo.link}>
              <div
                className="item-center h-[6.3rem] w-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${brandInfo.brandHeaderImage})`,
                }}
              >
                <span className="text-body2 font-label text-white">
                  {brandInfo.description}
                </span>
                {/* <img src="" alt={`${"brandInfo.brand"} 로고`} /> */}
              </div>
            </Link>
          </BottomSheet.Header>

          {/* 콘텐츠 */}
          <BottomSheet.Content className="w-full gap-3 overflow-y-hidden p-0">
            <div className="sticky top-0 z-10 flex flex-col gap-4 bg-white px-4">
              <GenderCategorySelector
                selectedGender={selectedCategory}
                onClick={(value) => setSelectedCategory(value)}
              />
              <PLPControls
                length={
                  filteredProducts
                    ? filteredProducts.length
                    : brandInfo.products.length
                }
              />
            </div>
            <div className="overflow-y-auto px-4 pb-6">
              {filteredProducts && filteredProducts.length > 0 ? (
                <ProductList>
                  {filteredProducts.map((product, index) => (
                    <ProductList.Item
                      key={`${product.modelNo}-${index}`}
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
            products={brandInfo.products}
            applyFilters={handleFilters}
          />
        </BottomSheet>
      )}
    </>
  );
};
export default BrandPLPBottomSheet;
