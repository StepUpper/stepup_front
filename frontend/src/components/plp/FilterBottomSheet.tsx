import { useEffect, useState } from "react";
import { useBottomSheet } from "@store/bottomSheet.store";
import { TProductResponse } from "@type/product";
import BottomSheet from "@common/BottomSheet";
import BottomButton from "@common/BottomButton";
import GenderCategorySelector, {
  GenderCategory,
} from "@components/plp/GenderCategorySelector";

interface FilterBottomSheetProps {
  products: TProductResponse[];
  applyFilters: (gender: GenderCategory) => void;
}

const FilterBottomSheet = (props: FilterBottomSheetProps) => {
  const { products, applyFilters } = props;

  const [selectedGender, setSelectedGender] = useState<GenderCategory>("ALL");
  const [filteredCount, setFilteredCount] = useState(0);

  const { close } = useBottomSheet();

  useEffect(() => {
    if (products) {
      // 임시 성별에 따른 필터링된 상품 개수 계산
      const count = products.filter((product) => {
        if (selectedGender === "ALL") return true;
        return product.gender === selectedGender;
      }).length;
      setFilteredCount(count);
    }
  }, [selectedGender, products]);

  const handleApplyFilters = () => {
    applyFilters(selectedGender); // 임시 상태를 실제 상태로 적용
    close("FilterPanel"); // 바텀시트 닫기
  };
  return (
    <>
      <BottomSheet id="FilterPanel" isDragBar={false}>
        <BottomSheet.Header isTitleOnly={true}>필터</BottomSheet.Header>
        <BottomSheet.Content className="gap-4">
          <div className="flex flex-col gap-2.5">
            <label className="px-4 pb-1 text-[15px] font-label">성별</label>
            <GenderCategorySelector
              selectedGender={selectedGender}
              onClick={(value) => setSelectedGender(value)}
            />
          </div>
          <div className="px-4">
            <BottomButton
              title={`${filteredCount}개의 상품보기`}
              onClick={handleApplyFilters}
            />
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
export default FilterBottomSheet;
