import { useEffect } from "react";
import { TChatResponse } from "@type/chat";
import BottomSheet from "@common/BottomSheet";
import BrandPLP from "@components/plp/BrandPLP";
import ProductsPLP from "@components/plp/ProductsPLP";

interface PLPBottomSheetProps {
  brandName: string | null;
  products: TChatResponse | null;
}

const PLPBottomSheet = (props: PLPBottomSheetProps) => {
  const { brandName, products } = props;

  useEffect(() => {
    console.log(products, brandName);

    window.location.hash = brandName ? "brand" : "product";
  }, [products, brandName]);

  return (
    <>
      <BottomSheet id="plp" isDragBar={true}>
        <BottomSheet.Content className="h-[calc(98vh-12px)] w-full overflow-y-hidden p-0">
          {/* 콘텐츠 */}
          {brandName && <BrandPLP brandName={brandName} />}
          {products && <ProductsPLP data={products} />}
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
export default PLPBottomSheet;
