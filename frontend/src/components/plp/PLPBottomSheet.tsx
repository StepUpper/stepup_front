import { TChatResponse } from "@type/chat";
import BottomSheet from "@common/BottomSheet";
import BrandPLP from "@components/plp/BrandPLP";
import ProductsPLP from "./ProductsPLP";
import { useEffect } from "react";
import { useBottomSheet } from "@/store/bottomSheet.store";

interface PLPBottomSheetProps {
  brandName: string | null;
  products: TChatResponse | null;
}

const PLPBottomSheet = (props: PLPBottomSheetProps) => {
  const { brandName, products } = props;

  const { sheets } = useBottomSheet();

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
