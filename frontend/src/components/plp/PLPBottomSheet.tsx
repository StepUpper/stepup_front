import { TChatResponse } from "@types/chat";
import BottomSheet from "@common/BottomSheet";
import BrandPLP from "@components/plp/BrandPLP";
import ProductsPLP from "./ProductsPLP";
import { useEffect } from "react";

interface PLPBottomSheetProps {
  brandName: string | null;
  products: TChatResponse | null;
}

const PLPBottomSheet = (props: PLPBottomSheetProps) => {
  const { brandName, products } = props;

  useEffect(() => {
    console.log(products, brandName);
  }, [products, brandName]);

  return (
    <>
      <BottomSheet id="plp" isDragBar={true}>
        <BottomSheet.Content className="h-[calc(98vh-12px)] w-full gap-3 overflow-y-hidden p-0">
          {/* 콘텐츠 */}
          {brandName && <BrandPLP brandName={brandName} />}
          {products && <ProductsPLP data={products} />}
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
export default PLPBottomSheet;
